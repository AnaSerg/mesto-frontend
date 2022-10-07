import React, {useEffect, useState} from 'react';
import { CurrentUserContext } from '../context/CurrentUser.Context';
import Api from '../utils/api';
import Card from './Card';

const Main = ({onEditProfile, onEditAvatar, onAddPlace, onCardClick}) => {

    const currentUser = React.useContext(CurrentUserContext);
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

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__info">
                    <div className="profile__avatar-area">
                        {currentUser.avatar && (<img src={currentUser.avatar} alt="фотография пользователя" className="profile__avatar" />)}
                        <button onClick={onEditAvatar} className="profile__avatar-button" type="button" aria-label="Изменить аватар пользователя"></button>
                    </div>
                    <div className="profile__text-area">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button onClick={onEditProfile} className="button button_type_edit" type="button" aria-label="Изменить информацию о пользователе"></button>
                        <p className="profile__description">{currentUser.about}</p>
                    </div>
                </div>
                <button onClick={onAddPlace} className="button button_type_add" type="button" aria-label="Добавить новую карточку"></button>
            </section>

            <section className="elements">
                <ul className="elements-list">

                    {cards.map((card) => (
                        <Card key={card._id} currentUser={currentUser} likes={card.likes} link={card.link} name={card.name} card={card} onCardClick={onCardClick} onCardLike={handleLikeCard} onCardDelete={handleCardDelete}/>
                    ))}
                </ul>
            </section>
        </main>
    )
}

export default Main;