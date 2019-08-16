import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

import "./ModalInfo.css";
import InfoPanel from "./InfoPanel/InfoPanel";
import ContactPanel from "./ContactPanel/ContactPanel";
import { MailIcon, InfoIcon, SettingIcon } from "../../../Icons/Icons";
import SettingPanel from "./SettingPanel/SettingPanel";

const ModalInfo = ({ showInfo, setShowInfo, additionalText }) => {
  const [currentPanel, setCurrentPannel] = useState({
    code: "setting",
    header: "Ajustes"
  });

  const navBtns = [
    {
      icon: <SettingIcon />,
      action: () => setCurrentPannel({ code: "setting", header: "Ajustes" }),
      type: "setting"
    },
    {
      icon: <MailIcon />,
      action: () => setCurrentPannel({ code: "contact", header: "Contacto" }),
      type: "contact"
    },
    {
      icon: <InfoIcon />,
      action: () => setCurrentPannel({ code: "info", header: "Ayuda" }),
      type: "info"
    }
  ];

  return (
    <CSSTransition
      in={showInfo}
      timeout={400}
      classNames="info"
      unmountOnExit
      appear
      onEntered={() => setShowInfo(true)}
      onExit={() => setShowInfo(false)}
    >
      <span>
        <div className="info-modal">
          <header className="info-header">
            <h2>{currentPanel.header}</h2>
          </header>
          {currentPanel.code === "info" && (
            <InfoPanel
              additionalText={additionalText}
              close={() => setShowInfo(false)}
            />
          )}
          {currentPanel.code === "contact" && (
            <ContactPanel close={() => null} />
          )}
          {currentPanel.code === "setting" && (
            <SettingPanel close={() => null} />
          )}
          <div className="setting-nav-bar">
            {navBtns.map((btn, i) => (
              <button
                key={i}
                onClick={btn.action}
                className={
                  btn.type === currentPanel.code ? "current-panel" : ""
                }
              >
                {btn.icon}
              </button>
            ))}
          </div>
        </div>
      </span>
    </CSSTransition>
  );
};

ModalInfo.propTypes = {
  showInfo: PropTypes.bool.isRequired,
  setShowInfo: PropTypes.func.isRequired,
  additionalText: PropTypes.string.isRequired
};

export default ModalInfo;
