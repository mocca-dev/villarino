import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

import { SettingIcon } from "../../Icons/Icons";
import OutsideClick from "../../Basic/OutsideClick/OutsideClick";
import "./Info.css";
import ModalInfo from "./ModaInfo/ModalInfo";

const Info = ({ dispatch }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [showDot, setShowDot] = useState(false);
  const [additionalText, setAdditionalText] = useState("");

  useEffect(() => {
    function updateOnlineStatus(event) {
      setAdditionalText(!navigator.onLine ? "Sin conexión." : "");
      setShowDot(!navigator.onLine);
      dispatch({ type: "SET_ONLINE", payload: navigator.onLine });
    }
    updateOnlineStatus();
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);
  }, [dispatch]);

  return (
    <OutsideClick action={() => setShowInfo(false)}>
      <>
        <button
          className={showInfo ? "info-btn setting-icon-active" : "info-btn"}
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
          <SettingIcon />
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
