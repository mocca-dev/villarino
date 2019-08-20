import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { RefreshIcon, CloseIcon } from "../Icons/Icons";
import "./Toast.css";

const Toast = ({ extShow, text, leftBtn }) => {
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
              className="close-btn"
              onClick={() => window.location.reload()}
            >
              <RefreshIcon />
            </button>
          )}
          <button className="close-btn" onClick={() => setShow(false)}>
            <CloseIcon />
          </button>
        </span>
      </div>
    </CSSTransition>
  );
};

export default Toast;
