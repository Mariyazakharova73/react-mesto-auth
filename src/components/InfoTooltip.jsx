import React from 'react';

function InfoTooltip({ popupText, altText, link, isOpen, onClose }) {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__content">
        <button className="popup__close" type="button" onClick={onClose}/>
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

export default InfoTooltip;