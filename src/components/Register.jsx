import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Form from './Form';
import * as auth from '../auth.js';

function Register({
  title,
  buttonText,
  handleSucccessPopup,
  handleFailPopup,
  closeAllPopups,
  handleLogin,
}) {
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
        handleLogin();
        history.push('/');
      } else {
        handleFailPopup();
        setTimeout(closeAllPopups, 3000);
      }
    });
  }
  return (
    <div className="form-wrapper">
      <Form
        handleChange={handleChange}
        title={title}
        buttonText={buttonText}
        handleSubmit={handleSubmit}
        data={data}
      />
      <NavLink className="login__form-link" to="/sign-in">
        Уже зарегистрированы? Войти
      </NavLink>
    </div>
  );
}

export default Register;
