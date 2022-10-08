import React, {useState} from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = ({isOpen, onClose, onAddPlace}) => {

    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({
            name,
            link
        })
    }

    return (
        <PopupWithForm name='add' title='Новое место' buttonText='Создать' isOpen = {isOpen} onClose = {onClose} onSubmit={handleSubmit}>
            <input className="form__input form__input_type_text" name="name" id="name" type="text" onChange={handleNameChange} placeholder="Название" required minLength="2" maxLength="30"/>
            <span className="error name-error"></span>
            <input className="form__input form__input_type_image" name="link" id="link" type="url" onChange={handleLinkChange} placeholder="Ссылка на картинку" required/>
            <span className="error link-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;