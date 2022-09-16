import React from 'react';
import { useHistory } from 'react-router-dom';
import * as auth from '../auth.js';

function Login({ title, buttonText, handleLogin }) {
  const history = useHistory();
  const [data, setData] = React.useState({ email: '', password: '' });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setData({ ...data, [name]: value });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!data.email || !data.password) {
      return;
    }
    auth
      .authorize(data.email, data.password)
      .then((obj) => {
        if (obj.token) {
          setData({ email: '', password: '' });
          // console.log(data);
          handleLogin();
          history.push('/');
        }
      })
      .catch((err) => console.log(err)); // запускается, если пользователь не найден
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
    </div>
  );
}

export default Login;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzIyZTBmNTYzOTBhNDAwMTQ2OThiYzEiLCJpYXQiOjE2NjMyMzMzNzl9._vd-z6kPbLRM3weMOpffCpYDH0F53KQPpaOVK66aIsI
