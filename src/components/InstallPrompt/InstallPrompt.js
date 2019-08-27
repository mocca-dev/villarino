import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";

import { IOSShareIcon, CloseIcon } from "../Icons/Icons";

import "./InstallPrompt.css";

const showToaster = (setIsIpad, setShow) => {
  // Detects if device is on iOS
  const userAgent = window.navigator.userAgent.toLowerCase();
  const isIos = () => {
    return /iphone|ipad|ipod/.test(userAgent);
  };
  // Detects if device is on iPad
  const isIpad = () => {
    return /ipad/.test(userAgent);
  };
  // Detects if device is in standalone mode
  const isInStandaloneMode = () =>
    "standalone" in window.navigator && window.navigator.standalone;
  // Checks if should display install popup notification:
  setIsIpad(isIpad());
  setShow(isIos() && !isInStandaloneMode());
};

const InstallPrompt = ({ extShow }) => {
  const [show, setShow] = useState(false);
  const [isIpad, setIsIpad] = useState(false);

  useEffect(() => {
    if (extShow) setTimeout(() => showToaster(setIsIpad, setShow), 3500);
  }, [extShow]);

  return (
    <CSSTransition in={show} timeout={700} classNames="toast" unmountOnExit>
      <div className={"install-prompt-container " + (isIpad && "to-top")}>
        <div className="install-prompt-content">
          <span>
            Podés instalar esta aplicación en tu iPhone: Presiona en el{" "}
            <IOSShareIcon /> y luego en el{" "}
            <span className="add-to-home-install">+</span> (agregar a pantalla
            de inicio).{" "}
          </span>
          <button onClick={() => setShow(false)}>
            <CloseIcon />
          </button>
        </div>
        <span className={isIpad ? "arrow-up" : "arrow-down"} />
      </div>
    </CSSTransition>
  );
};

export default InstallPrompt;
