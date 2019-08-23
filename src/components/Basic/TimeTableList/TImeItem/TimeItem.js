import React from "react";
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
        <span>
          <Current i={i} current={current} noTimeTables={noTimetables} />
          <div>{timetable}</div>
          <Holiday i={i} current={current} holiday={holiday} />
        </span>
      ) : (
        <span className="loading-item-container">
          <LoadingIcon />
        </span>
      )}
    </div>
  );
};

export default TimeItem;
