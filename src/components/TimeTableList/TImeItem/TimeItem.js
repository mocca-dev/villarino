import React from "react";
import Current from "../Current/Current";
import Holiday from "../Holiday/Holiday";

import "./TimeItem.css";

const TimeItem = ({ i, current, noTimetables, holiday, timetable }) => {
  return (
    <div
      className={
        i === current && !noTimetables
          ? "time-container current"
          : "time-container"
      }
    >
      <Current i={i} current={current} noTimeTables={noTimetables} />
      <div>{timetable}</div>
      <Holiday i={i} current={current} holiday={holiday} />
    </div>
  );
};

export default TimeItem;
