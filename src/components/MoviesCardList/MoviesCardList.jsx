/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import NotFoundMovies from '../NotFoundMovies/NotFoundMovies';
import Preloader from '../Preloader/Preloader';
import './MoviesCardList.css';
import { MOVIES_IMAGE_URL } from '../../config';

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
              key={card.id}
              image={`${MOVIES_IMAGE_URL}${card.image.url}`}
              name={card.nameRU}
              duration={card.duration}
              onSaveMovie={onSaveMovie}
              onDeleteMovie={onDeleteMovie}
            />
          ))
        )}
    </section>
  );
}

export default MoviesCardList;
