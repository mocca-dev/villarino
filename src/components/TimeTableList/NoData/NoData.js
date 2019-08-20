import React from "react";
import { RefreshIcon } from "../../Icons/Icons";

const NoData = ({ timeTable, setForceDispatch }) => (
  <div className="time-container">
    <span className="local-data-msg">{timeTable}</span>
    <div className="refresh-btn">
      <button onClick={setForceDispatch}>
        <RefreshIcon />
      </button>
    </div>
  </div>
);

export default NoData;
