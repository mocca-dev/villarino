// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { fetchTimeTables, fetchHoliday } from "./../service";

const localFetch = (from, to, dayOfWeek, seasson, online) => {
  let timetables = JSON.parse(localStorage.getItem("timetables"));
  if (!timetables) timetables = [];

  const time =
    timetables &&
    timetables.find(time => time.id.toString() === from && time.way === to);

  let selectedTime = null;

  if (time && time[seasson] && time[seasson][dayOfWeek]) {
    selectedTime = time[seasson][dayOfWeek];
  } else {
    if (!online) {
      selectedTime = [
        "La applicación está funcionando sin conexión y no se tiene datos locales. Puede intentar refrescar la aplicación cuando tenga conexión nuevamente."
      ];
    }
  }

  return { timetables, time, selectedTime };
};

const dispatchTimeTablesData = async (from, to, dayOfWeek, seasson, online) => {
  const localData = localFetch(from, to, dayOfWeek, seasson, online);

  if (localData.selectedTime) {
    return localData.selectedTime;
  }

  const { timetables, time } = localData;
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

const switchDay = (holidays, day, month, dayOfWeekId) => {
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

const getDayOfWeek = () => {
  return new Promise((resolve, reject) => {
    const today = new Date();
    const dayOfWeekId = today.getDay();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    let holidays = JSON.parse(localStorage.getItem("holidays"));

    if (!holidays) {
      fetchHoliday().then(resp => {
        localStorage.setItem("holidays", JSON.stringify(resp));
        resolve(switchDay(resp, day, month, dayOfWeekId));
      });
    } else {
      resolve(switchDay(holidays, day, month, dayOfWeekId));
    }
  });
};

const setTimetable = (
  online,
  setTimetables,
  from,
  to,
  dayOfWeek,
  seassonSelected
) => {
  if (online) {
    setTimetables([]);

    dispatchTimeTablesData(from, to, dayOfWeek, seassonSelected, online).then(
      data => setTimetables(data)
    );
  } else {
    const { selectedTime } = localFetch(
      from,
      to,
      dayOfWeek,
      seassonSelected,
      online
    );
    setTimetables(selectedTime);
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
    getDayOfWeek(holidays).then(dayOfWeek => {
      setTimetable(online, setTimetables, from, to, dayOfWeek, seassonSelected);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromToSelected, seassonSelected, online, forceDispatch]);

  return timetables;
};

export default useTimetables;
