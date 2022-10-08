import React, {useState, useEffect, useRef} from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUser.Context';

const EditAvatarPopup = ({isOpen, onClose, onUpdateAvatar}) => {
    
    const [value, setValue] = useState('');
    const avatarRef = useRef();

    function handleChange(e) {
        setValue(e.target.value);
    }
    
    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value,
            value: value
        });
    }


    return (
        <PopupWithForm name='edit-photo' title='Обновить аватар' buttonText='Сохранить' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} onChange={handleChange}>
            <input className=" form__input form__input_type_profile-photo" ref={avatarRef} id="avatar" name="avatar" type="url" placeholder="Ссылка на фото пользователя" required/>
            <span className="error avatar-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;