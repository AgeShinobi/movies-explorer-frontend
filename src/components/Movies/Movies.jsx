import React from 'react';
import { useMatch } from 'react-router-dom';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import ShowMoreButton from '../ShowMoreButton/ShowMoreButton';
import './Movies.css';

function Movies() {
  // На сохраненных фильмах кнопка "Ещё" не используется
  const isMovies = useMatch({ path: '/movies', exact: true });

  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList />
      {isMovies && <ShowMoreButton />}
    </main>
  );
}

export default Movies;
