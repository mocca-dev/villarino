import React from "react";
import PropTypes from "prop-types";

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

Basic.propTypes = {
  holiday: PropTypes.object,
  setForceDispatch: PropTypes.func.isRequired,
  current: PropTypes.object
};

export default Basic;
