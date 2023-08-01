import './AboutProject.css';
import React from 'react';

function AboutProject() {
  return (
    <section className="about page__about" id="section-about">
      <h2 className="about__title">О проекте</h2>
      <div className="about__row-wrapper">
        <article className="about__column-wrapper">
          <h3 className="about__subtitle">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about__text">
            Составление плана, работу над бэкендом,
            вёрстку, добавление функциональности и
            финальные доработки.
          </p>
        </article>
        <article className="about__column-wrapper">
          <h3 className="about__subtitle">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about__text">
            У каждого этапа был мягкий и жёсткий дедлайн,
            которые нужно было соблюдать,
            чтобы успешно защититься.
          </p>
        </article>
      </div>
      <section className=" about__timeline-section">
        <div className="about__timeline about__timeline-back">
          <p className="about__timeline-text">
            1 неделя
          </p>
        </div>
        <div className="about__timeline about__timeline-front">
          <p className="about__timeline-text">
            4 недели
          </p>
        </div>
        <h3 className="about__timeline-description">
          Back-end
        </h3>
        <h3 className="about__timeline-description">
          Front-end
        </h3>
      </section>
    </section>
  );
}

export default AboutProject;
