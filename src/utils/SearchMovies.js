/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable import/prefer-default-export */
import { MOVIES } from '../config';
// Validation of Search input
export const searchValidator = (text) => {
  // regex TODO
  if (!text || '') {
    // eslint-disable-next-line no-console
    console.log('Пустой запрос не обрабатываем');
  }
};

const getMovies = () => {
  // Берет список фильмов из localStorage
  const movies = JSON.parse(localStorage.getItem(MOVIES));
  return movies;
};
// Movie search on request
export const searchMovies = (title) => {
  const movies = getMovies();
  // Фильтрует список по запросу
  return movies.filter((movie) =>
    movie.nameRU.toLowerCase().includes(title.toLowerCase())
    || movie.nameEN.toLowerCase().includes(title.toLowerCase()));
};

// передаем в качестве параметра массив найденных фильмов
export const searchShortMovies = (movies) => movies.filter((movie) => movie.duration < 60);
