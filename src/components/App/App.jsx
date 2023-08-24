import React, { useCallback, useState, useEffect } from 'react'; // TODO: +useState
import {
  Route, Routes, useNavigate,
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
import './App.css';

import * as mainApi from '../../utils/MainApi';
import * as moviesApi from '../../utils/MoviesApi';
import validateMovieCard from '../../utils/MoviesValidator';
import { searchValidator, searchMovies, searchShortMovies } from '../../utils/SearchMovies';
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
  // REGISTER_SUCCES,
  LOGIN_SUCCES,
} from '../../config';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

const projectLinkStatic = 'https://github.com/AgeShinobi/how-to-learn';
const projectLinkAdaptive = 'https://github.com/AgeShinobi/russian-travel';
const projectLinkApp = 'https://github.com/AgeShinobi/react-mesto-api-full-gha';
const praktikumLink = 'https://practicum.yandex.ru/';
const githubLink = 'https://github.com/AgeShinobi';

function App() {
  const [currentUser, setCurrentUser] = useState(INITIAL_USER);
  const [loggedIn, setLoggedIn] = useState(false);
  const [searchedMovies, setSearchedMovies] = useState([]);
  // Стейт поисковой строки
  const [searchValue, setSearchValue] = useState('');
  // фильтр короткометражек
  const [filterStatus, setFilterStatus] = useState(false);
  // Список короткометражек
  const [searchedShortMovies, setSearchedShortMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  // Работа попапа с сообщением об успехе/ошибке
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const navigate = useNavigate();

  // Функция вызова попапа
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
      showInfoPopup(data.error, true);
      throw new Error('Ошибка аутентификации');
    }
    if (data.token) {
      showInfoPopup(LOGIN_SUCCES, false);
      localStorage.setItem(JWT_KEY, data.token);
      setLoggedIn(true);
      showInfoPopup(LOGIN_SUCCES, false);
      navigate('/movies', { replace: true });
    }
  };
  // Login
  const cbLogin = async ({ email, password }) => {
    try {
      const data = await mainApi.authorize(email, password);
      cbAuth(data);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      showInfoPopup('Что-то пошло не так', true);
    } finally {
      setLoading(false);
    }
  };
  // Register
  const cbRegister = async ({ name, email, password }) => {
    try {
      const data = await mainApi.register(name, email, password);
      cbAuth(data);
      showInfoPopup('Вы успешно зарегистрироовались!', false);
      navigate('/signin', { replace: true });
    } catch (err) {
      showInfoPopup(err, true);
      // eslint-disable-next-line no-console
      console.error(err);
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
    setLoggedIn(false);
    setCurrentUser(INITIAL_USER);
    navigate('/', { replace: true });
  };
  // Check Token
  const cbTokenCheck = useCallback(async () => {
    try {
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
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [setLoggedIn, setCurrentUser, navigate]);

  // SEARCH ------------------------------------------------------>
  // Change Search Value
  const handleChangeSearchValue = (e) => {
    setSearchValue(e.target.value);
  };
  // Search Movies
  const cbSearchMovies = async (title) => {
    try {
      setLoading(true);
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
      showInfoPopup(err, true);
      // eslint-disable-next-line no-console
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  // Checkbox status
  const changeFilterStatus = () => {
    const newFilterStatus = !filterStatus;
    setFilterStatus(newFilterStatus);
    localStorage.setItem(FILTER_STATUS, newFilterStatus);
  };
  // SAVE & DELETE MOVIE ---------------------------------------------->

  // Save movie
  const cbSaveMovie = async (movie) => {
    try {
      const savedMovie = await mainApi.addMovie(movie);
      const updatedSavedMovies = [...savedMovies, savedMovie.data];
      setSavedMovies(updatedSavedMovies);
      localStorage.setItem(SAVED_MOVIES, JSON.stringify(updatedSavedMovies));
    } catch (err) {
      showInfoPopup(err, true);
    }
  };
  // Delete movie
  const cbDeleteMovie = async (movieId) => {
    await mainApi.deleteMovie(movieId);
  };

  // USE EFFECTS ------------------------------------------------------>

  useEffect(() => {
    cbTokenCheck();
  }, [cbTokenCheck]);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getUserInfo(), moviesApi.getMovies()])
        .then(([userData, movies]) => {
          setCurrentUser(userData);
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
        })
        // eslint-disable-next-line no-console
        .catch((err) => showInfoPopup(err, true));
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
                  loading={loading}
                  onSaveMovie={cbSaveMovie}
                  onDeleteMovie={cbDeleteMovie}
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
                  filterStatus={filterStatus}
                  onFilter={changeFilterStatus}
                  savedMovies={savedMovies}
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
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
