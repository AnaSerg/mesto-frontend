import React, {useState, useEffect} from 'react';
import Api from '../utils/api';
import Card from './Card';

const Main = (props) => {

    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [cards, setCards] = useState([]);

    useEffect(() => {
        Api.getUserInfo()
        .then((user) => {
            setUserAvatar(user.avatar);
            setUserName(user.name);
            setUserDescription(user.about);
        })
    }, []);

    React.useEffect(() => {
        Api.getInitialCards()
        .then((data) => {
            setCards(data);
        })
    })

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__info">
                    <div className="profile__avatar-area">
                        <img src={userAvatar} alt="фотография пользователя" className="profile__avatar"/>
                        <button onClick={props.onEditAvatar} className="profile__avatar-button" type="button" aria-label="Изменить аватар пользователя"></button>
                    </div>
                    <div className="profile__text-area">
                        <h1 className="profile__name">{userName}</h1>
                        <button onClick={props.onEditProfile} className="button button_type_edit" type="button" aria-label="Изменить информацию о пользователе"></button>
                        <p className="profile__description">{userDescription}</p>
                    </div>
                </div>
                <button onClick={props.onAddPlace} className="button button_type_add" type="button" aria-label="Добавить новую карточку"></button>
            </section>

            <section className="elements">
                <ul className="elements-list">

                    {cards.map((card) => (
                        <Card key={card._id} card={card} onCardClick={props.onCardClick}/>
                    ))}
                </ul>
            </section>
        </main>
    )
}

export default Main;