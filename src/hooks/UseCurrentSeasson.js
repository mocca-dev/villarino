/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

const getCurrentSeasson = (month, day) => {
  if (month === 1) {
    return "summerTime";
  } else if (month === 7) {
    return day >= 22 && day <= 31 ? "winterTime" : "normalTime";
  } else if (month === 8) {
    return day >= 1 && day <= 2 ? "winterTime" : "normalTime";
  } else {
    return "normalTime";
  }
};

const useCurrentSeasson = () => {
  const [currentSeasson, setCurrentSeasson] = useState("");

  useEffect(() => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    setCurrentSeasson(getCurrentSeasson(month, day));
  }, [setCurrentSeasson]);

  return currentSeasson ? currentSeasson : "normalTime";
};

export default useCurrentSeasson;
