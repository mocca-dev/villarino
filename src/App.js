import React, { useEffect, useReducer, useState } from "react";
import PropTypes from "prop-types";

import "./App.css";
import Header from "./components/Header/Header";
import OfflineToast from "./components/OfflineToast/OfflineToast";
import appReducer from "./reducer";
import Context from "./context";
import { fetchHoliday } from "./service";
import useCurrentSeasson from "./hooks/UseCurrentSeasson";
import useTimetables from "./hooks/UseTimetables";
import Accessibilty from "./components/Accessibility/Accessibility";
import UseCurrentTime from "./hooks/UseCurrentTime";
import Basic from "./components/Basic/Basic";
import InstallPrompt from "./components/InstallPrompt/InstallPrompt";
import UseVisibilityChange from "./hooks/UseVisibilityChange";

function App({ sWPromise }) {
  const [state, dispatch] = useReducer(appReducer, {
    fromOptions: [
      { value: 0, label: "Parque de Mayo" },
      { value: 1, label: "Plaza Rivadavia" },
      { value: 2, label: "Hospital Penna" },
      { value: 3, label: "Villa Arias" },
      { value: 4, label: "Terminal Punta Alta" }
    ],
    seassonOptions: [
      { value: "summerTime", label: "Verano" },
      { value: "winterTime", label: "Receso Invernal" },
      { value: "normalTime", label: "Resto del año" }
    ],
    timetables: [],
    fromToSelected: { from: "0", to: false },
    holidays: [],
    seassonSelected: "normalTime",
    online: true,
    speechSetting: { active: false, voice: true, velocity: 1 },
    autoSync: true
  });

  const [holiday, setHoliday] = useState(null);
  const [forceDispatch, setForceDispatch] = useState(false);
  const [showIOSToast, setShowIOSToast] = useState(false);
  const [showUpdateBadge, setShowUpdateBadge] = useState(false);
  const currentSeasson = useCurrentSeasson();
  const currentTime = UseCurrentTime(state.timetables);
  const isVisible = UseVisibilityChange();
  const timetables = useTimetables(
    state.fromToSelected,
    state.holidays,
    state.seassonSelected,
    state.online,
    forceDispatch
  );

  const findHolidayData = holidays => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const holidayData = holidays.find(
      date => date.dia === day && date.mes === month
    );

    setHoliday(holidayData === undefined ? null : holidayData);
  };

  useEffect(() => {
    let holidays = JSON.parse(localStorage.getItem("holidays"));
    if (holidays) {
      findHolidayData(holidays);
    } else {
      fetchHoliday().then(data => {
        findHolidayData(data);
      });
    }

    let speechSetting = JSON.parse(localStorage.getItem("speechSetting"));

    if (!!speechSetting) {
      dispatch({ type: "SET_SPEECH_SETTING", payload: speechSetting });
    }

    let autoSync = localStorage.getItem("autoSync");

    if (autoSync) {
      dispatch({ type: "SET_AUTO_SYNC", payload: JSON.parse(autoSync) });
    }

    let fromToSelected = JSON.parse(localStorage.getItem("fromToSelected"));

    if (!!fromToSelected) {
      dispatch({ type: "SET_TO", payload: fromToSelected.to });
      dispatch({ type: "SET_FROM", payload: fromToSelected.from.toString() });
    }

    let seassonSelected = localStorage.getItem("seassonSelected");

    if (!!seassonSelected) {
      dispatch({ type: "SET_SEASSON", payload: seassonSelected });
    }
  }, []);

  useEffect(() => {
    dispatch({ type: "SET_SEASSON", payload: currentSeasson });
  }, [currentSeasson]);

  useEffect(() => {
    localStorage.setItem(
      "fromToSelected",
      JSON.stringify(state.fromToSelected)
    );
    localStorage.setItem("seassonSelected", state.seassonSelected);
    dispatch({ type: "SET_TIMETABLES", payload: timetables });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.fromToSelected, state.seassonSelected, timetables]);

  useEffect(() => {
    const grumbeinAdded = state.fromOptions.some(option => option.value === 6);
    //Checking if it's 'resto del año', dia de semana and if grumbein isn't added
    //if then add grumbein
    if (
      currentTime &&
      state.seassonSelected === "normalTime" &&
      currentTime.dayName !== "Sábado" &&
      currentTime.dayName !== "Domingo" &&
      !grumbeinAdded &&
      !holiday
    ) {
      dispatch({
        type: "ADD_GRUMBEIN"
      });
    } else {
      //if not do the same code as before
      if (state.fromToSelected.to) {
        dispatch({
          type: "CHANGE_FROM_LABEL",
          payload: { value: 1, label: "Vieytes y Colón" }
        });

        if (
          !grumbeinAdded &&
          state.seassonSelected === "winterTime" &&
          (holiday || (currentTime && currentTime.dayName === "Domingo"))
        ) {
          dispatch({
            type: "ADD_GRUMBEIN"
          });
        } else if (
          !(
            currentTime &&
            currentTime.data &&
            state.seassonSelected === "normalTime" &&
            currentTime.dayName !== "Sábado" &&
            currentTime.dayName !== "Domingo" &&
            !holiday
          )
        ) {
          dispatch({
            type: "DEL_GRUMBEIN"
          });
        }

        if (state.fromToSelected.from === "0") {
          dispatch({ type: "SET_FROM", payload: "4" });
        }
      } else {
        dispatch({
          type: "CHANGE_FROM_LABEL",
          payload: { value: 1, label: "Plaza Rivadavia" }
        });
        //Checking if it's 'resto del año', dia de semana and if grumbein isn't added
        //if then add grumbein
        if (
          !(
            currentTime &&
            currentTime.data &&
            state.seassonSelected === "normalTime" &&
            currentTime.dayName !== "Sábado" &&
            currentTime.dayName !== "Domingo" &&
            !holiday
          )
        )
          dispatch({
            type: "DEL_GRUMBEIN"
          });

        if (state.fromToSelected.from === "4") {
          dispatch({ type: "SET_FROM", payload: "0" });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.fromToSelected.to, state.seassonSelected, holiday]);

  useEffect(() => {
    localStorage.setItem("speechSetting", JSON.stringify(state.speechSetting));
  }, [state.speechSetting]);

  useEffect(() => {
    localStorage.setItem("autoSync", JSON.stringify(state.autoSync));
  }, [state.autoSync]);

  useEffect(() => {
    if (state.autoSync && isVisible) setForceDispatch(!forceDispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <div className="app-container">
        <Header
          dispatch={dispatch}
          isBasic={!state.speechSetting.active}
          showUpdateBadge={showUpdateBadge}
        />
        <OfflineToast
          sWPromise={sWPromise}
          closeAction={() => setShowIOSToast(true)}
          setShowUpdateBadge={val => setShowUpdateBadge(val)}
        />
        <InstallPrompt extShow={showIOSToast} />
        {state.speechSetting.active ? (
          <Accessibilty
            currentTime={currentTime}
            setForceDispatch={() => setForceDispatch(!forceDispatch)}
          />
        ) : (
          <Basic
            holiday={holiday}
            setForceDispatch={() => setForceDispatch(!forceDispatch)}
            current={currentTime && currentTime}
          />
        )}
      </div>
    </Context.Provider>
  );
}

App.propTypes = {
  sWPromise: PropTypes.object.isRequired
};

export default App;
