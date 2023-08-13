const BASE_URL = 'https://api.movie.ageshinobi.nomoreparties.sbs';
// const BASE_URL = 'http://localhost:3000';
const MOVIES_BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';
const MOVIES_IMAGE_URL = 'https://api.nomoreparties.co';
const INITIAL_USER = {};

const JWT_KEY = 'jwt';
const MOVIES = 'movies';
const SEARCH_TITLE = 'searchTitle';
const SEARCHED_MOVIES = 'searchedMovies';
const SEARCHED_SHORT_MOVIES = 'searchedShortMovies';
const FILTER_STATUS = 'filterStatus';

// Regex
const LINK_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,}\.[a-zA-Z0-9()]+\b([-a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?/im;
const NAME_EN_REGEX = /^[A-Za-z0-9\s\d\W]+$/im;
const NAME_RU_REGEX = /^[А-Яа-яёЁ\s\d\W]+$/im;

module.exports = {
  BASE_URL,
  MOVIES_BASE_URL,
  MOVIES_IMAGE_URL,
  INITIAL_USER,
  SEARCH_TITLE,
  SEARCHED_MOVIES,
  SEARCHED_SHORT_MOVIES,
  FILTER_STATUS,
  JWT_KEY,
  MOVIES,
  LINK_REGEX,
  NAME_EN_REGEX,
  NAME_RU_REGEX,
};
