import React from "react";
import PropTypes from "prop-types";

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

FromDropdown.propTypes = {
  options: PropTypes.array.isRequired,
  selected: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
};
export default FromDropdown;
