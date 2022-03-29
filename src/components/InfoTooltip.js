import React from "react";
import Popup from "./Popup";

function InfoTooltip({ isOpen, onClose, status }) {

    return (
        <Popup isOpen={isOpen} onClose={onClose}>
            <h2 className="popup__title" >{status === "success" ? "ottimo" : "male"}</h2>
        </Popup>
    )
}

export default InfoTooltip;