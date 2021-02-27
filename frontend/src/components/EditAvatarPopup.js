
import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
    const linkRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateAvatar({
          avatar: linkRef.current.value,
        });
        linkRef.current.value = '';
    }
    
    return (
        <PopupWithForm
            name="edit-avatar"
            title="Обновить аватар"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            submitText={`${isLoading ? "Сохранение..." : "Сохранить"}`}         
        >
            <label className="popup__field">
                <input 
                    className="popup__input popup__input_avatar-link" 
                    type="url" 
                    placeholder="Ссылка на картинку" 
                    name="link" 
                    id="link" 
                    required
                    ref={linkRef}
                />
                <span className="popup__input-error" id="link-error"></span>
            </label>      
    </PopupWithForm>
    )
}

export default EditAvatarPopup;