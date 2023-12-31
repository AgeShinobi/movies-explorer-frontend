import './Promo.css';
import React from 'react';
import { Link } from 'react-scroll';
import promoImage from '../../images/promo-image.svg';

function Promo() {
  return (
    <section className="promo page__promo">
      <div className="promo__wrapper">
        <h1 className="promo__main-text">
          Учебный проект студента
          факультета Веб-разработки.
        </h1>
        <p className="promo__text">
          Листайте ниже, чтобы узнать больше про этот
          проект и его создателя.
        </p>
        <Link
          to="section-about"
          smooth
          className="promo__link"
        >
          Узнать больше
        </Link>
      </div>
      <img
        src={promoImage}
        alt="Промо картинка"
        className="promo__image"
      />
    </section>
  );
}

export default Promo;
