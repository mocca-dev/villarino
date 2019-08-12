import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

import { InfoIcon } from "../../Icons/Icons";
import OutsideClick from "../../OutsideClick/OutsideClick";
import "./Info.css";
import ModalInfo from "../ModaInfo/ModalInfo";

const Info = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [showDot, setShowDot] = useState(false);
  const [additionalText, setAdditionalText] = useState("");

  useEffect(() => {
    function updateOnlineStatus(event) {
      setAdditionalText(
        !navigator.onLine ? "La aplicación está funcionando sin conexión." : ""
      );
      setShowDot(!navigator.onLine);
    }
    updateOnlineStatus();
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);
  }, []);

  return (
    <OutsideClick action={() => setShowInfo(false)}>
      <>
        <button
          className="info-btn"
          onClick={() => {
            setShowInfo(() => !showInfo);
            setShowDot(false);
          }}
        >
          <CSSTransition
            in={showDot}
            timeout={500}
            classNames="dot"
            unmountOnExit
            appear
            onEntered={() => setShowDot(true)}
            onExit={() => setShowDot(false)}
          >
            <span className="notif-red-dot" />
          </CSSTransition>
          <InfoIcon />
        </button>
        <ModalInfo
          showInfo={showInfo}
          setShowInfo={setShowInfo}
          additionalText={additionalText}
        />
      </>
    </OutsideClick>
  );
};

export default Info;
