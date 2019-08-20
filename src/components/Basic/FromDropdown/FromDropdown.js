import React, { useContext } from "react";

import SubHeader from "./../SubHeader/SubHeader";
import "./FromDropdown.css";
import { DownArrowIcon } from "./../../Icons/Icons";
import Context from "./../../../context";

const FromDropdown = () => {
  const { state, dispatch } = useContext(Context);
  const { fromSelected, fromOptions, seassonSelected, seassonOptions } = state;

  const selected = fromSelected && fromSelected.from;

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
      <span className="from-dropdow-container">
        <select
          className="dropbown"
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
