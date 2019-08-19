import React, {
  useEffect,
  useState,
  createRef,
  useCallback,
  useContext
} from "react";

import "./TimeTableList.css";
import { CurrentIcon, LoadingIcon } from "./../Icons/Icons";
import Current from "./Current/Current";
import Holiday from "./Holiday/Holiday";
import NoData from "./NoData/NoData";
import Context from "./../../context";

const TimeTableList = ({ holiday, setForceDispatch }) => {
  const [current, setCurrent] = useState(null);
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
  const iterateTimetables = useCallback(
    (dummyDate, formattedToday, dummyDateToday) => {
      for (let i = 0; i < timetables.length; i++) {
        const current = timetables[i];
        const prev = timetables[i - 1];

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
    [timetables]
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
    if (timetables.length) {
      findAndSetCurrent();
      // setInterval(findAndSetCurrent, 30000);
      // setIntervalSetted(true);
    }
  }, [timetables, findAndSetCurrent]);

  useEffect(() => {
    if (current) scrollToCurrent(current);
  }, [current, scrollToCurrent]);

  return (
    <div className="list-container">
      {timetables.length ? (
        timetables.map((timeTable, i) => (
          <span key={i}>
            <div
              ref={refs[i]}
              className={
                i === current && !noTimetables
                  ? "time-container current"
                  : "time-container"
              }
            >
              {timeTable.includes("datos locales") ? (
                <NoData
                  timeTable={timeTable}
                  setForceDispatch={setForceDispatch}
                />
              ) : (
                <span>
                  <Current
                    i={i}
                    current={current}
                    noTimeTables={noTimetables}
                  />
                  <div>{timeTable}</div>
                  <Holiday i={i} current={current} holiday={holiday} />
                </span>
              )}
            </div>
          </span>
        ))
      ) : (
        <div className="loading-container">
          <LoadingIcon />
        </div>
      )}
      <button
        className="current-btn"
        onClick={() => {
          if (current && timetables.length) {
            setForceDispatch();
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

export default TimeTableList;
