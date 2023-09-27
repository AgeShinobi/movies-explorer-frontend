/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback } from 'react';
import './SearchForm.css';

function SearchForm({
  isMovies,
  onSearch,
  filterStatus,
  onFilter,
  searchValue,
  onChangeSearchValue,
  firstOpen,
  changeFirstOpen,
  isSearchedSave,
  setIsSearchedSave,
}) {
  // Submit поисковой строки
  const handleSubmit = useCallback(async (e) => {
    try {
      e.preventDefault();
      await onSearch(searchValue);
      if (firstOpen === true) {
        changeFirstOpen(false);
      }
      if (!isMovies && !isSearchedSave) {
        setIsSearchedSave(true);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }, [onSearch, searchValue]);

  return (
    <section className="search page__search">
      <form
        id="searchForm"
        className="search__form"
        onSubmit={handleSubmit}
      >
        <input
          className="search__input"
          name="search"
          id="searchInput"
          type="search"
          placeholder="Фильм"
          value={searchValue}
          onChange={onChangeSearchValue}
        />
        <button
          type="submit"
          className={`search__submit ${searchValue !== '' && 'search_submit_enable'}`}
          aria-label="Найти"
          disabled={searchValue === '' && true}
        />
      </form>
      <div className="search__wrapper">
        <input
          className="search__checkbox"
          id="filterCheckbox"
          type="checkbox"
          disabled={firstOpen}
        />
        {firstOpen ? (
          <label
            htmlFor="filterCheckbox"
            className="search__checkbox-label search_checkbox-tube_off"
          />
        ) : (
          <label
            htmlFor="filterCheckbox"
            className={`search__checkbox-label 
          ${filterStatus ? 'search_checkbox-tube_on' : 'search_checkbox-tube_off'}`}
            onClick={onFilter}
          />
        )}
        <span className="search__checkbox-title">
          Короткометражки
        </span>
      </div>
    </section>
  );
}

export default SearchForm;
