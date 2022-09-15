import { Switch, Route, NavLink } from 'react-router-dom';
import logo from './../images/header-logo.svg';

function Header({ children }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      <div className="header__wrapper-text">
        <Switch>
          <Route exact path="/">
            <p className="header__email">email@mail.com</p>
            <NavLink to="/sign-in" className="header__button">Выйти</NavLink>
          </Route>
          <Route path="/sign-up">
            <NavLink to="/sign-in" className="header__button">
              Войти
            </NavLink>
          </Route>
          <Route path="/sign-in">
            <NavLink to="sign-up" className="header__button">
              Регистрация
            </NavLink>
          </Route>
        </Switch>
      </div>
      {/* <button className="header__menu-button" type="button" /> */}
    </header>
  );
}

export default Header;
