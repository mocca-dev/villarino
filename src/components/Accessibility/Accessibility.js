import React, { useContext } from "react";

import Context from "./../../context";
import "./Accessibility.css";
import Slider from "./Slider/Slider";
import AccCurrentBtn from "./AccCurrentBtn/AccCurrentBtn";

const Accessibilty = ({ currentTime, setForceDispatch }) => {
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
        <AccCurrentBtn
          currentTime={currentTime}
          setForceDispatch={setForceDispatch}
          textData={{
            toOptions,
            fromOptions: state.fromOptions,
            from: state.fromToSelected.from,
            to: state.fromToSelected.to
          }}
          voice={state.speechSetting.voice}
        />
      </div>
    </div>
  );
};

export default Accessibilty;
