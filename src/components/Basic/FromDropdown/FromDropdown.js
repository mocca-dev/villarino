import React, { useContext } from "react";

import SubHeader from "./../SubHeader/SubHeader";
import "./FromDropdown.css";
import { DownArrowIcon } from "./../../Icons/Icons";
import Context from "./../../../context";

const FromDropdown = () => {
  const { state, dispatch } = useContext(Context);
  const {
    fromToSelected,
    fromOptions,
    seassonSelected,
    seassonOptions
  } = state;

  const selected = fromToSelected && fromToSelected.from;

  return (
    <div className="from-dropdown">
      <div className="from-header">
        <SubHeader text="Desde" />
        <span className="seasson-dropdown-container">
          <select
            className="seasson-dropdown"
            aria-label="seasson-dropdown"
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
      <span className="from-dropdow-container">
        <select
          className="dropdown"
          aria-label="from-dropdown"
          value={selected}
          onChange={e =>
            dispatch({ type: "SET_FROM", payload: e.target.value })
          }
        >
          {fromOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <DownArrowIcon />
      </span>
    </div>
  );
};

export default FromDropdown;
