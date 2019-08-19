// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { fetchTimeTables } from "./../service";

const dispatchTimeTablesData = async (from, to, dayOfWeek, seasson, online) => {
  let timetables = JSON.parse(localStorage.getItem("timetables"));
  if (!timetables) timetables = [];

  const time =
    timetables &&
    timetables.find(time => time.id.toString() === from && time.way === to);

  if (time && time[seasson] && time[seasson][dayOfWeek]) {
    return time[seasson][dayOfWeek];
  } else {
    if (!online) {
      return [
        "La applicación está funcionando sin conexión y no se tiene datos locales. Puede intentar refrescar la aplicación cuando tenga conexión nuevamente."
      ];
    }
  }

  const { data } = await fetchTimeTables({
    timeId: from,
    way: to,
    seasson,
    dayOfWeek
  });

  if (data.error) {
    return [data.error];
  } else {
    if (!time) {
      const newTime = { id: from, way: to };
      newTime[seasson] = {};
      newTime[seasson][dayOfWeek] = data.timetables;
      timetables.push(newTime);
    } else {
      time[seasson] = {};
      time[seasson][dayOfWeek] = data.timetables;
    }

    localStorage.setItem("timetables", JSON.stringify(timetables));

    return data.timetables;
  }
};

const getDayOfWeek = holidays => {
  const today = new Date();
  const dayOfWeekId = today.getDay();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const holidayData = holidays.find(
    date => date.dia === day && date.mes === month
  );

  if (holidayData) {
    return "hollidaysSunday";
  } else {
    switch (dayOfWeekId) {
      case 6:
        return "saturday";
      case 0:
        return "hollidaysSunday";
      default:
        return "weekDay";
    }
  }
};

const useTimetables = (
  fromToSelected,
  holidays,
  seassonSelected,
  online,
  forceDispatch
) => {
  const [timetables, setTimetables] = useState([]);

  useEffect(() => {
    const { from, to } = fromToSelected;
    let dayOfWeek = "weekDay";

    setTimetables([]);

    dayOfWeek = getDayOfWeek(holidays);
    dispatchTimeTablesData(from, to, dayOfWeek, seassonSelected, online).then(
      data => {
        setTimetables(data);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromToSelected, seassonSelected, online, forceDispatch]);

  return timetables;
};

export default useTimetables;
