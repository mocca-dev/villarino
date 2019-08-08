import React, { useEffect, useState, createRef, useCallback } from "react";
import "./TimeTableList.css";
import { CurrentIcon, LoadingSVG } from "./../Icons/Icons";

const TimeTableList = ({ timeTables, noTimeTables }) => {
  const [current, setCurrent] = useState(null);

  const findAndSetCurrent = useCallback(() => {
    const today = new Date();
    const hour =
      today.getHours() <= 9 ? "0" + today.getHours() : today.getHours();
    const mins =
      today.getMinutes() <= 9 ? "0" + today.getMinutes() : today.getMinutes();
    const formattedToday = hour + ":" + mins;
    let stop = false;

    timeTables.forEach((time, i) => {
      if (time.length >= 5 && formattedToday < time && !stop) {
        setCurrent(i);
        stop = true;
      }
    });
  }, [timeTables]);

  const refs = timeTables.reduce((acc, value, i) => {
    acc[i] = createRef();
    return acc;
  }, {});

  const scrollToCurrent = useCallback(
    id => {
      if (refs[id])
        refs[id].current.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
    },
    [refs]
  );

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
            {timeTable.length >= 5 && (
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
              </div>
            )}
          </span>
        ))
      ) : (
        <LoadingSVG />
      )}
      <button
        className="current-btn"
        onClick={() => {
          // reFetch();
          scrollToCurrent(current);
        }}
      >
        <CurrentIcon />
      </button>
    </div>
  );
};

export default TimeTableList;
