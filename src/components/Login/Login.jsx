/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback } from 'react';
import { Link, Navigate } from 'react-router-dom';
import '../Register/Register.css';

import useFormWithValidation from '../../hooks/useForm';
import { EMAIL_REGEX } from '../../config';

function Login({ loggedIn, onLogin }) {
  const {
    values, errors, handleChange, resetForm, isValid,
  } = useFormWithValidation();

  const handleSubmit = useCallback(async (e) => {
    try {
      e.preventDefault();
      await onLogin(values);
      resetForm();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }, [onLogin, values]);

  if (loggedIn) {
    return <Navigate to="/movies" replace />;
  }

  return (
    <section className="register page__register">
      <Link
        to="/"
        className="header__logo"
      />
      <h2 className="register__title">
        Рады видеть!
      </h2>
      <form onSubmit={handleSubmit} className="register__form">
        {/* E-mail */}
        <div className="register__input-wrapper">
          <label
            className="register__label"
            htmlFor="email-input"
          >
            E-mail
          </label>
          <input
            name="email"
            pattern={EMAIL_REGEX}
            id="email-input"
            onChange={handleChange}
            value={values.email || ''}
            className={`register__input ${errors.email && 'input_type_error'}`}
            type="email"
            minLength="2"
            maxLength="50"
            required
          />
          {errors
            && (
              <span className="register__input-error">
                {errors.email || ''}
              </span>
            )}
        </div>
        {/* Password */}
        <div className="register__input-wrapper">
          <label
            htmlFor="password-input"
            className="register__label"
          >
            Пароль
          </label>
          <input
            name="password"
            id="password-input"
            onChange={handleChange}
            value={values.password || ''}
            className={`register__input ${errors.password && 'input_type_error'}`}
            type="password"
            minLength="8"
            maxLength="200"
            required
          />
          {errors
            && (
              <span className="register__input-error">
                {errors.password || ''}
              </span>
            )}
        </div>
        <button
          className={`register__submit ${isValid ? 'register__submit_type_enabled' : ''}`}
          type="submit"
          aria-label="Войти"
          disabled={!isValid}
        >
          Войти
        </button>
      </form>
      <div className="register__wrapper">
        <p className="register__question">Ещё не зарегистрированы?</p>
        <Link to="/signup" className="register__link">Регистрация</Link>
      </div>
    </section>
  );
}

export default Login;
