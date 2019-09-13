import React from "react";
import PropTypes from "prop-types";

import Current from "../Current/Current";
import Holiday from "../Holiday/Holiday";
import "./TimeItem.css";
import { LoadingIcon } from "../../../Icons/Icons";
import CurrentDay from "../CurrentDay/CurrentDay";

const TimeItem = ({
  i,
  current,
  noTimetables,
  holiday,
  timetable,
  isBasic
}) => {
  const isCurrent = i === current.index;

  return (
    <div
      className={
        isCurrent && !noTimetables ? "time-container current" : "time-container"
      }
    >
      {timetable ? (
        <>
          <Current isCurrent={isCurrent} noTimeTables={noTimetables} />
          <div className={isBasic ? "" : "acc-timetable"}>{timetable}</div>
          <CurrentDay isCurrent={isCurrent} dayName={current.dayName} />
          <Holiday isCurrent={isCurrent} holiday={holiday} />
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
  current: PropTypes.object.isRequired,
  holiday: PropTypes.bool,
  timetable: PropTypes.string,
  noTimeTables: PropTypes.bool,
  isBasic: PropTypes.bool
};

export default TimeItem;
