import React from 'react'
import Form from './Form';

function Login({ title, buttonText }) {
  return (
    <div className="form-wrapper">
      <Form title="Вход" buttonText="Войти" />
    </div>
  )
}

export default Login;