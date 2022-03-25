import React from "react";
import SignForm from "./SignForm";
import FormRedirect from "./FormRedirect";

function Login() {
    return (
        <>
            <SignForm title="Log in" />
            <FormRedirect textLink="Not a member yet? Sign up here!" redirectElement="signup" />
        </>
    )
}

export default Login;