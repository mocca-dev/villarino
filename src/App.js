import React, { useEffect, useReducer, useState } from "react";
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
    timeTables: [],
    fromToSelected: { from: 0, to: false },
    holidays: []
  });

  const [noTimeTables, setNoTimeTables] = useState(false);
  const [holiday, setHoliday] = useState(null);

  const dispatchTimeTablesData = (from, to, dayOfWeek) => {
    dispatch({ type: "SET_TIMETABLES", payload: [] });

    fetchTimeTables({
      timeId: from,
      way: to,
      seasson: "normalTime",
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
          break;
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
      dispatchTimeTablesData(from, to, dayOfWeek);
    } else {
      fetchHoliday().then(holidays => {
        dayOfWeek = getDayOfWeek(holidays, month, dayOfWeekId, day);
        dispatchTimeTablesData(from, to, dayOfWeek);
        dispatch({ type: "SET_HOLIDAYS", payload: holidays });
      });
    }
  }, [state.fromToSelected, state.holidays]);

  // useEffect(() => {
  //   const cachedState = JSON.parse(localStorage.getItem("villarino"));
  //   if (cachedState) {
  // dispatch({
  //   type: "SET_FROM",
  //   payload: cachedState.inputData.from
  // });
  // dispatch({
  //   type: "SET_TO",
  //   payload: cachedState.inputData.to
  // });
  //   }
  // }, [dispatch]);

  // useEffect(() => {
  //   localStorage.setItem(
  //     "villarino",
  //     JSON.stringify({ inputData: state.fromToSelected })
  //   );
  // }, [state.fromToSelected]);
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

  const { fromOptions, timeTables, fromToSelected } = state;
  return (
    <div className="app-container">
      <Header />
      <OfflineToast sWPromise={sWPromise} />
      <FromDropdown
        options={fromOptions}
        selected={fromToSelected.from}
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

export default App;
