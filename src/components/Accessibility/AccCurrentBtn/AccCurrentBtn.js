import React, { useEffect, useState } from "react";

import TimeItem from "./../../Basic/TimeTableList/TImeItem/TimeItem";
import Speech from "./../../../service/speech-service";
import NoData from "../../Basic/TimeTableList/NoData/NoData";

const clickCurrentHandler = (setForceDispatch, setForced) => {
  setForceDispatch();
  setForced(true);
};

const AccCurrentBtn = ({ currentTime, setForceDispatch, textData, voice }) => {
  const [forced, setForced] = useState(false);
  useEffect(() => {
    if (currentTime && currentTime.data && forced) {
      let text = `El próximo en llegar pasará a las ${currentTime &&
        currentTime.data} por ${
        textData.fromOptions[textData.from].label
      } hacia ${textData.toOptions[textData.to ? 1 : 0].label}`;

      if (currentTime.data && currentTime.data.includes("datos locales")) {
        text = currentTime.data;
      }

      if (voice) Speech(text);
      setForced(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTime]);

  return (
    <button
      className="acc-current-btn"
      onClick={() => clickCurrentHandler(setForceDispatch, setForced)}
    >
      {currentTime &&
      currentTime.data &&
      currentTime.data.includes("datos locales") ? (
        <NoData
          timeTable={currentTime.data}
          setForceDispatch={setForceDispatch}
          accessibility={true}
        />
      ) : (
        <TimeItem
          i={currentTime && currentTime.index}
          current={currentTime && currentTime.index}
          noTimetables={false}
          holiday={false}
          timetable={currentTime && currentTime.data}
        />
      )}
    </button>
  );
};

export default AccCurrentBtn;
