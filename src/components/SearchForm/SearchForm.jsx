/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import './SearchForm.css';
// import searchButton from '../../images/search-button.svg'

function SearchForm() {
  // Стейт чекбокса "Короткометражки"
  const [filterStatus, setFilterStatus] = useState(false);

  // Переключатель чекбокса "Короткометражки"
  function changeFilterStatus() {
    setFilterStatus(!filterStatus);
  }

  return (
    <section className="search page__search">
      <form id="searchForm" className="search__form">
        <input
          className="search__input"
          name="search"
          id="searchInput"
          type="search"
          placeholder="Фильм"
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
          onClick={changeFilterStatus}
        />
        <span className="search__checkbox-title">
          Короткометражки
        </span>
      </div>
    </section>
  );
}

export default SearchForm;
