/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable import/prefer-default-export */
import { MOVIES, SAVED_MOVIES } from '../config';
// Validation of Search input
export const searchValidator = (text) => {
  // regex TODO
  if (!text || '') {
    // eslint-disable-next-line no-console
    throw new Error('Пустой запрос');
  }
};

const getMovies = (films) => {
  // Берет список фильмов из localStorage
  const movies = JSON.parse(localStorage.getItem(films));
  return movies;
};
// Movie search on request
export const searchMovies = (title) => {
  const movies = getMovies(MOVIES);
  // Фильтрует список по запросу
  return movies.filter((movie) =>
    movie.nameRU.toLowerCase().includes(title.toLowerCase())
    || movie.nameEN.toLowerCase().includes(title.toLowerCase()));
};
export const searchSavedMovies = (title) => {
  const movies = getMovies(SAVED_MOVIES);
  // Фильтрует список по запросу
  return movies.filter((movie) =>
    movie.nameRU.toLowerCase().includes(title.toLowerCase())
    || movie.nameEN.toLowerCase().includes(title.toLowerCase()));
};

// передаем в качестве параметра массив найденных фильмов
export const searchShortMovies = (movies) => movies.filter((movie) => movie.duration < 60);

// проверяет фильм на наличие в сохраненных
// arr - где икать, movie - что искать
export const getSavedMovieCard = (arr, movie) => arr.find((item) => item.movieId === movie.movieId);
