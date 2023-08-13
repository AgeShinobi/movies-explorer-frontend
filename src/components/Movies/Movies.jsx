/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useMatch } from 'react-router-dom';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import ShowMoreButton from '../ShowMoreButton/ShowMoreButton';
import './Movies.css';

function Movies({
  onSearch,
  searchedMovies,
  searchedShortMovies,
  filterStatus,
  onFilter,
  searchValue,
  onChangeSearchValue,
  loading,
  onSaveMovie,
  onDeleteMovie,
}) {
  // На сохраненных фильмах кнопка "Ещё" не используется
  const isMovies = useMatch({ path: '/movies', exact: true });
  // количество отрисованных карточек
  const [numCards, setNumCards] = useState(12);
  // количество добавленных карточек на кнопку "Еще"
  const [moreCards, setMoreCards] = useState(3);

  // Resize
  useEffect(() => {
    const handleResize = () => {
      const displayWidth = window.innerWidth;
      if (displayWidth <= 680) {
        // for small screens
        setNumCards(5);
        setMoreCards(2);
      } else if (displayWidth <= 1080) {
        // for medium screens
        setNumCards(8);
        setMoreCards(2);
      } else {
        // for large screens
        setNumCards(12);
        setMoreCards(3);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Load more cards
  const handleLoadMore = () => {
    setNumCards(numCards + moreCards);
  };

  return (
    <main className="movies">
      <SearchForm
        onSearch={onSearch}
        filterStatus={filterStatus}
        onFilter={onFilter}
        searchValue={searchValue}
        onChangeSearchValue={onChangeSearchValue}
      />
      <MoviesCardList
        filterStatus={filterStatus}
        searchedMovies={searchedMovies}
        searchedShortMovies={searchedShortMovies}
        numCards={numCards}
        loading={loading}
        onSaveMovie={onSaveMovie}
        onDeleteMovie={onDeleteMovie}
      />
      {isMovies
      && searchedMovies.length > numCards
      && <ShowMoreButton onShowMore={handleLoadMore} />}
    </main>
  );
}

export default Movies;
