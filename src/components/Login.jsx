import React from 'react';
import { useHistory } from 'react-router-dom';
import Form from './Form';
import * as auth from '../auth.js';
import { useFormAndValidation } from '../hooks/useFormAndValidation.js';

function Login({ title, buttonText, handleLogin }) {
  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormAndValidation({});
  const history = useHistory();
  // const [data, setData] = React.useState({ email: '', password: '' });

  // function handleChange(evt) {
  //   const { name, value } = evt.target;
  //   setData({ ...data, [name]: value });
  // }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    auth
      .authorize(values.email, values.password)
      .then((obj) => {
        if (obj.token) {
          setValues({ email: '', password: '' });
          handleLogin();
          history.push('/');
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="form-wrapper">
      <Form
        isValid={isValid}
        handleChange={handleChange}
        title={title}
        buttonText={buttonText}
        handleSubmit={handleSubmit}
        values={values}
        errors={errors}
      />
    </div>
  );
}

export default Login;
