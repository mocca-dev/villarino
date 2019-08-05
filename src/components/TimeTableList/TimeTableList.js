import React, { useEffect, useState } from "react";
import "./TimeTableList.css";

const TimeTableList = ({ timeTables }) => {
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    const today = new Date();
    const formattedToday = today.getHours() + ":" + today.getMinutes();
    let stop = false;

    timeTables.forEach((time, i) => {
      if (formattedToday < time && !stop) {
        console.log(formattedToday, time);
        setCurrent(i);
        stop = true;
      }
    });
  }, [timeTables]);

  return (
    <div className="list-container">
      {timeTables.map((timeTable, i) => (
        <span key={i}>
          {timeTable && (
            <div
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
    </div>
  );
};

export default TimeTableList;
