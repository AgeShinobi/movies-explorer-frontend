import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import headerLogo from '../../images/header-logo.svg';

function Header({ loggedIn }) {
  if (!loggedIn) {
    return (
      <header
        className='header page__header header__color_blue'
      >
        <img
          src={headerLogo}
          alt="Логотип"
          className="header__logo"
        />
        <div className="header__wrapper">
          <Link to='/signup' className="header__link header__link_signup">
            Регистрация
          </Link>
          <Link to='/signin' className="header__link header__link_signin">
            Войти
          </Link>
        </div>
      </header>
    )
  } else {
    return (
      <header
        className='header page__header header__color_gray'
      >
        <div className='header__wrapper'>
          <img
            src={headerLogo}
            alt="Логотип"
            className="header__logo"
          />
          <Link to='/movies' className="header__link header__link_films">
            Фильмы
          </Link>
          <Link to='/saved-movies' className="header__link header__link_saved">
            Сохранённые фильмы
          </Link>
        </div>
        <Link to='/me' className='header__wrapper header__wrapper_account'>
          <h3 to='/me' className="header__link_account">
            Аккаунт
          </h3>
          <div className='header__account-icon' />
        </Link>
      </header>
    )
  }
}

export default Header;