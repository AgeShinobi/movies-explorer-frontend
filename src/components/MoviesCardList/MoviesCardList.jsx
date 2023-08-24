/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import NotFoundMovies from '../NotFoundMovies/NotFoundMovies';
import Preloader from '../Preloader/Preloader';
import './MoviesCardList.css';

// eslint-disable-next-line react/prop-types
function MoviesCardList({
  filterStatus,
  searchedMovies,
  searchedShortMovies,
  numCards,
  loading,
  onSaveMovie,
  onDeleteMovie,
}) {
  const [movieCards, setMovieCards] = useState(searchedMovies);

  useEffect(() => {
    if (filterStatus) {
      setMovieCards(searchedShortMovies);
    } else {
      setMovieCards(searchedMovies);
    }
  });

  return (
    <section className={`cards page__cards ${movieCards.length === 0 && 'cards_not-found'}`}>
      {movieCards.length === 0 && <NotFoundMovies />}
      {loading
        ? <Preloader />
        : (
          movieCards.slice(0, numCards).map((card) => (
            <MoviesCard
              movie={card}
              key={card.movieId}
              onSaveMovie={onSaveMovie}
              onDeleteMovie={onDeleteMovie}
            />
          ))
        )}
    </section>
  );
}

export default MoviesCardList;
