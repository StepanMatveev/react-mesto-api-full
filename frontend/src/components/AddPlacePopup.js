import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: name,
            link: link,
        });
    }

    React.useEffect(() => {
        setName('');
        setLink('');
      }, [isOpen]);

    return (
        <PopupWithForm
            name="add-place"
            title="Новое место"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            submitText={`${isLoading ? "Сохранение..." : "Сохранить"}`}        
        >
            <label className="popup__field">
                <input 
                    className="popup__input popup__input_pic-name" 
                    type="text" 
                    placeholder="Название" 
                    name="place"
                    id="place"
                    value={name || ''} 
                    onChange={handleChangeName} 
                    required
                />
            <span className="popup__input-error" id="place-error"></span>
            </label>    
            <label className="popup__field">
                <input 
                    className="popup__input popup__input_link" 
                    type="url" 
                    placeholder="Ссылка на картинку" 
                    name="link" 
                    id="link"
                    value={link || ''}
                    onChange={handleChangeLink} 
                    required
                />
            <span className="popup__input-error" id="link-error"></span>
            </label>        
        </PopupWithForm>
    )
}

export default AddPlacePopup;


