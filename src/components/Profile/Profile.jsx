/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, {
  useState, useContext, useEffect, useCallback,
} from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './Profile.css';

function Profile({ onLogout, onChangeUserInfo }) {
  // disable инпутов когда не редактируется информация
  const [isDisabled, setIsDisabled] = useState(true);
  // disable кнопки сохранения если изменений нет
  const [saveBtnActive, setSaveBtnActive] = useState(false);

  const currentUser = useContext(CurrentUserContext);
  const [titleName, setTitleName] = useState('Друг');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // При изменении данных профиля вызывается useEffect
  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
    setTitleName(currentUser.name);
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
  // Если значения не менялись, кнопка сохранения недоступна
  useEffect(() => {
    if (name === currentUser.name && email === currentUser.email) {
      setSaveBtnActive(false);
    } else {
      setSaveBtnActive(true);
    }
  }, [name, email]);

  const handleSubmit = useCallback((e) => {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    onChangeUserInfo(name, email);
    handleEdit();
  }, [name, email]);

  return (
    <section className="profile page__profile">
      <h2 className="profile__greetings">
        {`Привет, ${titleName}!`}
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
              className={`profile__button profile__button_edit ${!saveBtnActive && 'profile__button_disabled'}`}
              type="button"
              onClick={handleSubmit}
              disabled={!saveBtnActive}
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
