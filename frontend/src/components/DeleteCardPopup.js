import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function DeleteCardPopup({ isOpen, onClose, onDeleteCard, currentCard, isLoading }) {

    function handleSubmit(e) {
        e.preventDefault();
        onDeleteCard(currentCard);
    }

    return (
        <PopupWithForm
            name="delete"
            title="Вы уверены?" 
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            submitText={`${isLoading ? "Удаление..." : "Да"}`}
    />
        )
}

export default DeleteCardPopup;    