import React from "react";
import PropTypes from "prop-types";

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

NoData.propTypes = {
  timetable: PropTypes.string.isRequired,
  setForceDispatch: PropTypes.func.isRequired,
  accessibility: PropTypes.bool.isRequired
};
export default NoData;
