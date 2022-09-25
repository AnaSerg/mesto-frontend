import React from 'react';

const PopupWithForm = (props) => {

    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ""}`}>
            <div className="popup__container">
                <button onClick={props.onClose} className="button button_type_close" type="button" aria-label="Закрыть попап без сохранения изменений"></button>
                <form action="#" method="POST" className={`form form_type_${props.name}`} noValidate>
                    <h2 className="popup__title">{props.title}</h2>
                    {props.children}
                    <button className="button button_type_submit" type="submit">Сохранить</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;