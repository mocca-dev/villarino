import React, { useContext } from "react";

import Context from "./../../context";
import "./Accessibility.css";
import Slider from "./Slider/Slider";
import TimeItem from "../Basic/TimeTableList/TImeItem/TimeItem";
import Speech from "./../../service/speech-service";

const Accessibilty = ({ currentTime, setForceDispatch }) => {
  const { state, dispatch } = useContext(Context);
  const toOptions = [
    { value: false, label: "Punta Alta" },
    { value: true, label: "Bahia Blanca" }
  ];

  const clickCurrentHandler = () => {
    setForceDispatch();
    if (state.speechSetting.voice) {
      Speech(
        `El próximo en llegar pasará a las ${currentTime.data}, pasando por ${
          state.fromOptions[state.fromToSelected.from].label
        } hacia ${toOptions[state.fromToSelected.to ? 1 : 0].label}`
      );
    }
  };

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
        <button className="acc-current-btn" onClick={clickCurrentHandler}>
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
