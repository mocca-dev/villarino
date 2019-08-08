import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";

import "./OfflineToast.css";

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
          {showRefresh && (
            <button
              className="close-btn"
              onClick={() => window.location.reload()}
            >
              R
            </button>
          )}
          <button className="close-btn" onClick={() => setShow(false)}>
            X
          </button>
        </div>
      </CSSTransition>
    </>
  );
};

export default OfflineToast;
