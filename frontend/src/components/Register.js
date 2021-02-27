import React from 'react';
import { Link } from 'react-router-dom';

function Register ({ onRegister }) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleSubmit(e) {
        e.preventDefault();
        onRegister({ email, password });
    }

    return (
        <div className="auth">
            <h1 className="auth__title">Регистрация</h1>
            <form className="auth__form" action="#" noValidate name="login" onSubmit={handleSubmit}>
            <input 
                className="auth__input"
                type="email" 
                id="regEmail"
                value={email}
                onChange={(evt) => setEmail(evt.target.value)}
                name="regEmail" 
                placeholder="Email" 
                minLength="2" 
                maxLength="50" 
                required 
            />
            <input 
                className="auth__input"
                type="password" 
                id="regPass"
                value={password}
                onChange={(evt) => setPassword(evt.target.value)}
                name="regPass"
                placeholder="Пароль" 
                minLength="2" 
                maxLength="50" 
                required 
            />
            <button className="auth__submit" type="submit" onSubmit={handleSubmit}>Зарегистрироваться</button>
            <p className="auth__question">Уже зарегистрированы?<Link className="auth__link" to="sign-in">Войти</Link></p>
            </form>
        </div>
    )

}

export default Register;