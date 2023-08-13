/* eslint-disable import/prefer-default-export */
import {
  LINK_REGEX,
  NAME_EN_REGEX,
  NAME_RU_REGEX,
  MOVIES_IMAGE_URL,
} from '../config';

function validateMovieCard(movie) {
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
  // Необходимые поля
  const requiredFields = [
    'country',
    'director',
    'duration',
    'year',
    'description',
    'image',
    'trailerLink',
    'thumbnail',
    'movieId',
    'nameRU',
    'nameEN'];
  // Пропущенные поля
  const missingFields = [];

  requiredFields.forEach((field) => {
    if (!movieCard[field]) {
      missingFields.push(field);
    }
  });
  // Проверка наличия обязательных полей
  if (missingFields.length > 0) {
    return false;
  }
  // Проверка имен
  if (!NAME_RU_REGEX.test(movieCard.nameRU) || !NAME_EN_REGEX.test(movieCard.nameEN)) {
    return false;
  }
  // Проверка ссылок
  if (!LINK_REGEX.test(movieCard.image) || !LINK_REGEX.test(movieCard.thumbnail)) {
    return false;
  }
  return true;
}

export default validateMovieCard;
