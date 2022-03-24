import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../images/logo.svg";

function Header({ loggedIn, currentUser }) {

    const location = useLocation();
    let linkText;

    const pathDefinition = () => {
        switch (location.pathname) {
            case "/login":
                linkText = "Sign up";
                return "/register"
            case "/register":
                linkText = "Log in";
                return "/login"
            case "/":
                linkText = "Log out";
                return "/login"
            default:
                console.log("Invalid path.");
        }
    }

    return (
        <header className="header">
            <img src={logo} alt="Logo representing the Around the US project" className="logo" />
            <div className="header__wrapper">
                <p className="header__email">{loggedIn && currentUser.email}</p>
                <Link to={pathDefinition()} className="header__link">{linkText}</Link>
            </div>
        </header>
    )
}

export default Header;