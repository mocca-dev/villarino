import React from "react";
import PropTypes from "prop-types";

const CurrentDay = ({ isCurrent, holiday, dayName }) =>
  isCurrent &&
  !holiday && <div className="current-day-container">{dayName}</div>;

CurrentDay.propTypes = {
  isCurrent: PropTypes.bool.isRequired,
  holiday: PropTypes.bool,
  dayName: PropTypes.string.isRequired
};

export default CurrentDay;
