import React, { useEffect, useReducer, useState } from "react";
import PropTypes from "prop-types";
import "./App.css";
import Header from "./components/Header/Header";
import FromDropdown from "./components/FromDropdown/FromDropdown";
import ToDropdown from "./components/ToDropdown/ToDropdown";
import TimeTableList from "./components/TimeTableList/TimeTableList";
import OfflineToast from "./components/OfflineToast/OfflineToast";
import appReducer from "./reducer";
import Context from "./context";
import { fetchTimeTables, fetchHoliday } from "./service";

function App({ sWPromise }) {
  const [weekDayStr, setWeekDayStr] = useState("");
  const [state, dispatch] = useReducer(appReducer, {
    fromOptions: [
      { value: 0, label: "Parque de Mayo" },
      { value: 1, label: "Plaza Rivadavia" },
      { value: 2, label: "Hospital Penna" },
      { value: 3, label: "Villa Arias" },
      { value: 4, label: "Termnial Punta Alta" }
    ],
    seassonOptions: [
      { value: "summerTime", label: "Verano" },
      { value: "winterTime", label: "Receso Invernal" },
      { value: "normalTime", label: "Resto del año" }
    ],
    timeTables: [],
    fromToSelected: { from: "0", to: false },
    holidays: [],
    seassonSelected: "normalTime",
    online: true,
    speechSetting: { active: false, voice: false, velocity: 1 }
  });

  const [noTimeTables, setNoTimeTables] = useState(false);
  const [holiday, setHoliday] = useState(null);

  const dispatchTimeTablesData = (from, to, dayOfWeek, seasson) => {
    dispatch({ type: "SET_TIMETABLES", payload: [] });

    let timetables = JSON.parse(localStorage.getItem("timetables"));
    if (!timetables) timetables = [];

    const time =
      timetables &&
      timetables.find(time => time.id.toString() === from && time.way === to);

    if (time) {
      dispatch({
        type: "SET_TIMETABLES",
        payload: time[seasson][dayOfWeek]
      });
      return;
    } else {
      if (!online) {
        dispatch({
          type: "SET_TIMETABLES",
          payload: [
            "La applicación está funcionando sin conexión y no se tiene datos locales. Puede intentar refrescar la aplicación cuando tenga conexión nuevamente."
          ]
        });
      }
    }

    fetchTimeTables({
      timeId: from,
      way: to,
      seasson,
      dayOfWeek
    }).then(resp => {
      const { data } = resp;
      if (data.error) {
        setNoTimeTables(true);
        dispatch({
          type: "SET_TIMETABLES",
          payload: [data.error]
        });
      } else {
        setNoTimeTables(false);

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

        dispatch({
          type: "SET_TIMETABLES",
          payload: data.timetables
        });
      }
    });
  };

  const getDayOfWeek = (holidays, month, dayOfWeekId, day) => {
    const holidayData = holidays.find(
      date => date.dia === day && date.mes === month
    );

    if (holidayData) {
      setHoliday(holidayData);
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

  const getCurrentSeasson = (month, day) => {
    if (month === 1) {
      return "summerTime";
    } else if (month === 7) {
      return day >= 22 && day <= 31 ? "winterTime" : "normalTime";
    } else if (month === 8) {
      return day >= 1 && day <= 2 ? "winterTime" : "normalTime";
    } else {
      return "normalTime";
    }
  };

  useEffect(() => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const currentSeasson = getCurrentSeasson(month, day);
    dispatch({ type: "SET_SEASSON", payload: currentSeasson });
  }, []);

  useEffect(() => {
    const { from, to } = state.fromToSelected;

    const today = new Date();
    const dayOfWeekId = today.getDay();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    let dayOfWeek = "weekDay";

    if (state.holidays.length) {
      dayOfWeek = getDayOfWeek(state.holidays, month, dayOfWeekId, day);
      dispatchTimeTablesData(from, to, dayOfWeek, state.seassonSelected);
    } else {
      fetchHoliday().then(holidays => {
        dayOfWeek = getDayOfWeek(holidays, month, dayOfWeekId, day);
        dispatchTimeTablesData(from, to, dayOfWeek, state.seassonSelected);
        dispatch({ type: "SET_HOLIDAYS", payload: holidays });
      });
    }
    setWeekDayStr(dayOfWeek);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.fromToSelected, state.seassonSelected]);

  useEffect(() => {
    if (state.fromToSelected.to) {
      dispatch({
        type: "CHANGE_FROM_LABEL",
        payload: { value: 1, label: "Vieytes y Colón" }
      });
    } else {
      dispatch({
        type: "CHANGE_FROM_LABEL",
        payload: { value: 1, label: "Plaza Rivadavia" }
      });
    }
  }, [state.fromToSelected.to]);

  const {
    fromOptions,
    timeTables,
    fromToSelected,
    seassonSelected,
    seassonOptions,
    online
  } = state;
  return (
    <Context.Provider value={{ state, dispatch }}>
      <div className="app-container">
        <Header dispatch={dispatch} />
        <OfflineToast sWPromise={sWPromise} />
        <FromDropdown
          options={fromOptions}
          selected={fromToSelected.from}
          seassonSelected={seassonSelected}
          seassonOptions={seassonOptions}
          dispatch={dispatch}
        />
        <ToDropdown selected={fromToSelected.to} dispatch={dispatch} />
        <TimeTableList
          timeTables={timeTables}
          noTimeTables={noTimeTables}
          holiday={holiday}
          refresh={() =>
            dispatchTimeTablesData(
              fromToSelected.from,
              fromToSelected.to,
              weekDayStr,
              state.seassonSelected
            )
          }
        />
      </div>
    </Context.Provider>
  );
}

App.propTypes = {
  sWPromise: PropTypes.object.isRequired
};

export default App;
