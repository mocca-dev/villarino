import React, { useEffect, useReducer } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import FromDropdown from "./components/FromDropdown/FromDropdown";
import ToDropdown from "./components/ToDropdown/ToDropdown";
import TimeTableList from "./components/TimeTableList/TimeTableList";
import appReducer from "./reducer";
import { fetchTimeTables } from "./service";

function App() {
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

  useEffect(() => {
    fetchTimeTables({
      timeId: "0",
      way: "true",
      seasson: "normalTime",
      dayofweek: "saturday"
    }).then(resp => {
      dispatch({
        type: "SET_TIMETABLES",
        payload: resp.data.timetables
      });
    });
  }, []);

  useEffect(() => {
    const { from, to } = state.fromToSelected;

    fetchTimeTables({
      timeId: from,
      way: to,
      seasson: "normalTime",
      dayofweek: "saturday"
    }).then(resp => {
      dispatch({
        type: "SET_TIMETABLES",
        payload: resp.data.timetables
      });
    });
  }, [state.fromToSelected]);

  const refetchTimeTables = () => {
    dispatch({ type: "SET_TIMETABLES", payload: [] });
    const { from, to } = state.fromToSelected;
    fetchTimeTables({
      timeId: from,
      way: to,
      seasson: "normalTime",
      dayofweek: "saturday"
    }).then(resp => {
      dispatch({
        type: "SET_TIMETABLES",
        payload: resp.data.timetables
      });
    });
  };

  const { fromOptions, timeTables, fromToSelected } = state;
  return (
    <div className="app-container">
      <Header />
      <FromDropdown
        options={fromOptions}
        selected={fromToSelected.from}
        dispatch={dispatch}
      />
      <ToDropdown selected={fromToSelected.to} dispatch={dispatch} />
      <TimeTableList
        timeTables={timeTables}
        current={3}
        reFetch={refetchTimeTables}
      />
    </div>
  );
}

export default App;
