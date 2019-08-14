import React from "react";
import PropTypes from "prop-types";

import SubHeader from "../SubHeader/SubHeader";
import "./FromDropdown.css";
import { DownArrowIcon } from "../Icons/Icons";

const FromDropdown = ({
  options,
  selected,
  dispatch,
  seassonOptions,
  seassonSelected
}) => {
  return (
    <div className="from-dropdown">
      <div className="from-header">
        <SubHeader text="Desde" />
        <span className="seasson-dropbown-container">
          <select
            className="seasson-dropbown"
            value={seassonSelected}
            onChange={e =>
              dispatch({ type: "SET_SEASSON", payload: e.target.value })
            }
          >
            {seassonOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <DownArrowIcon />
        </span>
      </div>
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
  selected: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};
export default FromDropdown;
