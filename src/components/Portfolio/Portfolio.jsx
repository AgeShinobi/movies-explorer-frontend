/* eslint-disable react/prop-types */
import React from 'react';
import './Portfolio.css';
import '../Techs/Techs.css';

function Portfolio({
  githubLink,
  linkStatic,
  linkAdaptive,
  linkApp,
}) {
  return (
    <section className="portfolio page__portfolio">
      <h2 className="tech__title">Студент</h2>
      <section className="portfolio__resume">
        <div className="portfolio__info">
          <h2 className="portfolio__name">
            Андрей
          </h2>
          <h3 className="portfolio__job">
            Фронтенд-разработчик, 25 лет
          </h3>
          <p className="portfolio__about">
            Я родился и живу в Мытищах,
            получил высшее образование в МГСУ на факультете
            Механизации и Автоматизации строительства. Недавно начал кодить.
            С 2020 года работаю по специальности инженером в сфере вертикального транспорта.
            После того, как прошёл курс по веб-разработке,
            начал параллельно заниматься фриланс-заказами и участвовать в стартапах.
          </p>
          <a
            className="portfolio__github portfolio__link"
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </div>
        <div className="portfolio__image" />
      </section>
      <h2 className="portfolio__title">
        Портфолио
      </h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a
            className="portfolio__project portfolio__link"
            href={linkStatic}
            target="_blank"
            rel="noopener noreferrer"
          >
            Статичный сайт
          </a>
          <span className="portfolio__arrow">&#8599;</span>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__project portfolio__link"
            href={linkAdaptive}
            target="_blank"
            rel="noopener noreferrer"
          >
            Адаптивный сайт
          </a>
          <span className="portfolio__arrow">&#8599;</span>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__project portfolio__link"
            href={linkApp}
            target="_blank"
            rel="noopener noreferrer"
          >
            Одностраничное приложение
          </a>
          <span className="portfolio__arrow">&#8599;</span>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
