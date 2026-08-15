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
      // The extra arrow matters: a bare function passed to a setter is treated
      // as an updater and would run immediately instead of being stored.
      if (isUpdate) setActionLeft(() => res.update);
    });
  }, [sWPromise]);

  return <Toast text={text} extShow={show} actionLeft={actionLeft} />;
};

OfflineToast.propTypes = {
  sWPromise: PropTypes.object.isRequired
};

export default OfflineToast;
