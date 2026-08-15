import React from "react";
import PropTypes from "prop-types";
import "./SubHeader.css";

const SubHeader = ({ text }) => {
  return <h4>{text}</h4>;
};

SubHeader.propTypes = {
  text: PropTypes.string.isRequired
};

export default SubHeader;
