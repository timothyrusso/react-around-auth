import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";
import Input from "./Input";

function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit, isLoading, startLoading, formValidity, onFormUpdate, errorMessage, onInputUpdate }) {

  const [cardName, setCardName] = useState('')
  const [link, setLink] = useState('')

  function handleNameCardChange(evt) {
    onInputUpdate(evt)
    setCardName(evt.target.value)
  }

  function handleLinkChange(evt) {
    onInputUpdate(evt)
    setLink(evt.target.value)
  }

  function handleSubmit(evt) {
    startLoading()
    evt.preventDefault()
    onAddPlaceSubmit({ cardName, link })
  }

  React.useEffect(() => {
    setCardName('');
    setLink('');
  }, [isOpen]);


  return (
    <PopupWithForm name="add" title="New place" isOpen={isOpen} onClose={onClose} buttonText={"Create"} loadingText={"Saving.."} isLoading={isLoading} onSubmit={handleSubmit} formValidity={formValidity} onFormUpdate={onFormUpdate}>
      <Input type={"text"} idName={"title-input"} name={"title"} fieldName={"field_title"} placeholder={"Title"} minLength={"2"} maxLength={"30"} value={cardName} onChange={handleNameCardChange} errorMessage={errorMessage} />
      <Input type={"url"} idName={"link-input"} name={"link"} fieldName={"field_link"} placeholder={"Image link"} value={link} onChange={handleLinkChange} errorMessage={errorMessage} />
    </PopupWithForm>
  )
}

export default AddPlacePopup;
