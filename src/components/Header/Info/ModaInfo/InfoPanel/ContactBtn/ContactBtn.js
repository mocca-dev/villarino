import React from "react";
import { MailIcon } from "../../../../../Icons/Icons";

const ContactBtn = ({ action }) => {
  return (
    <button className="bottom-btn" onClick={action}>
      <MailIcon /> <span>Contacto</span>
    </button>
  );
};

export default ContactBtn;
