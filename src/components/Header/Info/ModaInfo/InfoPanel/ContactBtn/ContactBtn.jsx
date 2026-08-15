import React from "react";
import { MailIcon } from "../../../../../Icons/Icons";
import PropTypes from "prop-types";

const ContactBtn = ({ action }) => {
  return (
    <button className="bottom-btn" onClick={action}>
      <MailIcon /> <span>Contacto</span>
    </button>
  );
};

ContactBtn.propTypes = {
  action: PropTypes.func.isRequired
};

export default ContactBtn;
