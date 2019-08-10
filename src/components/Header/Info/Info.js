import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { InfoIcon, NoConectionIcon } from "../../Icons/Icons";
import OutsideClick from "../../OutsideClick/OutsideClick";
import "./Info.css";

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
            <h3>Funcionamiento</h3>
            <p>
              <strong>"Desde:"</strong> Indica la parada por la que pasará la
              unidad en ese horario.
            </p>
            <p>
              <strong>"Hacia:"</strong> Indica el sentido del recorrido.
            </p>
            <p>
              <strong>Ejemplo:</strong> Si usted se encuentra en Bahía Blanca y
              desea ir hacia Punta Alta deberá seleccionar la parada en la que
              se encuentra. Para eso debe seleccionar una de las paradas que se
              encuentran en el listado <strong>"Desde"</strong>. Por último debe
              elegir <strong>"Hacia"</strong> donde se dirige, en este caso,
              Punta Alta.
            </p>
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
            {additionalText && (
              <div className="warning-msg">
                <span> {additionalText}</span>
                <NoConectionIcon />
              </div>
            )}
          </div>
        </CSSTransition>
      </>
    </OutsideClick>
  );
};

export default Info;
