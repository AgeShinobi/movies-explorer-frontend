/* eslint-disable arrow-body-style */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable quote-props */
const BASE_URL = 'https://api.movie.ageshinobi.nomoreparties.sbs';

// Общий функционал для формирования запроса
function makeRequest(url, method, body, token) {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  if (token !== undefined) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (body !== undefined) {
    config.body = JSON.stringify(body);
  }

  return fetch(`${BASE_URL}${url}`, config)
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
      return res.json();
    });
}

// запросы которые требуют jwt. Берем из localStorage.
function makeAuthorizedRequest(url, method, body) {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.jwt}`,
  };

  // headers.authorization = `Bearer ${localStorage.jwt}`;

  const config = {
    method,
    headers,
  };

  if (body !== undefined) {
    config.body = JSON.stringify(body);
  }

  return fetch(`${BASE_URL}${url}`, config)
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
      return res.json();
    });
}

// Параметры запроса для регистрации
export const register = (name, email, password) => {
  return makeRequest('/signup', 'POST', { name, email, password });
};
// Параметры запроса для авторизации
export const authorize = (email, password) => {
  return makeRequest('/signin', 'POST', { email, password });
};

export const checkToken = (token) => {
  return makeRequest('/users/me', 'GET', undefined, token);
};

// Requests with JWT in localStorage
export const getUserInfo = () => {
  return makeAuthorizedRequest('/users/me', 'GET');
};

export const getSavedMovies = () => {
  return makeAuthorizedRequest('/movies', 'GET');
};
// Параметры запроса для добавления видео в сохраненные
export const addMovie = (movie) => {
  return makeAuthorizedRequest('/movies', 'POST', movie);
};