import React from "react";
import logo from "../images/logo.svg";

function Header() {
    return (
        <header className="header">
            <img src={logo} alt="Logo representing the Around the US project" className="logo" />
            <a className="header__link">test</a>
        </header>
    )
}

export default Header;