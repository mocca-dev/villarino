import React, { useEffect, createRef, useCallback, useContext } from "react";
import PropTypes from "prop-types";

import "./TimeTableList.css";
import { CurrentIcon, LoadingIcon } from "../../Icons/Icons";
import NoData from "./NoData/NoData";
import Context from "../../../context";
import TimeItem from "./TImeItem/TimeItem";

const TimeTableList = ({ holiday, setForceDispatch, current }) => {
  const { state } = useContext(Context);
  const { timetables, noTimetables } = state;
  const refs = timetables.reduce((acc, value, i) => {
    acc[i] = createRef();
    return acc;
  }, {});

  const scrollToCurrent = useCallback(
    id => {
      if (refs[id] && refs[id].current)
        refs[id].current.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
    },
    [refs]
  );

  useEffect(() => {
    if (current) scrollToCurrent(current);
  }, [current, scrollToCurrent]);

  return (
    <div className="list-container">
      {timetables.length ? (
        timetables.map((timetable, i) => (
          <span key={i} ref={refs[i]}>
            {timetable.includes("datos locales") ? (
              <NoData
                timeTable={timetable}
                setForceDispatch={setForceDispatch}
              />
            ) : (
              <TimeItem
                i={i}
                current={current}
                noTimetables={noTimetables}
                holiday={holiday}
                timetable={timetable}
              />
            )}
          </span>
        ))
      ) : (
        <div className="loading-container">
          <LoadingIcon />
        </div>
      )}
      <button
        className="current-btn"
        aria-label="current-button"
        onClick={() => {
          if (current && timetables.length) {
            setForceDispatch();
            scrollToCurrent(current);
          }
        }}
      >
        <CurrentIcon />
      </button>
    </div>
  );
};

TimeTableList.propTypes = {
  holiday: PropTypes.object,
  setForceDispatch: PropTypes.func.isRequired,
  current: PropTypes.number
};

export default TimeTableList;
