import React from "react";
import "./TimeTableList.css";

const TimeTableList = ({ timeTables, current }) => {
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
