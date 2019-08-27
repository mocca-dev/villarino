import React from "react";
import PropTypes from "prop-types";

import { MailIcon } from "../../../../../Icons/Icons";

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
