/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import NotFoundMovies from '../NotFoundMovies/NotFoundMovies';

import { getSavedMovieCard } from '../../utils/SearchMovies';
import './MoviesCardList.css';

function MoviesCardList({
  filterStatus,
  searchedMovies,
  searchedShortMovies,
  numCards,
  onSaveMovie,
  onDeleteMovie,
  savedMovies,
  firstOpen,
}) {
  const [movieCards, setMovieCards] = useState(searchedMovies);

  useEffect(() => {
    if (!filterStatus) {
      setMovieCards(searchedMovies);
    } else {
      setMovieCards(searchedShortMovies);
    }
  }, [filterStatus, setMovieCards, searchedMovies, searchedShortMovies]);

  return (
    <section className={`cards page__cards ${movieCards.length === 0 && 'cards_not-found'}`}>
      {movieCards.length === 0 && !firstOpen && <NotFoundMovies />}
      {movieCards.slice(0, numCards).map((card) => (
        <MoviesCard
          movie={card}
          key={card.movieId}
          onSaveMovie={onSaveMovie}
          onDeleteMovie={onDeleteMovie}
          saved={getSavedMovieCard(savedMovies, card)}
        />
      ))}
    </section>
  );
}

export default MoviesCardList;
