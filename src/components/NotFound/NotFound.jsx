import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="not-found ">
      <h1 className="not-found__title">404</h1>
      <h2 className="not-found__text">Страница не найдена</h2>
      <button type="button" onClick={goBack} className="not-found__link">Назад</button>
    </div>
  );
}

export default NotFound;
