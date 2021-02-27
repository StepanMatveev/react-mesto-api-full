import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from '../components/Header.js';
import Main from '../components/Main.js';
import Footer from '../components/Footer.js';
import ImagePopup from '../components/ImagePopup.js';
import EditProfilePopup from '../components/EditProfilePopup.js';
import EditAvatarPopup from '../components/EditAvatarPopup.js';
import AddPlacePopup from '../components/AddPlacePopup.js';
import DeleteCardPopup from '../components/DeleteCardPopup.js';
import Login from '../components/Login.js';
import Register from '../components/Register.js';
import ProtectedRoute from '../components/ProtectedRoute.js';
import InfoTooltip from '../components/InfoTooltip.js';
import * as auth from '../auth.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState({});
    const [currentCard, setCurrentCard] = React.useState({});
    const [selectedCard, setSelectedCard] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [userEmail, setUserEmail] = React.useState('');
    const [infoTooltip, setInfoTooltip] = React.useState({ text: '', icon: '', isOpen: false });

    const history = useHistory();

    function handleRegister ({ email, password }) {
        auth.register({ email, password })
          .then((res) => {
            if (res) {
                setInfoTooltip({ text: 'Вы успешно зарегистрировались!', icon: 'success', isOpen: true });
                history.push('/sign-in');
            } 
          })
          .catch((err) => {
            if (err.status === 400) {
                setInfoTooltip({ text: 'Некорректно заполнено одно из полей!', icon: 'error', isOpen: true }); 
            } else {
                setInfoTooltip({ text: 'Что-то пошло не так! Попробуйте еще раз.', icon: 'error', isOpen: true });
            }
          });
    }

    function handleLogin ({ email, password }) {
        auth.login({ email, password })
          .then((data) => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                tokenCheck();
                setLoggedIn(true);
            }
          })
          .catch((err) => {
            if (err.status === 400) {
                setInfoTooltip({ text: 'Не передано одно из полей!', icon: 'error', isOpen: true }); 
            } else if (err.status === 401) {
                setInfoTooltip({ text: 'Пользователь с таким email не найден!', icon: 'error', isOpen: true }); 
            } else {
                setInfoTooltip({ text: 'Что-то пошло не так! Попробуйте еще раз.', icon: 'error', isOpen: true });
            }
          });
    }

    function tokenCheck () {
        if (localStorage.token) {
          auth.getEmail({ token: localStorage.token})
            .then((res) => {
              if (res.data) {
                setLoggedIn(true);
                setUserEmail(res.data.email);
                history.push('/');
              } else {
                localStorage.removeItem('token');
                setLoggedIn(false);
                setUserEmail('');
              }
            })
            .catch((err) => {
                console.error(err);
            });
        }
    }

    React.useEffect(() => {
        tokenCheck();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleLogout () {
        localStorage.removeItem('token');
        setLoggedIn(false);
        setUserEmail('');
        history.push('sign-in');
    }

    React.useEffect(() => {
        if (loggedIn) {
          Promise.all([auth.getEmail({ token: localStorage.token }), auth.getInitialCards({ token: localStorage.token })])
            .then(([{ data: user }, { data: card }]) => {
              setCurrentUser(user)
              setCards(card.reverse())
            })
            .catch((error) => {
                console.error(error)
            })
        }
      }, [loggedIn])

    function handleCardClick(name, link) {
        setSelectedCard({
            isOpen: true, 
            name: name, 
            link: link
        });
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleDeleteCardClick(card) {
        setIsDeleteCardPopupOpen(true);
        setCurrentCard(card);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsDeleteCardPopupOpen(false);
        setSelectedCard((selectedCard)=> {
            return {...selectedCard, isOpen: false}
        });
        setInfoTooltip({ ...infoTooltip, isOpen: false });
    }

    React.useEffect(() => {
        function handleEscClose(e) {
          if (e.key === "Escape") {
            closeAllPopups();
            if (loggedIn) {
                history.push('/');
            }
          }
        }
    
        function closeByOverlay(e) {
          if (e.target.classList.contains('popup_view_open')) {
            closeAllPopups();
            if (loggedIn) {
                history.push('/');
            }
          }
        }
    
        document.addEventListener('keyup', handleEscClose);
        document.addEventListener('click', closeByOverlay);

        return () => {
          document.removeEventListener('keyup', handleEscClose);
          document.removeEventListener('click', closeByOverlay);
        }
    })

    function handleCardLike(card) { 
        const isLiked = card.likes.some(el => el === currentUser._id)

        function handleResponseCardLike ({ data: newCard }) {
          const newCards = cards.map(el => el._id === card._id ? newCard : el)
          setCards(newCards)
        }
        
        if (!isLiked) {
            auth.putLike({cardId: card._id, token: localStorage.token})
            .then(handleResponseCardLike)
            .catch((error) => {
                console.error(error)
            })
        } else {
            auth.removeLike({cardId: card._id, token: localStorage.token})
            .then(handleResponseCardLike)
            .catch((error) => {
                console.error(error)
            })
        }
    }

    function handleCardDelete(card) {
        setIsLoading(true);
        auth.deleteCard({ token: localStorage.token, cardId: card._id })
        .then(() => {
          const newCards = cards.filter(el => el._id !== card._id)
          setCards(newCards)
            closeAllPopups();
        })
        .catch((error) => {
            console.error(error)
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    function handleUpdateUser({name, about}) {
        setIsLoading(true);
        auth.editUserInfo({ token: localStorage.token, name, about })
        .then(() => {
            setCurrentUser({ ...currentUser, name, about })
            closeAllPopups();
        })
        .catch((error) => {
            console.error(error)
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    function handleUpdateAvatar({avatar}) {
        setIsLoading(true);
        auth.changeAvatar({avatar, token: localStorage.token})
        .then(() => {
            setCurrentUser({...currentUser, avatar});
            closeAllPopups();
        })
        .catch((error) => {
            console.error(error)
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    function handleAddPlaceSubmit({name, link}) {
        setIsLoading(true);
        auth.addCard({ token: localStorage.token, name, link })
        .then(({ data: newCard }) => {
            setCards([newCard, ...cards]);
            closeAllPopups();
        })
        .catch((error) => {
            console.error(error)
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header 
                    onLogout={handleLogout}
                    userEmail={userEmail} 
                    loggedIn={loggedIn}
                />
                <Switch>
                    <Route path="/sign-up" exact>
                        <Register onRegister={handleRegister} />
                    </Route>
                    <Route path="/sign-in" exact>
                        <Login onLogin={handleLogin} />
                    </Route>

                    <ProtectedRoute 
                        component={Main}
                        path="/"
                        loggedIn={loggedIn}
                        onEditAvatar={handleEditAvatarClick} 
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onCardClick={handleCardClick}
                        cards={cards}
                        handleCardLike={handleCardLike}
                        handleCardDelete={handleDeleteCardClick}
                    />

                </Switch>
                <Footer />
                <EditAvatarPopup 
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
                isLoading={isLoading}
                />
                <EditProfilePopup 
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
                isLoading={isLoading}
                />
                <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}
                isLoading={isLoading}
                />
                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />
                <DeleteCardPopup
                isOpen={isDeleteCardPopupOpen}
                onClose={closeAllPopups}
                onDeleteCard={handleCardDelete}
                currentCard={currentCard}
                isLoading={isLoading}
                />
                <InfoTooltip
                text={infoTooltip.text}
                icon={infoTooltip.icon}
                isOpen={infoTooltip.isOpen}
                onClose={closeAllPopups}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;