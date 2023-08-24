/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useMatch } from 'react-router-dom';
import './MoviesCard.css';
// import cardImage from '../../images/33-words-about-design.png'

function MoviesCard({
  movie,
  onSaveMovie,
  onDeleteMovie,
}) {
  // Для написания длительности фильма в формате '##ч ##м'
  const hours = Math.floor(movie.duration / 60);
  const minutes = movie.duration - (hours * 60);
  const formatedDuration = `${hours}ч ${minutes}м`;

  const [isLiked, setIsLiked] = useState(false);
  // Like Card
  function handleCardLike() {
    try {
      if (!isLiked) {
        onSaveMovie(movie);
        setIsLiked(!isLiked);
      } else {
        onDeleteMovie(movie._id);
        setIsLiked(!isLiked);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }

  const isMovies = useMatch({ path: '/movies', exact: true });

  return (
    <article className="card">
      <div className="card__image-wrapper">
        <img className="card__image" src={movie.image} alt={movie.nameRU} />
        {isMovies && (
          <button
            type="button"
            onClick={handleCardLike}
            className={!isLiked ? 'card__save-btn' : 'card__saved-btn'}
            aria-label="Добавить фильм"
          >
            {!isLiked ? 'Сохранить' : ''}
          </button>
        )}
      </div>
      <div className="card__wrapper">
        <h2 className="card__title">
          {movie.nameRU}
        </h2>
        <time
          className="card__duration"
        >
          {formatedDuration}
        </time>
      </div>
    </article>
  );
}

export default MoviesCard;
