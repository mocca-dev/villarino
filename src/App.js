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
    fromToSelected: { from: 0, to: false }
  });

  const [noTimeTables, setNoTimeTables] = useState(false);
  const [holiday, setHoliday] = useState(null);

  useEffect(() => {
    const { from, to } = state.fromToSelected;

    const today = new Date();
    const dayOfWeekId = today.getDay();
    let dayOfWeek = "weekDay";

    fetchHoliday(Date.now()).then(resp => {
      if (resp) {
        dayOfWeek = "hollidaysSunday";
        setHoliday(resp);
      } else {
        switch (dayOfWeekId) {
          case 5:
            dayOfWeek = "saturday";
            break;
          case 6:
            dayOfWeek = "hollidaysSunday";
            break;
          default:
            break;
        }
      }

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
    });
  }, [state.fromToSelected]);

  useEffect(() => {
    const cachedState = JSON.parse(localStorage.getItem("villarino"));
    if (cachedState) {
      dispatch({
        type: "SET_FROM",
        payload: cachedState.inputData.from
      });
      dispatch({
        type: "SET_TO",
        payload: cachedState.inputData.to
      });
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem(
      "villarino",
      JSON.stringify({ inputData: state.fromToSelected })
    );
  }, [state.fromToSelected]);

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
