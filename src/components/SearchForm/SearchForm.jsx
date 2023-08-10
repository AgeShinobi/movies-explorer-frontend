/* eslint-disable react/prop-types */
/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback } from 'react';
import './SearchForm.css';

function SearchForm({
  onSearch,
  filterStatus,
  onFilter,
  searchValue,
  onChangeSearchValue,
}) {
  // Submit поисковой строки
  const handleSubmit = useCallback(async (e) => {
    try {
      e.preventDefault();
      onSearch(searchValue);
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
          className="search__submit"
          aria-label="Найти"
        />
      </form>
      <div className="search__wrapper">
        <input
          className="search__checkbox"
          id="filterCheckbox"
          type="checkbox"
        />
        <label
          htmlFor="filterCheckbox"
          className={`search__checkbox-label 
          ${filterStatus ? 'search_checkbox-tube_on' : 'search_checkbox-tube_off'}`}
          onClick={onFilter}
        />
        <span className="search__checkbox-title">
          Короткометражки
        </span>
      </div>
    </section>
  );
}

export default SearchForm;
