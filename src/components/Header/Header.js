import './Header.css';
import headerLogo from '../../images/header-logo.svg';

function Header() {
  return (
    <header className='header page__header'>
      <img
        src={headerLogo}
        alt="Логотип"
        className="header__logo"
      />
      <div className="header__wrapper">
        <p className="header__link">Регистрация</p>
        <button
          type="button"
          className="header__signin-button"
        >
          Войти
        </button>
      </div>
    </header>
  )
}

export default Header;