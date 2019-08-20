import React, { useState } from "react";

import "./Slider.css";
import { LeftArrowIcon, RightArrowIcon } from "../../Icons/Icons";

const Slider = ({ list, title, action }) => {
  const [current, setCurrent] = useState(0);

  const move = way => {
    if (way === -1 && current === 0) {
      return list.length - 1;
    } else if (way === 1 && current === list.length - 1) {
      return 0;
    }
    return current + 1 * way;
  };
  return (
    <div className="slider-container">
      <header>
        <h2>{title}:</h2>
        <span>{list[current].label}</span>
      </header>
      <span className="slider-btns">
        <button
          onClick={() => {
            setCurrent(move(-1));
            action(list[move(-1)].value);
          }}
        >
          <LeftArrowIcon />
        </button>
        <button
          onClick={() => {
            setCurrent(move(+1));
            action(list[move(+1)].value);
          }}
        >
          <RightArrowIcon />
        </button>
      </span>
    </div>
  );
};

export default Slider;
