/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
// import Preloader from '../Preloader/Preloader';
import './MoviesCardList.css';
import { MOVIES_IMAGE_URL } from '../../config';

// eslint-disable-next-line react/prop-types
function MoviesCardList({
  filterStatus,
  searchedMovies,
  numCards,
  searchedShortMovies,
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
    <section className="cards page__cards">
      {movieCards.slice(0, numCards).map((card) => (
        <MoviesCard
          key={card.id}
          duration={card.duration}
          image={`${MOVIES_IMAGE_URL}${card.image.url}`}
          name={card.nameRU}
        />
        // <Preloader/>
      ))}
    </section>
  );
}

export default MoviesCardList;
