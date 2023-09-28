/* eslint-disable import/prefer-default-export */
/* eslint-disable arrow-body-style */
/* eslint-disable prefer-promise-reject-errors */
import { MOVIES_BASE_URL } from '../config';

// Получаем все видео с API BeatFilm
export const getMovies = () => {
  return fetch(MOVIES_BASE_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
      return res.json();
    });
};
