/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useMatch } from 'react-router-dom';
import './MoviesCard.css';
// import cardImage from '../../images/33-words-about-design.png'

function MoviesCard({
  movie,
  image,
  name,
  duration,
  onSaveMovie,
  onDeleteMovie,
}) {
  // Для написания длительности фильма в формате '##ч ##м'
  const hours = Math.floor(duration / 60);
  const minutes = duration - (hours * 60);
  const formatedDuration = `${hours}ч ${minutes}м`;

  const [isLiked, setIsLiked] = useState(false);
  // Like Card
  function handleCardLike() {
    if (!isLiked) {
      console.log('movie =====>', movie);
      onSaveMovie(movie);
    } else {
      onDeleteMovie(movie.id);
    }
    setIsLiked(!isLiked);
  }

  const isMovies = useMatch({ path: '/movies', exact: true });

  return (
    <article className="card">
      <div className="card__image-wrapper">
        <img className="card__image" src={image} alt={name} />
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
          {name}
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
