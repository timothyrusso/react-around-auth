import React from "react";
import logo from "../images/logo.svg";

function Header({ loggedIn, currentUser }) {
    return (
        <header className="header">
            <img src={logo} alt="Logo representing the Around the US project" className="logo" />
            <a className="header__link">test</a>
            {/* <Link to={`/${redirectElement}`} className="form-redirect">{textLink}</Link> */}
            {loggedIn && <p>currentUser.email</p>}
        </header>
    )
}

export default Header;