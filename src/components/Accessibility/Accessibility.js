import React, { useContext } from "react";

import Context from "./../../context";
import "./Accessibility.css";
import Slider from "./Slider/Slider";
import TimeItem from "../Basic/TimeTableList/TImeItem/TimeItem";

const Accessibilty = ({ currentTime }) => {
  const { state, dispatch } = useContext(Context);
  const toOptions = [
    { value: false, label: "Punta Alta" },
    { value: true, label: "Bahia Blanca" }
  ];
  return (
    <div className="acc-container">
      <div className="acc-row-container">
        <Slider
          title={"Desde"}
          list={state.fromOptions}
          action={payload =>
            dispatch({ type: "SET_FROM", payload: payload.toString() })
          }
        />
      </div>
      <div className="acc-row-container">
        <Slider
          title={"Hasta"}
          list={toOptions}
          action={payload => dispatch({ type: "SET_TO", payload: payload })}
        />
      </div>
      <div className="acc-row-container">
        <button className="acc-current-btn" onClick={() => console.log("hola")}>
          <TimeItem
            i={currentTime && currentTime.index}
            current={currentTime && currentTime.index}
            noTimetables={false}
            holiday={false}
            timetable={currentTime && currentTime.data}
          />
        </button>
      </div>
    </div>
  );
};

export default Accessibilty;
