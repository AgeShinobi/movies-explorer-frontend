import React, { useState, useCallback } from "react";
import { Link, Navigate } from "react-router-dom";
import logoLink from '../../images/header-logo.svg';
import './Register.css';

function Register({ isLoggedIn, onRegister }) {
  // TODO useState for Validation errors 
  const error = true;

  const [formValue, setFormValue] = useState({
    name: '',
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
      onRegister(formValue);
    } catch (err) {
      console.log(err);
    } finally {
      setFormValue({ name: '', email: '', password: '' })
    }
  }, [onRegister, formValue]);

  if (isLoggedIn) {
    return <Navigate to='/movies' replace={true} />
  }

  return (
    <section className="register page__register">
      <img className='register__logo' src={logoLink} alt='Логотип' />
      <h2 className="register__title">
        Добро пожаловать!
      </h2>
      <form onSubmit={handleSubmit} className="register__form">

        <div className="register__input-wrapper">
          <label className="register__label" htmlFor="name-input">
            Имя
          </label>
          <input
            name="name" id="name-input" onChange={handleChange}
            value={formValue.name}
            className={`register__input`} type="text"
            minLength="2" maxLength='30' autoFocus
            required
          />
          {/* {error &&
            <span className="register__input-error">
              Что-то пошло не так...
            </span>
          } */}
        </div>

        <div className="register__input-wrapper">
          <label className="register__label" htmlFor="email-input">
            E-mail
          </label>
          <input
            name="email" id="email-input" onChange={handleChange}
            value={formValue.email}
            className={`register__input`} type="email"
            minLength="2" maxLength='50'
            required
          />
          {/* {error &&
            <span className="register__input-error">
              Что-то пошло не так...
            </span>
          } */}
        </div>

        <div className="register__input-wrapper">
          <label className="register__label" htmlFor="password-input">
            Пароль
          </label>
          <input
            name="password" id="password-input" onChange={handleChange}
            value={formValue.password}
            className={`register__input ${error ? 'input_type_error' : ''}`} type="password"
            minLength="8" maxLength="200"
            required
          />
          {error &&
            <span className="register__input-error">
              Что-то пошло не так...
            </span>
          }
        </div>

        <button className="register__submit" type="submit">Зарегистрироваться</button>
      </form>
      <div className="register__wrapper">
        <p className="register__question">Уже зарегистрированы?</p>
        <Link to='/signin' className="register__link">Войти</Link>
      </div>
    </section>
  );
}

export default Register;