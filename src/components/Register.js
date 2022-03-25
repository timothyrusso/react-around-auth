import React, { useState } from "react";
import SignForm from "./SignForm";
import FormRedirect from "./FormRedirect";
import { useNavigate } from 'react-router-dom';

function Register() {

    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState("");

    const history = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prevState) => ({
          ...prevState,
          [name]: value,
        }))
      }

    return (
        <>
            <SignForm title="Sign up" />
            <FormRedirect textLink="Already a member? Log in here!" redirectElement="signin" />
        </>
    )
}

export default Register;