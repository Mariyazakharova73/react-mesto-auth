import React from 'react';
import './../index.css';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import Login from './Login';
import Register from './Register';
import AddPlacePopup from './AddPlacePopup';
import { api } from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Spinner from './Spinner';
import { Switch, Route, NavLink, withRouter } from 'react-router-dom';
import InfoTooltip from './InfoTooltip';
import success from '../images/success.png';
import fail from '../images/fail.png';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../auth.js';

function App({ history }) {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setСurrentUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [loadingData, setLoadingData] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = React.useState(false);
  const [isFailPopupOpen, setIsFailPopupOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');

  function handleLogin() {
    setLoggedIn(true);
  }

  function tokenCheck() {
    // если у пользователя есть токен в localStorage,
    // эта функция проверит валидность токена
    const jwt = localStorage.getItem('jwt');
    // console.log(jwt);
    if (jwt) {
      // проверим токен
      auth.getContent(jwt).then((res) => {
        if (res) {
          setEmail(res.data.email);
          // авторизуем пользователя
          setLoggedIn(true);
          history.push('/');
        }
      });
    }
  }

  // React.useEffect(() => {
  //   tokenCheck();
  // }, []);

  React.useEffect(() => {
    setLoading(true);
    Promise.all([api.getProfile(), api.getInitialCards()])
      .then(([user, cards]) => {
        setСurrentUser(user);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
    tokenCheck();
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (isLiked) {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .addLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c !== card));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardClick(cardData) {
    setSelectedCard(cardData);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsSuccessPopupOpen(false);
    setIsFailPopupOpen(false);
    setSelectedCard({});
  }

  function handleUpdateUser(name, about) {
    setLoadingData(true);
    api
      .sendProfile(name, about)
      .then((res) => {
        setСurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoadingData(false);
      });
  }

  // function handleUpdateUser(x) {
  //   setLoadingData(true);
  //   api
  //     .sendProfile(x)
  //     .then((res) => {
  //       setСurrentUser(res);
  //       closeAllPopups();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => {
  //       setLoadingData(false);
  //     });
  // }

  function handleUpdateAvatar(link) {
    setLoadingData(true);
    api
      .sendAvatar(link)
      .then((res) => {
        setСurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoadingData(false);
      });
  }

  function handleUpdatePlase(name, link) {
    setLoadingData(true);
    api
      .sendNewCard(name, link)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoadingData(false);
      });
  }

  function handleSucccessPopup() {
    setIsSuccessPopupOpen(true);
  }

  function handleFailPopup() {
    setIsFailPopupOpen(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header email={email} />
          <Switch>
            <ProtectedRoute exact path="/" loggedIn={loggedIn}>
              {loading ? (
                <Spinner />
              ) : (
                <Main
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCard={handleCardClick}
                />
              )}
            </ProtectedRoute>
            <Route path="/sign-up">
              <Register
                title="Регистрация"
                buttonText="Зарегистрироваться"
                handleSucccessPopup={handleSucccessPopup}
                handleFailPopup={handleFailPopup}
                closeAllPopups={closeAllPopups}
              />
            </Route>
            <Route path="/sign-in">
              <Login handleLogin={handleLogin} title="Вход" buttonText="Войти" />
            </Route>
          </Switch>
          <Footer />
          <InfoTooltip
            popupText="Вы успешно зарегистрировались!"
            altText="Успешня регистрация"
            link={success}
            isOpen={isSuccessPopupOpen}
            onClose={closeAllPopups}
          />
          <InfoTooltip
            popupText="Что-то пошло не так! Попробуйте ещё раз."
            altText="Неудачная регистрация"
            link={fail}
            isOpen={isFailPopupOpen}
            onClose={closeAllPopups}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <EditProfilePopup
            onUpdateUser={handleUpdateUser}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            loadingData={loadingData}
          />
          <EditAvatarPopup
            onUpdateAvatar={handleUpdateAvatar}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            loadingData={loadingData}
          />
          <AddPlacePopup
            onAddPlace={handleUpdatePlase}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            loadingData={loadingData}
          />
          <PopupWithForm
            isOpen=""
            name="delete-button"
            title="Вы уверены?"
            buttonText="Да"
          ></PopupWithForm>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
