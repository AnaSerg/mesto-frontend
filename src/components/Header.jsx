import React from 'react';
import Logo from '../images/logo.svg'

const Header = () => {

    return (
        <header className="header">
            <img src={Logo} alt="логотип" className="header__logo"/>
        </header>
    )
}

export default Header;