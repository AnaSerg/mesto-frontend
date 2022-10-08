import React, {useState, useEffect} from 'react';
import { CurrentUserContext } from '../contexts/CurrentUser.Context';
import Api from '../utils/api';
import Header from './Header';
import Main from './Main';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Footer from './Footer';

function App() {

    const [currentUser, setCurrentUser] = useState({});

    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    const [cards, setCards] = useState([]);

    useEffect(() => {
        Api.getInitialCards()
        .then((cards) => {
            setCards(cards);
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);

    useEffect(() => {
        Api.getUserInfo()
        .then((currentUser) => {
            setCurrentUser(currentUser);
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);

    const handleLikeCard = (card) => {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        Api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        });
    }

    const handleCardDelete = (card) => {
        Api.deleteCard(card._id)
        .then(() => {
            const newCards = cards.filter((newCard) => {
                return !(newCard._id === card._id);
            });
            setCards(newCards);
        })
        .catch((err) => {
            console.log(err);
        })

    }

    const handleEditAvatarClick = () => {
        setEditAvatarPopupOpen(true);
    }

    const handleEditProfileClick = () => {
        setEditProfilePopupOpen(true);
    }

    const handleAddPlaceClick = () => {
        setAddPlacePopupOpen(true);
    }

    const handleCardClick = (card) => {
        setSelectedCard(card);
    }

    const closeAllPopups = () => {
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setEditAvatarPopupOpen(false);
        setSelectedCard(null);
    }

    const handleUpdateUser = (data) => {
        Api.sendUserInfo(data)
        .then((user) => {
            setCurrentUser(user);
            closeAllPopups();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const handleUpdateAvatar = (data) => {
        Api.sendAvatarInfo(data)
        .then((user) => {
            setCurrentUser(user);
            closeAllPopups();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const handleAddPlaceSubmit = (data) => {
        Api.sendNewCard(data)
        .then((newCard) => {
        setCards([newCard, ...cards]); 
        closeAllPopups();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="page">
            <div className="page__container">
                <Header/>
                <CurrentUserContext.Provider value={currentUser}>
                    <Main
                        cards={cards}
                        onEditAvatar = {handleEditAvatarClick}
                        onEditProfile = {handleEditProfileClick}
                        onAddPlace = {handleAddPlaceClick}
                        onCardClick = {handleCardClick}
                        onCardLike={handleLikeCard}
                        onCardDelete={handleCardDelete}
                    />

                    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>

                    <PopupWithForm name='confirm-deletion' title='Вы уверены?'/>

                    <ImagePopup card = {selectedCard} onClose = {closeAllPopups}/>
                </CurrentUserContext.Provider>
                <Footer/>
            </div>
        </div>
    );
}

export default App;
