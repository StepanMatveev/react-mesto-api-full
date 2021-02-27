import React, { useContext } from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = useContext(CurrentUserContext);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: name,
            about: description,
        });
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    return (
        <PopupWithForm
            name="profile"
            title="Редактировать профиль"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            submitText={`${isLoading ? "Сохранение..." : "Сохранить"}`}
        >
            <label className="popup__field">
                <input 
                    className="popup__input popup__input_name" 
                    type="text" 
                    placeholder="Имя Фамилия" 
                    name="name" 
                    id="name" 
                    required 
                    minLength="2" 
                    maxLength="40"
                    onChange={handleChangeName}
                    value={name || ''}
                />
                <span className="popup__input-error" id="name-error"></span>
            </label>    
            <label className="popup__field">    
                <input 
                    className="popup__input popup__input_occupation" 
                    type="text" 
                    placeholder="Род деятельности" 
                    name="occupation" 
                    id="occupation" 
                    required 
                    minLength="2" 
                    maxLength="200"
                    value={description || ''}
                    onChange={handleChangeDescription}
                />
                <span className="popup__input-error" id="occupation-error"></span>
            </label>  
    </PopupWithForm>
    )
}

export default EditProfilePopup;