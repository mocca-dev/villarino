import React from "react";
import SubHeader from "../SubHeader/SubHeader";
import "./ToDropdown.css";

const ToDropdown = () => {
  return (
    <div className="to-radio">
      <SubHeader text="Hasta" />
      <div className="radio-container">
        <span className="to-container">
          <input type="radio" id="left" name="to" />
          <label htmlFor="left">Punta Alta</label>
        </span>
        <span className="to-container">
          <input type="radio" id="right" name="to" />
          <label htmlFor="right">Bahia Blanca</label>
        </span>
      </div>
    </div>
  );
};

export default ToDropdown;
