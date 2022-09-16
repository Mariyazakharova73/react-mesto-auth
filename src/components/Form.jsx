import React from 'react';

function Form({ title, buttonText, handleSubmit, data, handleChange }) {
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

export default Form;
