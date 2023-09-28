/* eslint-disable react/prop-types */
import React from 'react';
import './InfoPopup.css';

function InfoPopup({ popupIsOpen, isError, popupMessage }) {
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {popupIsOpen && (
        <div className={`info-popup ${isError ? 'info-popup_type_error' : 'info-popup_type_ok'}`}>
          <p className="info-popup__message">{popupMessage}</p>
        </div>
      )}
    </>
  );
}

export default InfoPopup;
