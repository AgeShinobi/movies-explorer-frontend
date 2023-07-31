import './Header.css';
import React, { useState } from 'react';
import { Link, useMatch } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const isMain = useMatch({ path: '/', exact: true });
  const isMovies = useMatch({ path: '/movies', exact: true });
  const isSavedMovies = useMatch({ path: '/saved-movies', exact: true });

  function toggleMenu() {
    setMenuOpen(!isMenuOpen);
  }

  return (
    <header
      className={`header page__header 
        ${isMain ? 'header__color_blue' : 'header__color_gray'}
        ${isMenuOpen ? 'header_menu_open' : ''}`}
    >
      {isMain && (
        <>
          <Link
            to="/"
            className="header__logo"
          />
          <div className="header__wrapper-main">
            <Link
              to="/signup"
              className="header__link_main-page header__link_signup"
            >
              Регистрация
            </Link>
            <Link to="/signin" className="header__link_main-page header__link_signin">
              Войти
            </Link>
          </div>
        </>
      )}
      {!isMain
        && (
          <>
            {isMenuOpen && <div className="header__shroud" />}
            <Link
              to="/"
              className="header__logo"
            />
            <button
              className="header__burger"
              type="button"
              aria-label="меню"
              onClick={toggleMenu}
            />
            <div className="header__wrapper">
              <div className="header__wrapper-links">
                {isMenuOpen && (
                  <Link
                    to="/"
                    className="header__link header__link_main"
                  >
                    Главная
                  </Link>
                )}
                <Link
                  to="/movies"
                  className={`header__link header__link_films 
                ${isMovies ? 'header__link_selected' : ''}`}
                  onClick={isMenuOpen && toggleMenu}
                >
                  Фильмы
                </Link>
                <Link
                  to="/saved-movies"
                  className={`header__link header__link_saved
                ${isSavedMovies ? 'header__link_selected' : ''}`}
                  onClick={isMenuOpen && toggleMenu}
                >
                  Сохранённые фильмы
                </Link>
              </div>

              <Link
                to="/profile"
                className="header__wrapper-account"
                onClick={isMenuOpen && toggleMenu}
              >
                <h3 className="header__link_account">
                  Аккаунт
                </h3>
                <div className="header__account-icon" />
              </Link>
            </div>
          </>
        )}
    </header>
  );
}

export default Header;
