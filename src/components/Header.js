import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../images/logo.svg";

function Header({ loggedIn, currentUser, handleLogout }) {

    const location = useLocation();
    let linkText;

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

    console.log(loggedIn);

    return (
        <header className="header">
            <img src={logo} alt="Logo representing the Around the US project" className="logo" />
            <div className="header__wrapper">
                <p className="header__email">{loggedIn && currentUser.email}</p>
                <Link to={pathDefinition()} className="header__link" onClick={loggedIn && handleLogout}>{linkText}</Link>
            </div>
        </header>
    )
}

export default Header;