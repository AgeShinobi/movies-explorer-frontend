import React, { useState } from 'react';
import './MoviesCard.css';
// import cardImage from '../../images/33-words-about-design.png'

function MoviesCard({ image, name, duration }) {
  const [isLiked, setIsLiked] = useState(false)

  function handleCardLike() {
    isLiked === false ? setIsLiked(true) : setIsLiked(false)
  }

  return (
    <article className="card">
      <div className='card__image-wrapper'>
        <img className="card__image" src={image} alt={name} />
        {
          !isLiked ? 
          <button onClick={handleCardLike} className='card__save-btn'>Сохранить</button> :
          <button onClick={handleCardLike} className='card__saved-btn'></button>
        }
      </div>
      <div className="card__wrapper">
        <h2 className="card__title">
          {name}
        </h2>
        <time
          className='card__duration'
        >
          {duration}
        </time>
      </div>
    </article>
  )
}

export default MoviesCard;