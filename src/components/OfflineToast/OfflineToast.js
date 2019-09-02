import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Toast from "../Basic/Toast/Toast";

const OfflineToast = ({ sWPromise, closeAction, setShowUpdateBadge }) => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    closeAction();
    sWPromise.then(res => {
      const isUpdate = res.type === "UPDATE";
      const isCached = res.type === "CACHED";

      setShow(isCached || isUpdate);
      setText(res.text);
      setShowUpdateBadge(true);
      if (!isCached && !isUpdate) closeAction();
    });
  }, [sWPromise, closeAction, setShowUpdateBadge]);

  return <Toast text={text} extShow={show} closeAction={closeAction} />;
};

OfflineToast.propTypes = {
  sWPromise: PropTypes.object.isRequired
};

export default OfflineToast;
