import React, { useState } from 'react';
import './SearchForm.css';
// import searchButton from '../../images/search-button.svg'

function SearchForm() {
  const [filterStatus, setFilterStatus] = useState(false);

  const changeFilterStatus = () => {
    if (filterStatus === false) {
      setFilterStatus(true);
    } else {
      setFilterStatus(false);
    }
  }

  return (
    <section className='search page__search'>
      <form id='searchForm' className='search__form'>
        <input
          className='search__input'
          name='search'
          id='searchInput'
          type='search'
          placeholder='Фильм'
        />
        <button
          className='search__submit'
          type='submit'
        />
      </form>
      <div className='search__wrapper'>
        <input
          className='search__checkbox'
          id='filterCheckbox'
          type='checkbox'
        />
        <label
          htmlFor='filterCheckbox'
          className={`search__checkbox-label ${filterStatus ? 'search__checkbox-tube_on' : 'search__checkbox-tube_off'}`}
          onClick={changeFilterStatus}
        ></label>
        <span className='search__checkbox-title'>
          Короткометражки
        </span>
      </div>


    </section>
  )
}

export default SearchForm;