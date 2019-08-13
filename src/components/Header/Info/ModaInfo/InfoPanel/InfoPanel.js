import React from "react";

import SharedBtn from "./SharedBtn/SharedBtn";
import ContactBtn from "./ContactBtn/ContactBtn";
import { NoConectionIcon } from "../../../../Icons/Icons";
import "./InfoPanel.css";

const InfoPanel = ({ additionalText, setShowContact, showContact }) => {
  return (
    <>
      {!showContact && (
        <div>
          <h2>Ayuda</h2>
          <p>
            <strong>"Desde":</strong> Indica la parada por la que pasará la
            unidad en ese horario.
          </p>
          <p>
            <strong>"Hacia":</strong> Indica el sentido del recorrido.
          </p>
          <p>
            <strong>Ejemplo:</strong> Si usted se encuentra en Bahía Blanca y
            desea ir hacia Punta Alta deberá seleccionar la parada en la que se
            encuentra. Para eso debe seleccionar una de las paradas que se
            encuentran en el listado <strong>"Desde"</strong>. Por último debe
            elegir <strong>"Hacia"</strong> donde se dirige, en este caso, Punta
            Alta.
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
          . Por lo que la precisión dependerá de la regularidad de las unidades
          y de la exactitud con la funcionan.
          {additionalText && (
            <div className="warning-msg">
              <span> {additionalText}</span>
              <NoConectionIcon />
            </div>
          )}
          <div className="bottom-bar">
            <SharedBtn />
            <ContactBtn
              action={() => {
                setShowContact(true);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default InfoPanel;
