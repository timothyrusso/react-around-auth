import React, { useState } from "react";
import SignForm from "./SignForm";
import FormRedirect from "./FormRedirect";

function Login() {

    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setInputs((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    return (
        <>
            <SignForm title="Log in" />
            <FormRedirect textLink="Not a member yet? Sign up here!" redirectElement="signup" />
        </>
    )
}

export default Login;