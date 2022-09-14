import React from 'react';
import { NavLink } from 'react-router-dom';
import Form from './Form';

function Register({ title, buttonText }) {
  return (
    <div className="form-wrapper">
      <Form title="Регистрация" buttonText="Зарегистрироваться" />
      <NavLink className="login__form-link" to="/sign-in">
        Уже зарегистрированы? Войти
      </NavLink>
    </div>
  );
}

export default Register;
