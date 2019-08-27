import React from "react";
import PropTypes from "prop-types";

import Current from "../Current/Current";
import Holiday from "../Holiday/Holiday";
import "./TimeItem.css";
import { LoadingIcon } from "../../../Icons/Icons";

const TimeItem = ({ i, current, noTimetables, holiday, timetable }) => {
  return (
    <div
      className={
        i === current && !noTimetables
          ? "time-container current"
          : "time-container"
      }
    >
      {timetable ? (
        <>
          <Current i={i} current={current} noTimeTables={noTimetables} />
          <div>{timetable}</div>
          <Holiday i={i} current={current} holiday={holiday} />
        </>
      ) : (
        <span className="loading-item-container">
          <LoadingIcon />
        </span>
      )}
    </div>
  );
};

TimeItem.propTypes = {
  i: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  holiday: PropTypes.bool,
  timetable: PropTypes.string,
  noTimeTables: PropTypes.bool
};

export default TimeItem;
