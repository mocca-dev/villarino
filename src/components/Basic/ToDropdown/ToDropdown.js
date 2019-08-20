import React, { useContext, useState, useEffect } from "react";

import SubHeader from "./../SubHeader/SubHeader";
import "./ToDropdown.css";
import Context from "./../../../context";

const ToDropdown = () => {
  const { state, dispatch } = useContext(Context);

  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setSelected(state.fromToSelected.to);
  }, [state.fromToSelected.to]);

  return (
    <div className="to-radio">
      <SubHeader text="Hacia" />
      <div className="radio-container">
        <span className="to-container">
          <input
            type="radio"
            id="left"
            name="to"
            checked={!selected}
            value={!selected}
            onChange={e => dispatch({ type: "SET_TO", payload: false })}
          />
          <label htmlFor="left">Punta Alta</label>
        </span>
        <span className="to-container">
          <input
            type="radio"
            id="right"
            name="to"
            checked={selected}
            value={selected}
            onChange={e => dispatch({ type: "SET_TO", payload: true })}
          />
          <label htmlFor="right">Bahia Blanca</label>
        </span>
      </div>
    </div>
  );
};

export default ToDropdown;
