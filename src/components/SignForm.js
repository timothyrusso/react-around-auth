import React from "react";

function SignForm() {
    return (
        <form className="sign-form">
            <h2 className="sign-form__title"></h2>
            <input className="sign-form__input" id="email-input" name="email" placeholder="Email"></input>
            <input className="sign-form__input" id="password-input" name="password" placeholder="Password"></input>
            <button className="sign-form__submit"></button>
        </form>
    )
}

export default SignForm;