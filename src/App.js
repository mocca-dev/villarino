import React, { useEffect, useReducer, useState } from "react";
import PropTypes from "prop-types";
import "./App.css";
import Header from "./components/Header/Header";
import FromDropdown from "./components/FromDropdown/FromDropdown";
import ToDropdown from "./components/ToDropdown/ToDropdown";
import TimeTableList from "./components/TimeTableList/TimeTableList";
import OfflineToast from "./components/OfflineToast/OfflineToast";
import appReducer from "./reducer";
import { fetchTimeTables, fetchHoliday } from "./service";

function App({ sWPromise }) {
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
    seassonSelected: "normalTime"
  });

  const [noTimeTables, setNoTimeTables] = useState(false);
  const [holiday, setHoliday] = useState(null);

  const dispatchTimeTablesData = (from, to, dayOfWeek, seasson) => {
    dispatch({ type: "SET_TIMETABLES", payload: [] });

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
    seassonOptions
  } = state;
  return (
    <div className="app-container">
      <Header />
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
      />
    </div>
  );
}

App.propTypes = {
  sWPromise: PropTypes.object.isRequired
};

export default App;
