import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";

import "./OfflineToast.css";
import { RefreshIcon, CloseIcon } from "../Icons/Icons";

const OfflineToast = ({ sWPromise }) => {
  const [show, setShow] = useState(false);
  const [showRefresh, setShowRefresh] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    sWPromise.then(res => {
      const isUpdate = res.type === "UPDATE";
      const isCached = res.type === "CACHED";
      setShow(isCached || isUpdate);
      setText(res.text);
      setShowRefresh(isUpdate);

      setInterval(() => {
        setShow(false);
      }, 7000);
    });
  }, [sWPromise]);

  return (
    <>
      <CSSTransition
        in={show}
        timeout={700}
        classNames="toast"
        unmountOnExit
        onEnter={() => {}}
        onExited={() => {}}
      >
        <div className="toast-container">
          <span>{text}</span>{" "}
          <span className="toast-btn-container">
            {showRefresh && (
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
    </>
  );
};

OfflineToast.propTypes = {
  sWPromise: PropTypes.object.isRequired
};

export default OfflineToast;
