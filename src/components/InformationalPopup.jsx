import React from 'react';

function InformationalPopup({ popupText, altText, link }) {
  return (
    <div className="popup">
      <div className="popup__content">
        <button className="popup__close" type="button"></button>
        <div className="popup__form-content">
            <form className="popup__content-wrapper">
              <img className="popup__registration-image" src={link} alt={`${altText}.`} />
              <h2 className="popup__form-heading">{popupText}</h2>
            </form>
        </div>
      </div>
    </div>
  );
}

export default InformationalPopup;
