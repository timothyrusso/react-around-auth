import React from "react";
import Popup from "./Popup";

function InfoTooltip({ successOpen, failedOpen, onClose }) {

    return (
        <Popup isOpen={successOpen ? successOpen : failedOpen} onClose={onClose}>
            <h2 className="popup__title" >{successOpen ? "Success! You have now been registered." : "Oops, something went wrong! Please try again."}</h2>
        </Popup>
    )
}

export default InfoTooltip;