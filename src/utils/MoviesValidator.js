/* eslint-disable import/prefer-default-export */
import {
  LINK_REGEX,
  NAME_EN_REGEX,
  NAME_RU_REGEX,
  // MOVIES_IMAGE_URL,
} from '../config';

function validateMovieCard(movie) {
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
    if (!movie[field]) {
      missingFields.push(field);
    }
  });
  // Проверка наличия обязательных полей
  if (missingFields.length > 0) {
    return false;
  }
  // Проверка имен
  if (!NAME_RU_REGEX.test(movie.nameRU) || !NAME_EN_REGEX.test(movie.nameEN)) {
    return false;
  }
  // Проверка ссылок
  if (!LINK_REGEX.test(movie.image) || !LINK_REGEX.test(movie.thumbnail)) {
    return false;
  }
  return true;
}

export default validateMovieCard;
