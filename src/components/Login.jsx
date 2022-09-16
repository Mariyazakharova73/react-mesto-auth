import React from 'react';
import { useHistory } from 'react-router-dom';
import Form from './Form';
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
          handleLogin();
          history.push('/');
        }
      })
      .catch((err) => console.log(err));
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
    </div>
  );
}

export default Login;
