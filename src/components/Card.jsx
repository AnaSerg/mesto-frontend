import React from 'react';

const Card = ({card, currentUser, link, likes, name, onCardClick, onCardLike, onCardDelete}) => {

    const isOwn = card.owner._id === currentUser._id; // проверка пользователя, который добавил карточку
    const isLiked = likes.some(i => i._id === currentUser._id); // проверка, поставлен ли лайк текущим пользователем

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <li className="element">
            <img onClick={handleClick} src={link} className="element__image" alt={name}/>
            <button onClick={handleDeleteClick} className={`element__delete-button ${!isOwn ? 'element__delete-button_hidden' : ""}`}  type="button"></button>
            <div className="element__description">
                <h2 className="element__text">{name}</h2>
                <div className="element__like-area">
                    <button onClick={handleLikeClick} className={`element__like ${isLiked ? 'element__like_active' : ""}`} type="button"></button>
                    <p className="element__like-count">{likes.length}</p>
                </div>
            </div>
        </li>
    )
}

export default Card;