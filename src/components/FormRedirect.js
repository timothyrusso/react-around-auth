import React from "react";
import { Link } from 'react-router-dom';

function FormRedirect({ textLink, redirectElement }) {
    return (
        <Link to={`/${redirectElement}`} className="form-redirect">{textLink}</Link>
    )
}

export default FormRedirect;