/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard({
  movie,
  onSaveMovie,
  onDeleteMovie,
  saved,
}) {
  // Для написания длительности фильма в формате '##ч ##м'
  const hours = Math.floor(movie.duration / 60);
  const minutes = movie.duration - (hours * 60);
  const formatedDuration = `${hours}ч ${minutes}м`;

  const [isLiked, setIsLiked] = useState(false);

  // Like Card
  const handleCardLike = async () => {
    try {
      if (!isLiked) {
        await onSaveMovie(movie);
        setIsLiked(!isLiked);
      } else {
        await onDeleteMovie(movie);
        setIsLiked(!isLiked);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };
  // Delete Saved Card
  function handleDeleteCard() {
    onDeleteMovie(movie);
    setIsLiked(false);
  }

  const isMovies = useMatch({ path: '/movies', exact: true });

  useEffect(() => {
    if (isMovies && saved !== undefined) {
      setIsLiked(true);
    }
  }, [saved, setIsLiked]);

  return (
    <article className="card">
      <div className="card__image-wrapper">
        <a href={movie.trailerLink} target="_blank" rel="noreferrer">
          <img
            className="card__image"
            src={movie.image}
            alt={movie.nameRU}
          />
        </a>

        {isMovies ? (
          <button
            type="button"
            onClick={handleCardLike}
            className={!isLiked ? 'card__save-btn' : 'card__saved-btn'}
            aria-label="Добавить фильм"
          >
            {!isLiked ? 'Сохранить' : ''}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleDeleteCard}
            className="card__delete-btn"
            aria-label="Удалить фильм"
          />
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
