import React from 'react';


function Form({title, buttonText}) {
  return (
    <form className="login__form">
      <h2 className="login__form-title">{title}</h2>
      <div className="login__input-wrapper">
        <input className="login__form-input" type="email" placeholder="Email" />
        <input className="login__form-input" type="password" placeholder="Пароль" />
      </div>
      <button className="login__form-button" type="submit">
        {buttonText}
      </button>
    </form>
  );
}

export default Form;