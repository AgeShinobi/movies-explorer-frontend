import React, {
  useCallback, useState, useEffect,
} from 'react';
import {
  Route, Routes, useLocation, useNavigate, useMatch,
} from 'react-router-dom';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import NotFound from '../NotFound/NotFound';
import InfoPopup from '../InfoPopup/InfoPopup';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Preloader from '../Preloader/Preloader';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import './App.css';

import * as mainApi from '../../utils/MainApi';
import * as moviesApi from '../../utils/MoviesApi';
import validateMovieCard from '../../utils/MoviesValidator';
import {
  searchValidator, searchMovies,
  searchShortMovies, searchSavedMovies,
} from '../../utils/SearchMovies';

import {
  MOVIES_IMAGE_URL,
  INITIAL_USER,
  SEARCH_TITLE,
  SEARCHED_MOVIES,
  SEARCHED_SHORT_MOVIES,
  FILTER_STATUS,
  JWT_KEY,
  MOVIES,
  SAVED_MOVIES,
  LOGIN_SUCCES,
  SAVED_MOVIES_SHORT,
  EMAIL_REGEX,
} from '../../config';

const projectLinkStatic = 'https://github.com/AgeShinobi/how-to-learn';
const projectLinkAdaptive = 'https://github.com/AgeShinobi/russian-travel';
const projectLinkApp = 'https://github.com/AgeShinobi/react-mesto-api-full-gha';
const praktikumLink = 'https://practicum.yandex.ru/';
const githubLink = 'https://github.com/AgeShinobi';

function App() {
  const location = useLocation();
  const isMovies = useMatch({ path: '/movies', exact: true });
  const [currentUser, setCurrentUser] = useState(INITIAL_USER);
  const [loggedIn, setLoggedIn] = useState(false);

  const [savedMovies, setSavedMovies] = useState([]);
  const [savedMoviesShort, setSavedMoviesShort] = useState([]);
  // Найденные фильмы
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [searchedShortMovies, setSearchedShortMovies] = useState([]);
  // Найденные сохраненные фильмы
  const [searchedSavedMovies, setSearchedSavedMovies] = useState([]);
  const [searchedSavedShortMovies, setSearchedSavedShortMovies] = useState([]);
  // Текст поисковой строки
  const [searchValue, setSearchValue] = useState('');
  const [searchValueInSaved, setSearchValueInSaved] = useState('');
  // фильтр короткометражек
  const [filterStatus, setFilterStatus] = useState(false);
  const [filterStatusSaved, setFilterStatusSaved] = useState(false);
  // Работа попапа с сообщением об успехе/ошибке
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  // Работа лоадера
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Функция вызова попапа с сообщением
  const showInfoPopup = (text, err) => {
    setPopupMessage(text);
    setIsErrorMessage(err); // Boolean
    setPopupIsOpen(true);

    const timer = setTimeout(() => {
      setPopupIsOpen(false);
    }, 5000);

    return () => clearTimeout(timer);
  };

  // REGISTER, LOGIN, LOGOUT ------------------------------------->

  // общий функционал cbRegister & cbLogin
  const cbAuth = (data) => {
    if (!data || data.error || data.message) {
      throw new Error('Ошибка аутентификации');
    }
    if (data.token) {
      localStorage.setItem(JWT_KEY, data.token);
      setLoggedIn(true);
      showInfoPopup(LOGIN_SUCCES, false);
      navigate('/movies', { replace: true });
    }
  };
  // Login
  const cbLogin = async ({ email, password }) => {
    try {
      setLoading(true);
      const data = await mainApi.authorize(email, password);
      cbAuth(data);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      showInfoPopup(err, true);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  // Register
  const cbRegister = async ({ name, email, password }) => {
    try {
      setLoading(true);
      if (!(EMAIL_REGEX.test(email))) {
        throw new Error('Введите корректный email');
      }
      const data = await mainApi.register(name, email, password);
      cbAuth(data);
      showInfoPopup('Вы успешно зарегистрироовались!', false);
      // navigate('/signin', { replace: true });
      cbLogin({ email, password });
    } catch (err) {
      if (err.message) {
        showInfoPopup(err.message, true);
      } else {
        showInfoPopup(err, true);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };
  // Logout
  const cbLogout = () => {
    localStorage.removeItem(JWT_KEY);
    localStorage.removeItem(MOVIES);
    localStorage.removeItem(SEARCH_TITLE);
    localStorage.removeItem(SEARCHED_MOVIES);
    localStorage.removeItem(SEARCHED_SHORT_MOVIES);
    localStorage.removeItem(FILTER_STATUS);
    localStorage.removeItem(SAVED_MOVIES);
    localStorage.removeItem(SAVED_MOVIES_SHORT);
    // States to default values
    setLoggedIn(false);
    setCurrentUser(INITIAL_USER);
    setSearchValue('');
    setSearchValueInSaved('');
    setSearchedMovies([]);
    setSearchedShortMovies([]);
    setSavedMovies([]);
    // Navigate to main page
    navigate('/', { replace: true });
  };
  // Check Token
  const cbTokenCheck = useCallback(async () => {
    try {
      const path = location.pathname;
      const jwt = localStorage.getItem(JWT_KEY);
      if (!jwt) {
        throw new Error('no token');
      }
      // ответом api является данные пользователя
      const user = await mainApi.checkToken(jwt);
      if (!user) {
        throw new Error('no user');
      }
      setLoggedIn(true);
      setCurrentUser(user);
      navigate(path, { replace: true });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [setLoggedIn, setCurrentUser]);

  // SEARCH ------------------------------------------------------>

  // Change Search Value
  const handleChangeSearchValue = (e) => {
    setSearchValue(e.target.value);
  };
  const handleChangeSearchValueInSaved = (e) => {
    setSearchValueInSaved(e.target.value);
  };
  // Search Movies
  const cbSearchMovies = async (title) => {
    try {
      searchValidator(title);
      const movies = searchMovies(title);
      const shortMovies = searchShortMovies(movies);
      setSearchedMovies(movies);
      setSearchedShortMovies(shortMovies);
      // найденные фильмы сохраняем в localStorage
      localStorage.setItem(SEARCH_TITLE, JSON.stringify(title));
      localStorage.setItem(SEARCHED_MOVIES, JSON.stringify(movies));
      localStorage.setItem(SEARCHED_SHORT_MOVIES, JSON.stringify(shortMovies));
    } catch (err) {
      showInfoPopup(err.message, true);
    }
  };
  // Search SAVED Movies
  const cbSearchSavedMovies = async (title) => {
    try {
      searchValidator(title);
      const movies = searchSavedMovies(title);
      const shortMovies = searchShortMovies(movies);
      setSearchedSavedMovies(movies);
      setSearchedSavedShortMovies(shortMovies);
    } catch (err) {
      showInfoPopup(err.message, true);
      throw err;
    }
  };
  // Checkbox status
  const changeFilterStatus = () => {
    if (isMovies) {
      const newFilterStatus = !filterStatus;
      setFilterStatus(newFilterStatus);
      localStorage.setItem(FILTER_STATUS, newFilterStatus);
    } else {
      const newFilterStatus = !filterStatusSaved;
      setFilterStatusSaved(newFilterStatus);
    }
  };
  // SAVE & DELETE MOVIE ---------------------------------------------->

  // Save movie
  const cbSaveMovie = async (movie) => {
    try {
      setLoading(true);
      const savedMovie = await mainApi.addMovie(movie);
      const updatedSavedMovies = [...savedMovies, savedMovie.data];
      const updatedShortSavedMovies = searchShortMovies(updatedSavedMovies);
      setSavedMovies(updatedSavedMovies);
      setSavedMoviesShort(updatedShortSavedMovies);
      localStorage.setItem(SAVED_MOVIES, JSON.stringify(updatedSavedMovies));
      showInfoPopup('Фильм успешно сохранен', false);
    } catch (err) {
      showInfoPopup(err.message, true);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  // Delete movie
  // eslint-disable-next-line consistent-return
  const cbDeleteMovie = async (movie) => {
    try {
      const userId = currentUser._id;
      let savedMovieId = movie._id;
      let savedMovieOwner = movie.owner;

      if (!movie._id) {
        // Карточки в /movies не имеют поля _id, ищем в сохраненных
        savedMovies.forEach((film) => {
          if (movie.movieId === film.movieId) {
            // Записываем _id
            savedMovieId = film._id;
            savedMovieOwner = film.owner;
          }
          return film;
        });
        if (savedMovieOwner !== userId) {
          throw new Error('Ошибка удаления карточки');
        }
      }
      await mainApi.deleteMovie(savedMovieId);
      const updatedSavedMovies = savedMovies.filter((film) => film._id !== savedMovieId);
      const updatedShortSavedMovies = searchShortMovies(updatedSavedMovies);
      setSavedMovies(updatedSavedMovies);
      setSavedMoviesShort(updatedShortSavedMovies);
      localStorage.setItem(SAVED_MOVIES, JSON.stringify(updatedSavedMovies));
      showInfoPopup('Фильм успешно удален', false);
    } catch (err) {
      showInfoPopup(err.message, true);
      throw err;
    }
  };

  const cbDeleteMovieSaved = async (movie) => {
    try {
      const userId = currentUser._id;
      const savedMovieId = movie._id;
      const savedMovieOwner = movie.owner;

      if (savedMovieOwner !== userId) {
        throw new Error('Ошибка удаления карточки');
      }

      await mainApi.deleteMovie(savedMovieId);

      // Обновленный список сохраненных фильмов
      const updatedSavedMovies = savedMovies
        .filter((film) => film._id !== savedMovieId);
      const updatedShortSavedMovies = savedMoviesShort
        .filter((film) => film._id !== savedMovieId);
      // Для обновления стейтов найденных фильмов в разделе сохраненных
      const updatedSearchedSavedMovies = searchedSavedMovies
        .filter((film) => film._id !== savedMovieId);
      const updatedSearchedShortSavedMovies = searchedSavedShortMovies
        .filter((film) => film._id !== savedMovieId);

      setSavedMovies(updatedSavedMovies);
      setSavedMoviesShort(updatedShortSavedMovies);
      setSearchedSavedMovies(updatedSearchedSavedMovies);
      setSearchedSavedShortMovies(updatedSearchedShortSavedMovies);

      localStorage.setItem(SAVED_MOVIES, JSON.stringify(updatedSavedMovies));
      localStorage.setItem(SAVED_MOVIES_SHORT, JSON.stringify(updatedSavedMovies));

      showInfoPopup('Фильм успешно удален', false);
    } catch (err) {
      showInfoPopup(err.message, true);
    }
  };

  // CHANGE USER INFO ------------------------------------------------->

  const cbChangeUserInfo = async (name, email) => {
    try {
      setLoading(true);
      const newUserData = await mainApi.changeUserInfo(name, email);
      setCurrentUser(newUserData.user);
      showInfoPopup('Информация обновлена успешно', false);
    } catch (err) {
      showInfoPopup(err.message, true);
    } finally {
      setLoading(false);
    }
  };

  // USE EFFECTS ------------------------------------------------------>

  useEffect(() => {
    cbTokenCheck();
  }, [cbTokenCheck]);

  useEffect(() => {
    if (loggedIn) {
      setLoading(true);
      Promise.all([mainApi.getUserInfo(), moviesApi.getMovies(), mainApi.getSavedMovies()])
        .then(([userData, movies, savedFilms]) => {
          setCurrentUser(userData);
          setSavedMovies(savedFilms.data);
          setSavedMoviesShort(searchShortMovies(savedFilms.data));
          // Преобразуем элементы массива в соответствии в моделью API
          const moviesArray = movies.map((movie) => {
            const movieCard = {
              country: movie.country,
              director: movie.director,
              duration: movie.duration,
              year: movie.year,
              description: movie.description,
              image: MOVIES_IMAGE_URL + movie.image.url,
              trailerLink: movie.trailerLink,
              thumbnail: MOVIES_IMAGE_URL + movie.image.url,
              movieId: movie.id,
              nameRU: movie.nameRU,
              nameEN: movie.nameEN,
            };
            return movieCard;
          });
          // Каждая карточка проверяется на валидность
          const validatedMovies = moviesArray.filter((movie) => validateMovieCard(movie));
          localStorage.setItem(MOVIES, JSON.stringify(validatedMovies));
          localStorage.setItem(SAVED_MOVIES, JSON.stringify(savedFilms.data));
          setLoading(false);
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  // Проверяет наличие данных последнего поиска и применяет к странице
  useEffect(() => {
    if (localStorage.filterStatus) {
      setFilterStatus(JSON.parse(localStorage.filterStatus));
    }
    if (localStorage.searchTitle
      && localStorage.searchedMovies
      && localStorage.searchedShortMovies) {
      setSearchValue(JSON.parse(localStorage.searchTitle));
      setSearchedMovies(JSON.parse(localStorage.searchedMovies));
      setSearchedShortMovies(JSON.parse(localStorage.searchedShortMovies));
    }
  }, []);
  // Приводит значения стейтов к дефолтным при обновлении страницы
  useEffect(() => {
    setFilterStatusSaved(false);
    setSearchedSavedMovies([]);
    setSearchedSavedShortMovies([]);
    setSearchValueInSaved('');
  }, [location]);

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path="/"
            element={(
              <>
                <Header loggedIn={loggedIn} />
                <Main
                  projectLinkStatic={projectLinkStatic}
                  projectLinkAdaptive={projectLinkAdaptive}
                  projectLinkApp={projectLinkApp}
                  githubLink={githubLink}
                />
                <Footer
                  githubLink={githubLink}
                  praktikumLink={praktikumLink}
                />
              </>
            )}
          />
          <Route
            path="/movies"
            element={(
              <>
                <Header loggedIn={loggedIn} />
                <ProtectedRoute
                  element={Movies}
                  loggedIn={loggedIn}
                  onSearch={cbSearchMovies}
                  searchedMovies={searchedMovies}
                  searchedShortMovies={searchedShortMovies}
                  filterStatus={filterStatus}
                  onFilter={changeFilterStatus}
                  searchValue={searchValue}
                  onChangeSearchValue={handleChangeSearchValue}
                  onSaveMovie={cbSaveMovie}
                  onDeleteMovie={cbDeleteMovie}
                  savedMovies={savedMovies}
                  savedMoviesShort={savedMoviesShort}
                />
                <Footer
                  githubLink={githubLink}
                  praktikumLink={praktikumLink}
                />
              </>
            )}
          />
          <Route
            path="/saved-movies"
            element={(
              <>
                <Header loggedIn={loggedIn} />
                <ProtectedRoute
                  element={Movies}
                  loggedIn={loggedIn}
                  onSearch={cbSearchSavedMovies}
                  searchedMovies={searchedSavedMovies}
                  searchedShortMovies={searchedSavedShortMovies}
                  filterStatus={filterStatusSaved}
                  onFilter={changeFilterStatus}
                  searchValue={searchValueInSaved}
                  onChangeSearchValue={handleChangeSearchValueInSaved}
                  onDeleteMovie={cbDeleteMovieSaved}
                  savedMovies={savedMovies}
                  savedMoviesShort={savedMoviesShort}
                />
                <Footer
                  githubLink={githubLink}
                  praktikumLink={praktikumLink}
                />
              </>
            )}
          />
          <Route
            path="/profile"
            element={(
              <>
                <Header loggedIn={loggedIn} />
                <ProtectedRoute
                  element={Profile}
                  loggedIn={loggedIn}
                  onLogout={cbLogout}
                  onChangeUserInfo={cbChangeUserInfo}
                />
              </>
            )}
          />
          <Route
            path="/signup"
            element={(
              <Register
                loggedIn={loggedIn}
                onRegister={cbRegister}
              />
            )}
          />
          <Route
            path="/signin"
            element={(
              <Login
                loggedIn={loggedIn}
                onLogin={cbLogin}
              />
            )}
          />
          <Route
            path="/*"
            element={
              <NotFound />
            }
          />
        </Routes>
        <InfoPopup
          popupIsOpen={popupIsOpen}
          isError={isErrorMessage}
          popupMessage={popupMessage}
        />
        {loading && <Preloader />}
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
