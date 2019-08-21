import React from "react";
import { RefreshIcon } from "./../../../Icons/Icons";

const NoData = ({ timeTable, setForceDispatch, accessibility }) => (
  <div className="time-container">
    <span className="local-data-msg">{timeTable}</span>
    {!accessibility && (
      <div className="refresh-btn">
        <button onClick={setForceDispatch}>
          <RefreshIcon />
        </button>
      </div>
    )}
  </div>
);

export default NoData;
