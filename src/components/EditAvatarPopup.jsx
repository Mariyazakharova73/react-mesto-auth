import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, loadingData }) {
  let newLink = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar(newLink.current.value);
    newLink.current.value = '';
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} onClose={onClose} isOpen={isOpen} name="avatar" title="Обновить аватар" buttonText={loadingData ? 'Сохранение...' : 'Сохранить'}>
      <input ref={newLink} id="link-input-avatar" className="popup__form-input" type="url" name="link" placeholder="Ссылка на картинку" required />
      <span className="link-input-avatar-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
