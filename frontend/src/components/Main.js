import React, { useContext } from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';


function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, handleCardLike, handleCardDelete}) {
    const userData = useContext(CurrentUserContext);

    return(
        <main className="content">
        <section className="profile">
            <div className="profile__avatar_container">
                <img className="profile__avatar" alt="Аватарка" src={userData.avatar}/>
                <button className="profile__avatar-overlay" onClick={onEditAvatar}/>
            </div>
            <div className="profile__info">
                <div className="profile__top">
                    <h1 className="profile__title">{userData.name}</h1>
                    <button className="profile__edit-button" type="button" aria-label="редактировать" onClick={onEditProfile}/>
                </div>
            <p className="profile__subtitle">{userData.about}</p>
            </div>
            <button className="profile__add-button" type="button" aria-label="добавить" onClick={onAddPlace}/>  
        </section>
        <section className="elements">
            <ul className="elements__list">
                {cards.map((card) => (
                    <Card
                        key={card._id}
                        card={card}
                        onCardClick={onCardClick}
                        onLikeClick={handleCardLike}
                        onCardDelete={handleCardDelete}/>
                    )
                )}
            </ul>
        </section>
    </main>
    )
}

export default Main;