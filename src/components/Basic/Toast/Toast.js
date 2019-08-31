import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { CSSTransition } from "react-transition-group";
import { RefreshIcon, CloseIcon } from "../../Icons/Icons";
import "./Toast.css";

const Toast = ({ extShow, text, leftBtn, closeAction }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(extShow);
  }, [extShow]);

  return (
    <CSSTransition in={show} timeout={700} classNames="toast" unmountOnExit>
      <div className="toast-container">
        <span>{text}</span>
        <span className="toast-btn-container">
          {leftBtn && (
            <button
              className="toast-close-btn"
              aria-label="toast-refresh-button"
              onClick={() => window.location.reload()}
            >
              <RefreshIcon />
            </button>
          )}
          <button
            className="toast-close-btn"
            aria-label="toast-close-button"
            onClick={() => {
              setShow(false);
              closeAction();
            }}
          >
            <CloseIcon />
          </button>
        </span>
      </div>
    </CSSTransition>
  );
};

Toast.propTypes = {
  extShow: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  leftBtn: PropTypes.bool,
  closeAction: PropTypes.func
};

export default Toast;
