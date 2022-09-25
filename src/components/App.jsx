import React, {useState} from 'react';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Footer from './Footer';

function App() {

    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

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

    return (
        <div className="App">
            <div className="page">
                <div className="page__container">
                    <Header/>
                    <Main
                        onEditAvatar = {handleEditAvatarClick}
                        onEditProfile = {handleEditProfileClick}
                        onAddPlace = {handleAddPlaceClick}
                        onCardClick = {handleCardClick}
                    />
                    <PopupWithForm name='edit' title='Редактировать профиль' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
                        <input name="name" id="nameUser" type="text" className=" form__input form__input_type_name" placeholder="Имя" required minLength="2" maxLength="40"/>
                        <span className="nameUser-error error"></span>
                        <input id="about" name="about" type="text" className=" form__input form__input_type_job" placeholder="О себе" required minLength="2" maxLength="200"/>
                        <span className="about-error error"></span>
                    </PopupWithForm>

                    <PopupWithForm name='add' title='Новое место' isOpen = {isAddPlacePopupOpen} onClose = {closeAllPopups}>
                        <input name="name" id="name" type="text" className=" form__input form__input_type_text" placeholder="Название" required minLength="2" maxLength="30"/>
                        <span className="error name-error"></span>
                        <input id="link" name="link" type="url" className=" form__input form__input_type_image" placeholder="Ссылка на картинку" required/>
                        <span className="error link-error"></span>
                    </PopupWithForm>

                    <PopupWithForm name='confirm-deletion' title='Вы уверены?'/>

                    <PopupWithForm name='edit-photo' title='Обновить аватар' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
                        <input id="avatar" name="avatar" type="url" className=" form__input form__input_type_profile-photo" placeholder="Ссылка на фото пользователя" required/>
                        <span className="error avatar-error"></span>
                    </PopupWithForm>

                    <ImagePopup card = {selectedCard} onClose = {closeAllPopups}/>
                    <Footer/>
                </div>
            </div>
        </div>
    );
}

export default App;
