import React from "react";
import SubHeader from "../SubHeader/SubHeader";
import "./FromDropdown.css";
import { DownArrowIcon } from "../Icons/Icons";

const FromDropdown = ({ options, selected, dispatch }) => {
  return (
    <div className="from-dropdown">
      <SubHeader text="Desde" />
      <select
        className="dropbown"
        value={selected}
        onChange={e => dispatch({ type: "SET_FROM", payload: e.target.value })}
      >
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
