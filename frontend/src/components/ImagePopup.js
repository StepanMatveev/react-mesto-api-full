import React from 'react';
import { Link } from 'react-router-dom';


function ImagePopup({card, onClose}){
    return(
        <section className={`popup popup__image ${card.isOpen ? "popup_view_open" : ""}`}>            
            <figure className="popup__container popup__image-container">
                <Link to="/"  className="popup__close-button" type="button" aria-label="закрыть" onClick={onClose}></Link>
                <img className="popup__image-picture" src={card.link} alt={card.name}/>
                <figcaption className="popup__image-subtitle">{card.name}</figcaption>
            </figure>
        </section>
    )
}

export default ImagePopup; 