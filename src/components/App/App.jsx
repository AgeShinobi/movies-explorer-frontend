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
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import './App.css';

import * as mainApi from '../../utils/MainApi';
import * as moviesApi from '../../utils/MoviesApi';
import { searchValidator, searchMovies, searchShortMovies } from '../../utils/SearchMovies';
import { INITIAL_USER, JWT_KEY, MOVIES } from '../../config';

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

  const navigate = useNavigate();

  // общий функционал cbRegister & cbLogin
  const cbAuth = (data) => {
    if (!data || data.error || data.message) {
      throw new Error('Ошибка аутентификации');
    }
    if (data.token) {
      localStorage.setItem(JWT_KEY, data.token);
      setLoggedIn(true);
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
    } finally {
      setLoading(false);
    }
  };
  // Register
  const cbRegister = async ({ name, email, password }) => {
    try {
      const data = await mainApi.register(name, email, password);
      cbAuth(data);
      navigate('/signin', { replace: true });
    } catch (err) {
      // cbFailInfoPopup();
      // eslint-disable-next-line no-console
      console.error(err);
    } finally {
      setLoading(false);
      // cbSuccessInfoPopup();
    }
  };

  // Logout
  const cbLogout = () => {
    localStorage.removeItem(JWT_KEY);
    localStorage.removeItem(MOVIES);
    setLoggedIn(false);
    setCurrentUser(INITIAL_USER);
    navigate('/', { replace: true });
  };
  // Change Search Value
  const handleChangeSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  // Search Movies
  const cbSearchMovies = async (title) => {
    try {
      setLoading(true);
      searchValidator(title);
      // searchMovies(title);
      const movies = searchMovies(title);
      const shortMovies = searchShortMovies(movies);
      setSearchedMovies(movies);
      setSearchedShortMovies(shortMovies);
      // найденные фильмы сохраняем в localStorage
      localStorage.setItem('searchTitle', JSON.stringify(title));
      localStorage.setItem('searchedMovies', JSON.stringify(movies));
      localStorage.setItem('searchedShortMovies', JSON.stringify(shortMovies));
    } catch (err) {
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
    localStorage.setItem('filterStatus', newFilterStatus);
  };

  // Like movie
  const cbSaveMovie = async (movie) => {
    setSavedMovies(movie);
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
      // navigate('/', { replace: true });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [setLoggedIn, setCurrentUser, navigate]);

  useEffect(() => {
    cbTokenCheck();
  }, [cbTokenCheck]);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getUserInfo(), moviesApi.getMovies()])
        .then(([userData, movies]) => {
          setCurrentUser(userData);
          localStorage.setItem(MOVIES, JSON.stringify(movies));
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

  if (loading) {
    return 'Loading...';
  }

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
                  onSearch={cbSearchMovies}
                  savedMovies={savedMovies}
                  onSaveMovie={cbSaveMovie}
                  filterStatus={filterStatus}
                  onFilter={changeFilterStatus}
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
                <Profile onLogout={cbLogout} />
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
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
