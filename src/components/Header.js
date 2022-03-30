import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../images/logo.svg";

function Header({ loggedIn, handleLogout, userEmail }) {

    const [toggleMenu, setToggleMenu] = useState(false);

    const location = useLocation();

    let linkText;

    const toggleNav = () => {
        setToggleMenu(!toggleMenu)
    }

    const pathDefinition = () => {
        switch (location.pathname) {
            case "/signin":
                linkText = "Sign up";
                return "/signup"
            case "/signup":
                linkText = "Log in";
                return "/signin"
            case "/":
                linkText = "Log out";
                return "/signin"
            default:
                return "/"
        }
    }

    console.log(toggleMenu);

    return (
        <header className="header">
            {toggleMenu &&
                <div className="mobile-navbar"><p className="header__email">{loggedIn && userEmail}</p>
                    <Link to={pathDefinition()} className={`header__link ${loggedIn ? "header__link_type_logout" : ""}`} onClick={loggedIn && handleLogout}>{linkText}</Link>
                </div>}
            <img src={logo} alt="Logo representing the Around the US project" className="logo" />
            <div className="header__wrapper">
                <p className="header__email">{loggedIn && userEmail}</p>
                <Link to={pathDefinition()} className={`header__link ${loggedIn ? "header__link_type_logout" : ""}`} onClick={loggedIn && handleLogout}>{linkText}</Link>
            </div>
            <button aria-label="burger" type="button" className={`burger-button ${toggleMenu ? "burger-button_type_open" : ""}`} onClick={toggleNav}></button>
        </header>
    )
}

export default Header;