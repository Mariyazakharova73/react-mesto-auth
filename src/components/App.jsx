import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { api } from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import * as auth from '../utils/auth.js';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import Main from './Main';
import DeleteCardPopup from './DeleteCardPopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import Login from './Login';
import Register from './Register';
import Spinner from './Spinner';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import success from '../images/success.png';
import fail from '../images/fail.png';
import './../index.css';

function App() {
  const history = useHistory();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cardToDelete, setCardToDelete] = React.useState({});
  const [currentUser, setСurrentUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [loadingData, setLoadingData] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = React.useState(false);
  const [isFailPopupOpen, setIsFailPopupOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');

  function signOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setEmail('');
    history.push('/sign-in');
  }

  function handleLogin(email, password) {
    return auth.authorize(email, password).then((data) => {
      // console.log(data)
      if (!data?.token) {
        return Promise.reject('No data');
      }
      localStorage.setItem('jwt', data.token);
      setLoggedIn(true);
    });
  }

  function handleRegister(email, password) {
    return auth.register(email, password).then(() => {
      handleSucccessPopup();
      setTimeout(closeAllPopups, 3000);
      history.push('/sign-in');
    });
  }

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
  }, []);

  React.useEffect(() => {
    function tokenCheck() {
      if (!localStorage.getItem('jwt')) return;
      const jwt = localStorage.getItem('jwt');

      auth.getContent(jwt).then((res) => {
        if (res) {
          setEmail(res.data.email);
          // авторизуем пользователя
          setLoggedIn(true);
          history.push('/');
        }
      });
    }

    tokenCheck();
  }, [loggedIn]);

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
    setLoadingData(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c !== card));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoadingData(false);
      });
  }

  function handleImageClick(cardData) {
    setSelectedCard(cardData); //записываем данные при клике в selectedCard
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

  function handleTrashClick(cardData) {
    setIsDeletePopupOpen(true); //открываем попап
    setCardToDelete(cardData); //записываем данные при клике в cardToDelete
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsSuccessPopupOpen(false);
    setIsFailPopupOpen(false);
    setIsDeletePopupOpen(false);
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

  function handleUpdatePlace(name, link) {
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
          <Header email={email} signOut={signOut} />
          <Switch>
            <ProtectedRoute exact path="/" loggedIn={loggedIn}>
              {loading ? (
                <Spinner />
              ) : (
                <Main
                  cards={cards}
                  onCardLike={handleCardLike}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onImageClick={handleImageClick}
                  onTrashClick={handleTrashClick}
                />
              )}
            </ProtectedRoute>
            <Route path="/sign-up">
              <Register
                title="Регистрация"
                buttonText="Зарегистрироваться"
                handleFailPopup={handleFailPopup}
                closeAllPopups={closeAllPopups}
                onRegister={handleRegister}
              />
            </Route>
            <Route path="/sign-in">
              <Login onLogin={handleLogin} title="Вход" buttonText="Войти" />
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
            onAddPlace={handleUpdatePlace}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            loadingData={loadingData}
          />
          <DeleteCardPopup
            cardToDelete={cardToDelete}
            isOpen={isDeletePopupOpen}
            onClose={closeAllPopups}
            onCardDelete={handleCardDelete}
            loadingData={loadingData}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
