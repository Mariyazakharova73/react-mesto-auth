import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteCardPopup({ isOpen, onClose, cardToDelete, onCardDelete }) {

  function handleSubmit(evt) {
    evt.preventDefault();
    onCardDelete(cardToDelete);
    onClose()
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="delete-button"
      title="Вы уверены?"
      buttonText="Да"
      onClose={onClose}
      isOpen={isOpen}
      onCardDelete={onCardDelete}
    ></PopupWithForm>
  );
}

export default DeleteCardPopup;
