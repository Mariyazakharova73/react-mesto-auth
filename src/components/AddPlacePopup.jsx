import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, loadingData }) {
  const [cardName, setCardName] = React.useState('');
  const [cardLink, setCardLink] = React.useState('');

  function handleCardName(evt) {
    setCardName(evt.target.value);
  }

  function handleCardLink(evt) {
    setCardLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace(cardName, cardLink);
  }

  React.useEffect(() => {
    setCardName('');
    setCardLink('');
  }, [isOpen]);

  return (
    <PopupWithForm onSubmit={handleSubmit} onClose={onClose} isOpen={isOpen} name="add-button" title="Новое место" buttonText={loadingData ? 'Создание...' : 'Создать'}>
      <input value={cardName} onChange={handleCardName} id="title-input" className="popup__form-input" type="text" name="name" placeholder="Название" minLength="2" maxLength="30" required />
      <span className="title-input-error popup__input-error"></span>
      <input value={cardLink} onChange={handleCardLink} id="link-input" className="popup__form-input" type="url" name="link" placeholder="Ссылка на картинку" required />
      <span className="link-input-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
