import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Toast from "../Basic/Toast/Toast";

const OfflineToast = ({ sWPromise, closeAction }) => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [leftBtn, setLeftBtn] = useState(false);

  useEffect(() => {
    closeAction();
    sWPromise.then(res => {
      const isUpdate = res.type === "UPDATE";
      const isCached = res.type === "CACHED";
      if (isUpdate) setLeftBtn(true);
      setShow(isCached || isUpdate);
      setText(res.text);
      console.log("asd", isCached, "asd", isUpdate);

      if (!isCached && !isUpdate) closeAction();
    });
  }, [sWPromise, closeAction]);

  return (
    <Toast
      text={text}
      extShow={show}
      leftBtn={leftBtn}
      closeAction={closeAction}
    />
  );
};

OfflineToast.propTypes = {
  sWPromise: PropTypes.object.isRequired
};

export default OfflineToast;
