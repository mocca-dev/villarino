import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

import "./ModalInfo.css";
import InfoPanel from "./InfoPanel/InfoPanel";
import ContactPanel from "./ContactPanel/ContactPanel";

const ModalInfo = ({ showInfo, setShowInfo, additionalText }) => {
  const [showContact, setShowContact] = useState(false);
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
      <div className="info-modal">
        <InfoPanel
          additionalText={additionalText}
          setShowContact={setShowContact}
          showContact={showContact}
          close={() => setShowInfo(false)}
        />
        <ContactPanel
          showContact={showContact}
          close={() => setShowContact(false)}
        />
      </div>
    </CSSTransition>
  );
};

ModalInfo.propTypes = {
  showInfo: PropTypes.bool.isRequired,
  setShowInfo: PropTypes.func.isRequired,
  additionalText: PropTypes.string.isRequired
};

export default ModalInfo;
