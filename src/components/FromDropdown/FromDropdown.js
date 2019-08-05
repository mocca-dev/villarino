import React from "react";
import SubHeader from "../SubHeader/SubHeader";
import "./FromDropdown.css";
import { DownArrowIcon } from "../Icons/Icons";

const FromDropdown = ({ options }) => {
  return (
    <div className="from-dropdown">
      <SubHeader text="Desde" />
      <select className="dropbown">
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <DownArrowIcon />
    </div>
  );
};

export default FromDropdown;
