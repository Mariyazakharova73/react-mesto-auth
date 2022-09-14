import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { useForm } from '../hooks/useForm.js';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, loadingData }) {
  // const [name, setName] = React.useState('');
  // const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, setValues } = useForm(currentUser);

  React.useEffect(() => {
    // setName(currentUser.name);
    // setDescription(currentUser.about);
    setValues(currentUser);
  }, [currentUser, isOpen]);

  // function handleName(evt) {
  //   setName(evt.target.value);
  // }

  // function handleDescription(evt) {
  //   setDescription(evt.target.value);
  // }

  // function handleSubmit(evt) {
  //   evt.preventDefault();
  //   // Передаём значения управляемых компонентов во внешний обработчик
  //   onUpdateUser(name, description);
  // }

  function handleSubmit(evt) {
    evt.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser( values );
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} onClose={onClose} isOpen={isOpen} name="edit-button" title="Редактировать профиль" buttonText={loadingData ? 'Сохранение...' : 'Сохранить'}>
      <input value={values.name || ''} onChange={handleChange} id="name-input" className="popup__form-input" type="text" name="name" placeholder="Имя" minLength="2" maxLength="40" required />
      <span className="name-input-error popup__input-error"></span>
      <input value={values.about || ''} onChange={handleChange} id="job-input" className="popup__form-input" type="text" name="about" placeholder="О себе" minLength="2" maxLength="200" required />
      <span className="job-input-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
