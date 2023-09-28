/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useMatch, useLocation } from 'react-router-dom';
import { SEARCHED_MOVIES } from '../../config';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCardListSaved from '../MoviesCardListSaved/MoviesCardListSaved';
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
  onSaveMovie,
  onDeleteMovie,
  savedMovies,
  savedMoviesShort,
}) {
  const location = useLocation();
  // описывает состояние страницы до совершения поиска (впервые на странице)
  const [firstOpen, setFirstOpen] = useState(true);
  // Стейт первого посещения сохраненных фильмов
  const [isSearchedSave, setIsSearchedSave] = useState(false);
  // количество отрисованных карточек
  const [numCards, setNumCards] = useState(12);
  // количество добавленных карточек на кнопку "Еще"
  const [moreCards, setMoreCards] = useState(3);

  // На сохраненных фильмах кнопка "Ещё" не используется
  const isMovies = useMatch({ path: '/movies', exact: true });

  // Resize
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

  let timeoutId;

  const delayedResize = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(handleResize, 500); // Adjust the delay time as needed
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', delayedResize);
    return () => {
      window.removeEventListener('resize', delayedResize);
    };
  }, []);

  useEffect(() => {
    setIsSearchedSave(false);
  }, [location]);

  // Load more cards
  const handleLoadMore = () => {
    setNumCards(numCards + moreCards);
  };

  // При новом запросе поиска обновляем количество карточек до дефолтного
  useEffect(() => {
    handleResize();
  }, [searchedMovies, searchedShortMovies]);

  // Проверяет наличие запросов поиска ранее и открывает чекбокс
  useEffect(() => {
    if (localStorage.getItem(SEARCHED_MOVIES) !== null) {
      setFirstOpen(false);
    }
  }, []);

  return (
    <main className="movies">
      {isMovies ? (
        <>
          <SearchForm
            onSearch={onSearch}
            filterStatus={filterStatus}
            onFilter={onFilter}
            searchValue={searchValue}
            onChangeSearchValue={onChangeSearchValue}
            firstOpen={firstOpen}
            changeFirstOpen={setFirstOpen}
          />
          <MoviesCardList
            filterStatus={filterStatus}
            searchedMovies={searchedMovies}
            searchedShortMovies={searchedShortMovies}
            numCards={numCards}
            onSaveMovie={onSaveMovie}
            onDeleteMovie={onDeleteMovie}
            savedMovies={savedMovies}
            firstOpen={firstOpen}
          />
        </>
      ) : (
        // Saved Movies
        <>
          <SearchForm
            isMovies={isMovies}
            onSearch={onSearch}
            filterStatus={filterStatus}
            onFilter={onFilter}
            searchValue={searchValue}
            onChangeSearchValue={onChangeSearchValue}
            isSearchedSave={isSearchedSave}
            setIsSearchedSave={setIsSearchedSave}
          />
          <MoviesCardListSaved
            filterStatus={filterStatus}
            savedMovies={savedMovies}
            savedMoviesShort={savedMoviesShort}
            searchedSavedMovies={searchedMovies}
            searchedShortSavedMovies={searchedShortMovies}
            numCards={numCards}
            onDeleteMovie={onDeleteMovie}
            isSearchedSave={isSearchedSave}
          />
        </>
      )}
      {isMovies && (
        (!filterStatus && searchedMovies.length > numCards)
        || (filterStatus && searchedShortMovies.length > numCards)
      ) && <ShowMoreButton onShowMore={handleLoadMore} />}
    </main>
  );
}

export default Movies;
