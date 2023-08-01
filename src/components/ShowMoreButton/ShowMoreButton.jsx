import React from 'react';
import './ShowMoreButton.css';

function ShowMoreButton() {
  return (
    <section className="show-more page__show-more">
      <button
        type="button"
        className="show-more__button"
        aria-label="Ещё"
      >
        Ещё
      </button>
    </section>
  );
}

export default ShowMoreButton;
