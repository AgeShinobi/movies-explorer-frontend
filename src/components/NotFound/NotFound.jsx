import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <div className="not-found ">
      <h1 className="not-found__title">404</h1>
      <h2 className="not-found__text">Страница не найдена</h2>
      <Link to="/" className="not-found__link">Назад</Link>
    </div>
  );
}

export default NotFound;
