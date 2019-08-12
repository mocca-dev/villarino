import React from "react";
import PropTypes from "prop-types";

import SubHeader from "../SubHeader/SubHeader";
import "./ToDropdown.css";

const ToDropdown = ({ selected, dispatch }) => {
  return (
    <div className="to-radio">
      <SubHeader text="Hacia" />
      <div className="radio-container">
        <span className="to-container">
          <input
            type="radio"
            id="left"
            name="to"
            checked={!selected}
            value={!selected}
            onChange={e => dispatch({ type: "SET_TO", payload: false })}
          />
          <label htmlFor="left">Punta Alta</label>
        </span>
        <span className="to-container">
          <input
            type="radio"
            id="right"
            name="to"
            checked={selected}
            value={selected}
            onChange={e => dispatch({ type: "SET_TO", payload: true })}
          />
          <label htmlFor="right">Bahia Blanca</label>
        </span>
      </div>
    </div>
  );
};

ToDropdown.propTypes = {
  selected: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default ToDropdown;
