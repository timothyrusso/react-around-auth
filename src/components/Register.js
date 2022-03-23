import React from "react";
import SignForm from "./SignForm";
import FormRedirect from "./FormRedirect";

function Register() {
    return (
        <>
            <SignForm title="Sign up" />
            <FormRedirect textLink="Already a member? Log in here!" redirectElement="login"/>
        </>
    )
}

export default Register;