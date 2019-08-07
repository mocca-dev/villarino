import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { InfoIcon } from "../../Icons/Icons";
import OutsideClick from "../../OutsideClick/OutsideClick";
import "./Info.css";

const Info = () => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <OutsideClick action={() => setShowInfo(false)}>
      <>
        <button
          className="info-btn"
          onClick={() => setShowInfo(() => !showInfo)}
        >
          <InfoIcon />
        </button>
        <CSSTransition
          in={showInfo}
          timeout={400}
          classNames="info"
          unmountOnExit
          appear
          onEntered={() => setShowInfo(true)}
          onExit={() => setShowInfo(false)}
        >
          <div className="info-modal">
            <strong>ACLARACION:</strong> La información utilizada en esta app no
            corresponde a información en tiempo real sino que proviene de{" "}
            <a
              className="villarino-link"
              href="http://www.elvillarino.com.ar/#horarios"
              target="_blank"
              rel="noopener noreferrer"
            >
              aquí
            </a>{" "}
            . Por lo que la precisión dependerá de la regularidad de las
            unidades y de la exactitud con la funcionan.
          </div>
        </CSSTransition>
      </>
    </OutsideClick>
  );
};

export default Info;
