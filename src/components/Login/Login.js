import React, { useState, useCallback } from "react";
import { Link, Navigate } from "react-router-dom";
import logoLink from '../../images/header-logo.svg';
import '../Register/Register.css';

function Login({ isLoggedIn, onLogin }) {

  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  })


  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  }, [formValue]);

  const handleSubmit = useCallback(async (e) => {
    try {
      e.preventDefault();
      onLogin(formValue);
    } catch (err) {
      console.log(err);
    } finally {
      setFormValue({ email: '', password: '' })
    }
  }, [onLogin, formValue]);

  if (isLoggedIn) {
    return <Navigate to='/movies' replace={true} />
  }

  return (
    <section className="register page__register">
      <img className='register__logo' src={logoLink} alt='Логотип' />
      <h2 className="register__title">
        Рады видеть!
      </h2>
      <form onSubmit={handleSubmit} className="register__form">
        <label className="register__label" htmlFor="email-input">
          E-mail
        </label>
        <input
          name="email" id="email-input" onChange={handleChange}
          value={formValue.email}
          className="register__input" type="email"
          minLength="2" maxLength='50'
          required
        />
        <label className="register__label" htmlFor="password-input">
          Пароль
        </label>
        <input
          name="password" id="password-input" onChange={handleChange}
          value={formValue.password}
          className="register__input" type="password"
          minLength="8" maxLength="200"
          required
        />
        <button className="register__submit" type="submit">Войти</button>
      </form>
      <div className="register__wrapper">
        <p className="register__question">Ещё не зарегистрированы?</p>
        <Link to='/signup' className="register__link">Регистрация</Link>
      </div>
    </section>
  );
}

export default Login;