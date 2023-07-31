/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useMatch } from 'react-router-dom';
import './MoviesCard.css';
// import cardImage from '../../images/33-words-about-design.png'

function MoviesCard({
  image,
  name,
  duration,
}) {
  const [isLiked, setIsLiked] = useState(false);
  // Like Card
  function handleCardLike() {
    setIsLiked(!isLiked);
  }
  // Удаляет карточку из SavedMovies
  function handleRemoveCard() {
    // setIsLiked(false);
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
        {!isMovies && (
          <button
            type="button"
            onClick={handleRemoveCard}
            className="card__delete-btn"
            aria-label="Удалить фильм"
          />
        )}

      </div>
      <div className="card__wrapper">
        <h2 className="card__title">
          {name}
        </h2>
        <time
          className="card__duration"
        >
          {duration}
        </time>
      </div>
    </article>
  );
}

export default MoviesCard;
