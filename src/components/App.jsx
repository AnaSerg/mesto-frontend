import React, {useState, useEffect} from 'react';
import { CurrentUserContext } from '../context/CurrentUser.Context';
import Api from '../utils/api';
import Header from './Header';
import Main from './Main';
import EditProfilePopup from './EditProfilePopup';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Footer from './Footer';

function App() {

    const [currentUser, setCurrentUser] = useState({});
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    useEffect(() => {
        Api.getUserInfo()
        .then((currentUser) => {
            setCurrentUser(currentUser);
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);

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

    return (
        <div className="page">
            <div className="page__container">
                <Header/>
                <CurrentUserContext.Provider value={currentUser}>
                    <Main
                        onEditAvatar = {handleEditAvatarClick}
                        onEditProfile = {handleEditProfileClick}
                        onAddPlace = {handleAddPlaceClick}
                        onCardClick = {handleCardClick}
                    />

                    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

                    <PopupWithForm name='add' title='Новое место' buttonText='Создать' isOpen = {isAddPlacePopupOpen} onClose = {closeAllPopups}>
                        <input name="name" id="name" type="text" className=" form__input form__input_type_text" placeholder="Название" required minLength="2" maxLength="30"/>
                        <span className="error name-error"></span>
                        <input id="link" name="link" type="url" className=" form__input form__input_type_image" placeholder="Ссылка на картинку" required/>
                        <span className="error link-error"></span>
                    </PopupWithForm>

                    <PopupWithForm name='confirm-deletion' title='Вы уверены?'/>

                    <PopupWithForm name='edit-photo' title='Обновить аватар' buttonText='Сохранить' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
                        <input id="avatar" name="avatar" type="url" className=" form__input form__input_type_profile-photo" placeholder="Ссылка на фото пользователя" required/>
                        <span className="error avatar-error"></span>
                    </PopupWithForm>

                    <ImagePopup card = {selectedCard} onClose = {closeAllPopups}/>
                </CurrentUserContext.Provider>
                <Footer/>
            </div>
        </div>
    );
}

export default App;
