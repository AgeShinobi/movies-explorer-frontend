import MoviesCard from '../MoviesCard/MoviesCard';
// import Preloader from '../Preloader/Preloader';
import './MoviesCardList.css';

import moviesList from '../../Movies';

function MoviesCardList () {
  return (
    <section className='cards page__cards'>
      {moviesList.map((card) => {
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