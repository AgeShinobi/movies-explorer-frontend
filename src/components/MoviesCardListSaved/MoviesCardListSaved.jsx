/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import NotFoundMovies from '../NotFoundMovies/NotFoundMovies';

import { getSavedMovieCard } from '../../utils/SearchMovies';
import '../MoviesCardList/MoviesCardList.css';

function MoviesCardList({
  filterStatus,
  savedMovies,
  savedMoviesShort,
  searchedSavedMovies,
  searchedShortSavedMovies,
  numCards,
  onDeleteMovie,
  isSearchedSave,
}) {
  const [movieCards, setMovieCards] = useState(savedMovies);

  useEffect(() => {
    if (!isSearchedSave) {
      if (!filterStatus) {
        setMovieCards(savedMovies);
      } else {
        setMovieCards(savedMoviesShort);
      }
    } else if (!filterStatus) {
      setMovieCards(searchedSavedMovies);
    } else {
      setMovieCards(searchedShortSavedMovies);
    }
  }, [
    filterStatus, setMovieCards, savedMovies,
    savedMoviesShort, searchedSavedMovies, searchedShortSavedMovies,
  ]);

  return (
    <section className={`cards page__cards ${movieCards.length === 0 && 'cards_not-found'}`}>
      {movieCards.length === 0 && <NotFoundMovies />}
      {movieCards.slice(0, numCards).map((card) => (
        <MoviesCard
          movie={card}
          key={card.movieId}
          onDeleteMovie={onDeleteMovie}
          saved={getSavedMovieCard(savedMovies, card)}
        />
      ))}
    </section>
  );
}

export default MoviesCardList;
