import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import ShowMoreButton from '../ShowMoreButton/ShowMoreButton';
import './Movies.css';

function Movies() {
  return (
    <div className='movies'>
      <SearchForm />
      <MoviesCardList />
      <ShowMoreButton />
    </div>
  )
}

export default Movies;