/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext, useEffect } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './Profile.css';

function Profile({ onLogout }) {
  const [isDisabled, setIsDisabled] = useState(true);

  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  function handleEdit() {
    setIsDisabled(!isDisabled);
  }
  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log('Данные изменены');

    handleEdit();
  }

  return (
    <section className="profile page__profile">
      <h2 className="profile__greetings">
        {`Привет, ${name}!`}
      </h2>

      <form
        className="profile__form"
      >
        <div className="profile__data">
          <label
            htmlFor="input-name"
            className="profile__label"
          >
            Имя
          </label>
          <input
            onChange={handleChangeName}
            name="name"
            id="input-name"
            type="text"
            className={`profile__input ${!isDisabled ? 'profile__input_enable' : ''}`}
            placeholder="Имя"
            value={name}
            disabled={isDisabled}
          />
        </div>

        <div className="profile__data">
          <label className="profile__label">
            E-mail
          </label>
          <input
            onChange={handleChangeEmail}
            name="email"
            id="input-email"
            type="email"
            className={`profile__input ${!isDisabled ? 'profile__input_enable' : ''}`}
            placeholder="E-mail"
            value={email}
            disabled={isDisabled}
          />
        </div>

        {isDisabled ? (
          <button
            className="profile__button profile__button_edit"
            type={isDisabled ? 'button' : 'submit'}
            onClick={handleEdit}
          >
            Редактировать
          </button>
        )
          : (
            <button
              className="profile__button profile__button_edit"
              type="button"
              onClick={handleSubmit}
            >
              Сохранить
            </button>
          )}
      </form>

      <button
        className="profile__button profile__button_logout"
        type="button"
        onClick={onLogout}
      >
        Выйти из аккаунта
      </button>
    </section>
  );
}

export default Profile;
