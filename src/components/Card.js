import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = isOwn ? 'card__delete' : 'card__delete_hidden';
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = (
        `card__like ${isLiked ? 'card__like_active' : ''}`
    );

    function handleClick() {
        onCardClick(card)
    }

    function handleLikeClick() {
        onCardLike(card)
    }

    function handleDeleteClick() {
        onCardDelete(card)
    }

    return (
        <li className="card">
            <button aria-label="Delete" type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
            <div className="card__image" style={{ backgroundImage: `url(${card.link})` }} onClick={handleClick}></div>
            <div className="card__content">
                <h2 className="card__title">{card.name}</h2>
                <div className="card__like-wrapper">
                    <button aria-label="Like" type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <p className="card__like-counter">{card.likes.length}</p>
                </div>
            </div>
        </li>
    )
}

export default Card;