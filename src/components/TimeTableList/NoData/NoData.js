import React from "react";
import { RefreshIcon } from "../../Icons/Icons";

const NoData = ({ timeTable, setForceDispatch }) => (
  <span>
    <span className="local-data-msg">{timeTable}</span>
    <div className="refresh-btn">
      <button onClick={setForceDispatch}>
        <RefreshIcon />
      </button>
    </div>
  </span>
);

export default NoData;
