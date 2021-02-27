import React from 'react';

function Login ({ onLogin }) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleSubmit(e) {
        e.preventDefault();
        onLogin({ email, password });
    }

    return (
        <div className="auth">
            <h1 className="auth__title">Вход</h1>
            <form className="auth__form" action="#" noValidate name="login" onSubmit={handleSubmit}>
            <input 
                className="auth__input"
                type="email" 
                id="loginEmail"
                value={email}
                onChange={(evt) => setEmail(evt.target.value)}
                name="loginEmail" 
                placeholder="Email" 
                minLength="2" 
                maxLength="50" 
                required 
            />
            <input 
                className="auth__input"
                type="password" 
                id="loginPass"
                value={password}
                onChange={(evt) => setPassword(evt.target.value)}
                name="loginPass" 
                placeholder="Пароль" 
                minLength="2" 
                maxLength="50" 
                required 
            />
            <button className="auth__submit" type="submit" onSubmit={handleSubmit}>Войти</button>
            </form>
        </div>
    )

}

export default Login;