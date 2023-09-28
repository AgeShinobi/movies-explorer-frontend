import React from 'react';
import './ShowMoreButton.css';

// eslint-disable-next-line react/prop-types
function ShowMoreButton({ onShowMore }) {
  return (
    <section className="show-more page__show-more">
      <button
        type="button"
        className="show-more__button"
        aria-label="Ещё"
        onClick={onShowMore}
      >
        Ещё
      </button>
    </section>
  );
}

export default ShowMoreButton;
