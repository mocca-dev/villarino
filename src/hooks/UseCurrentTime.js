/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

const iterateTimetables = (
  dummyDate,
  formattedToday,
  dummyDateToday,
  timetables,
  setCurrent
) => {
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
      setCurrent({ index: i, data: timetables[i] });
      return false;
    }
  }
  return true;
};

const findAndSetCurrent = (timetables, setCurrent) => {
  const today = new Date();
  const hour =
    today.getHours() <= 9 ? "0" + today.getHours() : today.getHours();
  const mins =
    today.getMinutes() <= 9 ? "0" + today.getMinutes() : today.getMinutes();
  const formattedToday = hour + ":" + mins; //'05:11' '00:11' '23:59'

  let oneLap = iterateTimetables(
    "01/01/2000",
    formattedToday,
    "01/01/2000",
    timetables,
    setCurrent
  );

  if (oneLap) {
    iterateTimetables(
      "01/01/2001",
      formattedToday,
      "02/01/2000",
      timetables,
      setCurrent
    );
  }
};

const UseCurrentTime = timetables => {
  const [current, setCurrent] = useState(null);
  useEffect(() => {
    if (timetables.length) {
      findAndSetCurrent(timetables, setCurrent);
    }
  }, [timetables]);

  return current;
};

export default UseCurrentTime;
