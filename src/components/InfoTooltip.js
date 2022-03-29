import React from "react";
import Popup from "./Popup";
import successImage from "../images/success.svg"
import failedImage from "../images/failed.svg"

function InfoTooltip({ isOpen, onClose, status }) {

    return (
        <Popup isOpen={isOpen} onClose={onClose}>
            <h2 className="popup__title" >{
                status === "success" ?
                    <div>
                        <img src={successImage} alt="Success icon"></img>
                        <p>Success! You have now been registered.</p>
                    </div>
                    :
                    <div>
                        <img src={failedImage} alt="Failed icon"></img>
                        <p>Oops, something went wrong! Please try again.</p>
                    </div>
            }</h2>
        </Popup>
    )
}

export default InfoTooltip;