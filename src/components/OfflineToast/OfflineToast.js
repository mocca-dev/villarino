import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Toast from "../Toast/Toast";

const OfflineToast = ({ sWPromise }) => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState(false);
  const [actionLeft, setActionLeft] = useState(null);

  useEffect(() => {
    sWPromise.then(res => {
      const isUpdate = res.type === "UPDATE";
      const isCached = res.type === "CACHED";
      setShow(isCached || isUpdate);
      setText(res.text);
      if (isUpdate)
        setActionLeft(() => {
          window.location.reload();
        });
    });
  }, [sWPromise]);

  return <Toast text={text} extShow={show} actionLeft={actionLeft} />;
};

OfflineToast.propTypes = {
  sWPromise: PropTypes.object.isRequired
};

export default OfflineToast;
