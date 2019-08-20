import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Toast from "../Basic/Toast/Toast";

const OfflineToast = ({ sWPromise }) => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [leftBtn, setLeftBtn] = useState(false);

  useEffect(() => {
    sWPromise.then(res => {
      const isUpdate = res.type === "UPDATE";
      const isCached = res.type === "CACHED";
      if (isUpdate) setLeftBtn(true);
      setShow(isCached || isUpdate);
      setText(res.text);
    });
  }, [sWPromise]);

  return <Toast text={text} extShow={show} leftBtn={leftBtn} />;
};

OfflineToast.propTypes = {
  sWPromise: PropTypes.object.isRequired
};

export default OfflineToast;
