import React from "react";
import PropTypes from "prop-types";

const Holiday = ({ isCurrent, holiday }) =>
  isCurrent &&
  holiday && (
    <div className="holiday-container">
      Horarios por feriado: {holiday.motivo}
    </div>
  );

Holiday.propTypes = {
  isCurrent: PropTypes.bool.isRequired,
  holiday: PropTypes.bool
};

export default Holiday;
