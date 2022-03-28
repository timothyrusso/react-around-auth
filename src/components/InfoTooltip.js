import React from "react";
import PopupWithForm from "./PopupWithForm";

function InfoTooltip({ isOpen, onClose }) {

    return (
        <PopupWithForm name="info" title="Are you sure?" confirmationTitleClass={"popup__title_type_delete-card"} isOpen={isOpen} onClose={onClose} />
    )
}

export default InfoTooltip;