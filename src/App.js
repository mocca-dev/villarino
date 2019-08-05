import React, { useEffect, useReducer } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import FromDropdown from "./components/FromDropdown/FromDropdown";
import ToDropdown from "./components/ToDropdown/ToDropdown";
import TimeTableList from "./components/TimeTableList/TimeTableList";
import { CurrentIcon } from "./components/Icons/Icons";
import appReducer from "./reducer";

function App() {
  const [state, dispatch] = useReducer(appReducer, {
    fromOptions: [
      { value: 0, label: "Parque de Mayo" },
      { value: 1, label: "Plaza Rivadavia" },
      { value: 2, label: "Hospital Penna" },
      { value: 3, label: "Villa Arias" },
      { value: 4, label: "Termnial Punta Alta" }
    ],
    timeTables: []
  });

  useEffect(() => {
    dispatch({
      type: "SET_TIMETABLES",
      payload: [
        "04:30",
        "04:30",
        "04:30",
        "04:30",
        "04:30",
        "04:30",
        "04:30",
        "04:30",
        "04:30",
        "04:30",
        "04:30"
      ]
    });
  }, []);

  const { fromOptions, timeTables } = state;
  return (
    <div className="app-container">
      <Header />
      <FromDropdown options={fromOptions} />
      <ToDropdown />
      <TimeTableList timeTables={timeTables} current={3} />
      <button className="current-btn" onClick={() => console.log("asd")}>
        <CurrentIcon />
      </button>
    </div>
  );
}

export default App;
