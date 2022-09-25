import React from 'react';

const ImagePopup = (props) => {

    return (
        <div className={`popup popup_type_big-image ${props.card ? 'popup_opened' : ""} `}>
            <div className="popup__container">
                <button onClick={props.onClose} className="button button_type_close" type="button" aria-label="Закрыть попап без сохранения изменений"></button>
                <figure className="popup__image-area">
                    <img src={props.card?.link} className="popup__image" alt="увеличенное изображение с карточки"/>
                    <figcaption className="popup__image-description">{props.card?.name}</figcaption>
                </figure>
            </div>
        </div>
    )
}

export default ImagePopup;