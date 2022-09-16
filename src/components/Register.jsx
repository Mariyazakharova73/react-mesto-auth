import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Form from './Form';
import * as auth from '../auth.js';

function Register({ title, buttonText, handleSucccessPopup, handleFailPopup, closeAllPopups }) {
  const history = useHistory();
  const [data, setData] = React.useState({ email: '', password: '' });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setData({ ...data, [name]: value });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const { email, password } = data;
    auth.register(email, password).then((res) => {
      //Пользователь должен быть переадресован, только если форма регистрации правильно заполнена и отправлена
      if (res) {
        handleSucccessPopup();
        setTimeout(closeAllPopups, 3000);
        history.push('/sign-in');
      } else {
        handleFailPopup();
        setTimeout(closeAllPopups, 3000);
      }
    });
  }

  return (
    <div className="form-wrapper">
      <form className="login__form" onSubmit={handleSubmit}>
        <h2 className="login__form-title">{title}</h2>
        <div className="login__input-wrapper">
          <input
            className="login__form-input"
            type="email"
            placeholder="Email"
            name="email"
            value={data.email || ''}
            onChange={handleChange}
          />
          <input
            className="login__form-input"
            type="password"
            placeholder="Пароль"
            name="password"
            value={data.password || ''}
            onChange={handleChange}
          />
        </div>
        <button className="login__form-button" type="submit">
          {buttonText}
        </button>
      </form>
      <NavLink className="login__form-link" to="/sign-in">
        Уже зарегистрированы? Войти
      </NavLink>
    </div>
  );
}

export default Register;
