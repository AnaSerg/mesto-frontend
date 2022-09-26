import React from 'react';

const Card = ({card, onCardClick}) => {

    function handleClick() {
        onCardClick(card);
    }

    return (
        <li className="element">
            <img onClick={handleClick} src={card.link} className="element__image" alt={card.name}/>
            <button className="element__delete-button" type="button"></button>
            <div className="element__description">
                <h2 className="element__text">{card.name}</h2>
                <div className="element__like-area">
                    <button className="element__like" type="button"></button>
                    <p className="element__like-count">{card.likes.length}</p>
                </div>
            </div>
        </li>
    )
}

export default Card;