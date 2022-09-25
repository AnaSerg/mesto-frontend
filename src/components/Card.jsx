import React from 'react';

const Card = (props) => {

    function handleClick() {
        props.onCardClick(props.card);
    }

    return (
        <li className="element">
            <img onClick={handleClick} src={props.card.link} className="element__image" alt={props.card.name}/>
            <button className="element__delete-button" type="button"></button>
            <div className="element__description">
                <h2 className="element__text">{props.card.name}</h2>
                <div className="element__like-area">
                    <button className="element__like" type="button"></button>
                    <p className="element__like-count">{props.card.likes.length}</p>
                </div>
            </div>
        </li>
    )
}

export default Card;