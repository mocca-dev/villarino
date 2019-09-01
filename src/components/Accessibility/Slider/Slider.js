import React, { useState } from "react";
import PropTypes from "prop-types";

import "./Slider.css";
import { LeftArrowIcon, RightArrowIcon } from "../../Icons/Icons";
import Speech from "./../../../service/speech-service";

const Slider = ({ list, title, action, voiceActivated }) => {
  const [current, setCurrent] = useState(0);

  const move = way => {
    if (way === -1 && current === 0) {
      return list.length - 1;
    } else if (way === 1 && current === list.length - 1) {
      return 0;
    }
    return current + 1 * way;
  };

  const clickHandler = way => {
    const next = move(way);
    setCurrent(next);
    action(list[next].value);
    if (voiceActivated) Speech(list[next].label);
  };

  return (
    <div className="slider-container">
      <header>
        <h2>{title}:</h2>
        <span>{list[current].label}</span>
      </header>
      <span className="slider-btns">
        <button onClick={() => clickHandler(-1)} aria-label="acc-left-button">
          <LeftArrowIcon />
        </button>
        <button onClick={() => clickHandler(1)} aria-label="acc-right-button">
          <RightArrowIcon />
        </button>
      </span>
    </div>
  );
};

Slider.propTypes = {
  list: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  voiceActivated: PropTypes.bool
};

export default Slider;