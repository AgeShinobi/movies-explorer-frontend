import React from 'react';
import { useMatch } from 'react-router-dom';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import ShowMoreButton from '../ShowMoreButton/ShowMoreButton';
import './Movies.css';


function Movies() {
  const isMovies = useMatch({ path: '/movies', exact: true });
 
  return (
    <div className='movies'>
      <SearchForm />
      <MoviesCardList />
      {isMovies && <ShowMoreButton />}
      
    </div>
  )
}

export default Movies;