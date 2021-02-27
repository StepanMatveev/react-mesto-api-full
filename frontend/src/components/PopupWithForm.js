import React from 'react';

function PopupWithForm({name, title, isOpen, onClose, children, submitText, onSubmit}) {
    return (
        <section className={`popup popup__${name} ${isOpen ?"popup_view_open" : ""}`}>
        <form className="popup__container popup__form" action="#" name={name} onSubmit={onSubmit}>
            <button className="popup__close-button" type="button" aria-label="закрыть" onClick={onClose}/>
            <h4 className="popup__title">{title}</h4>
            {children}
            <button className={`popup__save-button popup__save-button_${name}`} type="submit">{submitText}</button>    
        </form>
    </section>
    )
} 

export default PopupWithForm;