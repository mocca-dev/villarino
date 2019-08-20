import React from "react";
import FromDropdown from "./FromDropdown/FromDropdown";
import ToDropdown from "./ToDropdown/ToDropdown";
import TimeTableList from "./TimeTableList/TimeTableList";

const Basic = ({ holiday, setForceDispatch, current }) => {
  return (
    <span>
      <FromDropdown />
      <ToDropdown />
      <TimeTableList
        holiday={holiday}
        setForceDispatch={setForceDispatch}
        current={current}
      />
    </span>
  );
};

export default Basic;
