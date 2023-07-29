import MoviesCard from '../MoviesCard/MoviesCard';
// import Preloader from '../Preloader/Preloader';
import './MoviesCardList.css';

import moviesList from '../../Movies';

function MoviesCardList() {
  const displayWidth = window.innerWidth; // Get the display width

  let numElements;
  if (displayWidth <= 680) {
    numElements = 5; // Take 3 elements for small screens
  } else if (displayWidth <= 1080) {
    numElements = 8; // Take 5 elements for medium screens
  } else {
    numElements = 12; // Take 10 elements for large screens
    console.log(displayWidth);
  }

  return (
    <section className='cards page__cards'>
      {moviesList.slice(0, numElements).map((card) => {
        return (
          <MoviesCard
            key={card._id}
            duration={card.duration}
            image={card.image}
            name={card.nameRU}
          />
          // <Preloader/>
        )
      })}
    </section>
  )
}

export default MoviesCardList;