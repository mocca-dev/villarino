import React, { useEffect, useState, createRef, useCallback } from "react";
import PropTypes from "prop-types";

import "./TimeTableList.css";
import { CurrentIcon, LoadingSVG } from "./../Icons/Icons";

const TimeTableList = ({ timeTables, noTimeTables, holiday }) => {
  const [current, setCurrent] = useState(null);

  const refs = timeTables.reduce((acc, value, i) => {
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
  const iterateTimetables = useCallback(
    (dummyDate, formattedToday, dummyDateToday) => {
      for (let i = 0; i < timeTables.length; i++) {
        const current = timeTables[i];
        const prev = timeTables[i - 1];

        if (
          current !== "DIRECTO" &&
          prev !== "DIRECTO" &&
          current.length > 1 &&
          prev &&
          prev.length > 1 &&
          current < prev
        )
          dummyDate = "02/01/2000";
        if (
          current.length > 1 &&
          Date.parse(dummyDate + " " + current) >
            Date.parse(dummyDateToday + " " + formattedToday)
        ) {
          setCurrent(i);
          return false;
        }
      }
      return true;
    },
    [timeTables]
  );

  const findAndSetCurrent = useCallback(() => {
    const today = new Date();
    const hour =
      today.getHours() <= 9 ? "0" + today.getHours() : today.getHours();
    const mins =
      today.getMinutes() <= 9 ? "0" + today.getMinutes() : today.getMinutes();
    const formattedToday = hour + ":" + mins; //'05:11' '00:11' '23:59'

    let oneLap = iterateTimetables("01/01/2000", formattedToday, "01/01/2000");

    if (oneLap) {
      iterateTimetables("01/01/2001", formattedToday, "02/01/2000");
    }
  }, [iterateTimetables]);

  useEffect(() => {
    if (timeTables.length) {
      findAndSetCurrent();
      // setInterval(findAndSetCurrent, 30000);
      // setIntervalSetted(true);
    }
  }, [timeTables, findAndSetCurrent]);

  useEffect(() => {
    if (current) scrollToCurrent(current);
  }, [current, scrollToCurrent]);

  return (
    <div className="list-container">
      {timeTables.length ? (
        timeTables.map((timeTable, i) => (
          <span key={i}>
            <div
              ref={refs[i]}
              className={
                i === current && !noTimeTables
                  ? "time-container current"
                  : "time-container"
              }
            >
              {i === current && !noTimeTables && (
                <div className="next-to-arrive">Próximo en llegar</div>
              )}
              <div>{timeTable}</div>
              {i === current && holiday && (
                <div className="holiday-container">
                  Horarios por feriado: {holiday.motivo}
                </div>
              )}
            </div>
          </span>
        ))
      ) : (
        <LoadingSVG />
      )}
      <button
        className="current-btn"
        onClick={() => {
          if (current && timeTables.length) {
            findAndSetCurrent();
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
  timeTables: PropTypes.array.isRequired,
  noTimeTables: PropTypes.bool.isRequired,
  holiday: PropTypes.bool
};

export default TimeTableList;
