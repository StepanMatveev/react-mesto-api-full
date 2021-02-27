import React from 'react';

function InfoTooltip({ text, icon, isOpen, onClose }) {
    return (
        <div className={`tooltip  ${isOpen ? "tooltip_opened" : ""}`}>
            <div className="tooltip__container">
                <button className="tooltip__close-button" onClick={onClose} type="button" />
                <div className={`tooltip__icon tooltip__icon_type_${icon}`}></div>
                <p className="tooltip__text">{text}</p>
            </div>
        </div>
        
    )
}

export default InfoTooltip;