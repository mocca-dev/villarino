/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

const UseVisibilityChange = () => {
  const [isVisible, setIsVisible] = useState(null);
  useEffect(() => {
    document.addEventListener(
      "visibilitychange",
      function() {
        setIsVisible(!document.hidden);
      },
      false
    );
  }, []);

  return isVisible;
};

export default UseVisibilityChange;
