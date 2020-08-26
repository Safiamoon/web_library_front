import React from "react";

const InputContact = ({nameId}, {label}) => {
    return <>
        <input name={nameId} id={nameId} placeholder={nameId} type="text" required/>
        <label>{label}</label>
    </>;
}
export default InputContact;