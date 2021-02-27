import React from 'react';
import logo from '../images/logo_pic.svg';
import { useLocation, useHistory } from 'react-router-dom'

function Header({ onLogout, userEmail, loggedIn }) {

    const { pathname } = useLocation();
    const history = useHistory();

    const navButtons = [
        { from: '/sign-up', to: '/sign-in', text: 'Войти' },
        { from: '/sign-in', to: '/sign-up', text: 'Регистрация' }
    ]

    function getNavButton (buttons, pathname) {
        const button = buttons.find((btn) => btn.from === pathname)
        if (!button) return null
        return (
            <div className="header__auth">
                <button className="header__auth-nav" type="button" onClick={() => history.push(button.to)}>{button.text}</button>
            </div>
        )
    }

    function getAuthMenu () {
          return (
            <div className="header__auth">
              <p className="header__auth-email">{userEmail}</p>
              <button className="header__auth-nav" type="button" onClick={onLogout}>Выход</button>
            </div>
          )
    }

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип" />
            {loggedIn
                ? getAuthMenu()
                : getNavButton(navButtons, pathname)
            }       
        </header>
    );
  }


export default Header;