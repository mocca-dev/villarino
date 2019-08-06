import React, { useEffect, useState, createRef } from "react";
import "./TimeTableList.css";
import { CurrentIcon } from "./../Icons/Icons";

const TimeTableList = ({ timeTables, reFetch }) => {
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    const today = new Date();
    const hour =
      today.getHours() <= 9 ? "0" + today.getHours() : today.getHours();
    const formattedToday = hour + ":" + today.getMinutes();
    let stop = false;

    timeTables.forEach((time, i) => {
      if (formattedToday < time && !stop) {
        setCurrent(i);
        stop = true;
      }
    });
  }, [timeTables]);

  const refs = timeTables.reduce((acc, value, i) => {
    acc[i] = createRef();
    return acc;
  }, {});

  const scrollToCurrent = id =>
    refs[id].current.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

  return (
    <div className="list-container">
      {timeTables.map((timeTable, i) => (
        <span key={i}>
          {timeTable && (
            <div
              ref={refs[i]}
              className={
                i === current ? "time-container current" : "time-container"
              }
            >
              {i === current && (
                <div className="next-to-arrive">Próximo en llegar</div>
              )}
              <div>{timeTable}</div>
            </div>
          )}
        </span>
      ))}
      <button
        className="current-btn"
        onClick={() => {
          reFetch();
          scrollToCurrent(current);
        }}
      >
        <CurrentIcon />
      </button>
    </div>
  );
};

export default TimeTableList;
