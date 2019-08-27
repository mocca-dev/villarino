import React from "react";
import PropTypes from "prop-types";

const Holiday = ({ i, current, holiday }) =>
  i === current &&
  holiday && (
    <div className="holiday-container">
      Horarios por feriado: {holiday.motivo}
    </div>
  );

Holiday.propTypes = {
  i: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  holiday: PropTypes.bool
};

export default Holiday;
