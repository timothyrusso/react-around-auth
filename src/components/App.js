import React, { useState } from "react";
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteConfirmPopup from "./DeleteConfirmPopup";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { register, authorize, checkToken } from "../utils/auth";

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(undefined)
  const [selectedDeleteCard, setSelectedDeleteCard] = useState(undefined)
  const [currentUser, setCurrentUser] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [cards, setCards] = useState([])
  const [formValidity, setFormValidity] = useState(true)
  const [errorMessage, setErrorMessage] = useState({})
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");

  const history = useNavigate();

  function handleCardLike(card) {
    // Check one more time if this card was already liked
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    /* Send a request to the API and getting the updated card data:

    1. Tell the server I like the card identified by card._id.
    2. Then we need to reset that state variable that is our cards array.
       First we need to update the cards array with our newly liked card.
       Array.map will allow us to do that. What it does,
       is iterate over each item in an array and perform some function (from a callback)
       in order to update each item in the array.
       We'll iterate over the current value of cards and update the value based on whether
       it was the card that was just liked or not. Only one card will be updated in the array.
    3. The callback for the map does this: if the _id of the array item is the same as this card
       (this card is the card fed in as an argument to the parent function handleLikeCard)
       update that array item with the data of the card object returned just now from the server.
       If it isn't, return the array item, thus keeping the array item unchanged.

       If all this works, only the card that was liked will updated in the array,
       and since the cards state variable changes, the card will re-render with the proper
       liked status.

    */
    api.changeLikeCardStatus({ cardId: card._id, isLiked })
      .then((newCard) => {
        setCards((state) => state.map((item) => item._id === card._id ? newCard : item));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardDelete(card) {
    api.deleteCards({ cardId: card._id })
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setFormValidity(true)
    setErrorMessage({})
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setFormValidity(true)
    setErrorMessage({})
    setIsAddPlacePopupOpen(true)
  }

  function handleConfirmationClick(card) {
    setIsConfirmationPopupOpen(true)
    setSelectedDeleteCard(card)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsConfirmationPopupOpen(false)
    setSelectedCard(undefined)
  }

  function handleUpdateUser(currentUser) {
    api.saveProfileInfo({ name: currentUser.name, about: currentUser.about })
      .then((info) => {
        setCurrentUser(info)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleUpdateAvatar(currentUser) {
    api.saveProfileImage({ avatar: currentUser.avatar })
      .then((info) => {
        setCurrentUser(info)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleAddPlaceSubmit(card) {
    api.saveCards({ name: card.cardName, imageLink: card.link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function startLoading() {
    setIsLoading(true)
  }

  // checkValidity takes an empty object, adds all the current errors with ...errorMessage, and then updates
  // the error message for current input by adding [name]: evt.target.validationMessage to the object.
  // If the input is now valid, this should have the effect of clearing a previous error message by overwriting
  // it with an empty string.

  function checkValidity(evt) {
    const name = evt.target.name;
    setErrorMessage({ ...errorMessage, [name]: evt.target.validationMessage });
  }

  function onFormUpdate(data) {
    data ? setFormValidity(true) : setFormValidity(false)
  }

  const handleTokenCheck = () => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      checkToken(jwt).then((res) => {
        if (res) {
          setLoggedIn(true);
          history("/");
        };
      }
      );
    }
  }

  const handleLogin = () => {
    setLoggedIn(true);
  }

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    history('/signin');
  }

  const handleRegisterSubmit = (password, email) => {
    register(password, email).then((res) => {
      if (res) {
        console.log('res OK');
        history('/signin');
      } else {
        console.log('Something went wrong.');
        setRegisterMessage("Something went wrong, please try again.");
      }
    })
      .catch((err) => console.log(err));
  }

  const handleLoginSubmit = (password, email) => {
    if (!password || !email) {
      setLoginMessage("Something went wrong, please try again.")
      return;
    }
    authorize(password, email)
      .then((data) => {
        if (data.token) {
          handleLogin();
          history('/');
        }
      })
      .catch((err) => {
        console.log(err);
        setLoginMessage("Something went wrong, please try again.")
      });
  }

  React.useEffect(() => {
    api.getProfileInfo()
      .then((info) => {
        setCurrentUser(info)
      })
      .catch((err) => {
        console.log(err);
      })
    api.getCards()
      .then((data) => {
        setCards(data)
      })
      .catch((err) => {
        console.log(err);
      })
    handleTokenCheck();
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="content">
        <Header loggedIn={loggedIn} currentUser={currentUser} handleLogout={handleLogout} />
        <Routes>
          <Route
            exact path="/"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Main onEditAvatarClick={handleEditAvatarClick} onEditProfileClick={handleEditProfileClick} onAddPlaceClick={handleAddPlaceClick} onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleConfirmationClick} />
              </ProtectedRoute>
            }
          />
          <Route path="/signin" element={<Login handleLoginSubmit={handleLoginSubmit} />} />
          <Route path="/signup" element={<Register handleRegisterSubmit={handleRegisterSubmit} />} />
          <Route path="*" element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/signin" replace />} />
        </Routes>
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isLoading} startLoading={startLoading} formValidity={formValidity} onFormUpdate={onFormUpdate} onInputUpdate={checkValidity} errorMessage={errorMessage} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlaceSubmit={handleAddPlaceSubmit} isLoading={isLoading} startLoading={startLoading} formValidity={formValidity} onFormUpdate={onFormUpdate} onInputUpdate={checkValidity} errorMessage={errorMessage} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading} startLoading={startLoading} formValidity={formValidity} onFormUpdate={onFormUpdate} errorMessage={errorMessage} onInputUpdate={checkValidity} />
        <DeleteConfirmPopup isOpen={isConfirmationPopupOpen} onClose={closeAllPopups} card={selectedDeleteCard} deleteCard={handleCardDelete} isLoading={isLoading} startLoading={startLoading} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
