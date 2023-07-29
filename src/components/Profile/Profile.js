import React, { useState } from 'react';
import './Profile.css';

function Profile() {
  const userName = 'Виталий';
  const userEmail = 'pochta@yandex.ru';

  const [isDisabled, setIsDisabled] = useState(true);
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);

  function handleEdit() {
    setIsDisabled(false);
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

    setIsDisabled(true);
  }

  return (
    <section className='profile page__profile'>
      <h2 className='profile__greetings'>
        Привет, {name}!
      </h2>
      <div className='profile__data'>
        <label className='profile__label'>
          Имя
        </label>
        <input
          onChange={handleChangeName}
          name='name'
          id='input-name'
          type='text'
          className={`profile__input ${!isDisabled ? 'profile__input_enable' : ''}`}
          placeholder='Имя'
          value={name}
          disabled={isDisabled}
        />
      </div>
      <div className='profile__data'>
        <label className='profile__label'>
          E-mail
        </label>
        <input
          onChange={handleChangeEmail}
          name='email'
          id='input-email'
          type='email'
          className={`profile__input ${!isDisabled ? 'profile__input_enable' : ''}`}
          placeholder='E-mail'
          value={email}
          disabled={isDisabled}
        />
      </div>

      {isDisabled ?
        <button
          className='profile__button profile__button_edit'
          type='button'
          onClick={handleEdit}
        >
          Редактировать
        </button>
        :
        <button
          className='profile__button profile__button_edit'
          type='submit'
          onClick={handleSubmit}
        >
          Сохранить
        </button>
      }

      <button
        className='profile__button profile__button_logout'
        type='button'
      >
        Выйти из аккаунта
      </button>
    </section>
  )
}

export default Profile;