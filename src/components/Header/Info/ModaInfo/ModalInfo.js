import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

import "./ModalInfo.css";
import InfoPanel from "./InfoPanel/InfoPanel";
import {
  MailIcon,
  InfoIcon,
  SettingIcon,
  CloseIcon
} from "../../../Icons/Icons";
import SettingPanel from "./SettingPanel/SettingPanel";
import { NoConectionIcon } from "./../../../Icons/Icons";
import ContactMailPanel from "./ContactMailPanel/ContactMailPanel";
import OutsideClick from "../../../Basic/OutsideClick/OutsideClick";

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
        <span className="modal-backdrop" />
        <OutsideClick action={() => setShowInfo(false)}>
          <div className="info-modal">
            {additionalText && (
              <div className="warning-msg">
                <span> {additionalText}</span>
                <NoConectionIcon />
              </div>
            )}
            <div className="info-modal-content">
              <header className="info-header">
                <h2>{currentPanel.header}</h2>
                <button
                  className="close-btn"
                  onClick={() => setShowInfo(false)}
                >
                  <CloseIcon />
                </button>
              </header>
              {currentPanel.code === "info" && (
                <InfoPanel
                  additionalText={additionalText}
                  close={() => setShowInfo(false)}
                />
              )}
              {currentPanel.code === "contact" && (
                <ContactMailPanel close={() => null} />
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
          </div>
        </OutsideClick>
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
