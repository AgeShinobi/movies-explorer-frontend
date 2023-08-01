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
        ${isMain ? 'header_color_blue' : 'header_color_gray'}
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
              className="header__link-main header_link_signup"
            >
              Регистрация
            </Link>
            <Link to="/signin" className="header__link-main header_link_signin">
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
                    className="header__link header_link_main"
                  >
                    Главная
                  </Link>
                )}
                <Link
                  to="/movies"
                  className={`header__link header_link_films 
                ${isMovies ? 'header_link_selected' : ''}`}
                  onClick={isMenuOpen && toggleMenu}
                >
                  Фильмы
                </Link>
                <Link
                  to="/saved-movies"
                  className={`header__link header_link_saved
                ${isSavedMovies ? 'header_link_selected' : ''}`}
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
                <h3 className="header__link header_link_account">
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
