import React, { useContext } from "react";
import PropTypes from "prop-types";

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
          voiceActivated={state.speechSetting.voice}
        />
      </div>
      <div className="acc-row-container">
        <Slider
          title={"Hasta"}
          list={toOptions}
          action={payload => dispatch({ type: "SET_TO", payload: payload })}
          voiceActivated={state.speechSetting.voice}
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

Accessibilty.propTypes = {
  currentTime: PropTypes.object.isRequired,
  setForceDispatch: PropTypes.func.isRequired
};

export default Accessibilty;
