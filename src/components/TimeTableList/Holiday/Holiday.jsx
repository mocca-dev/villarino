import React from "react";

const Holiday = ({ i, current, holiday }) =>
  i === current &&
  holiday && (
    <div className="holiday-container">
      Horarios por feriado: {holiday.motivo}
    </div>
  );

export default Holiday;
