import React from "react";
import PropTypes from "prop-types";

const Current = ({ i, current, noTimeTables }) =>
  i === current &&
  !noTimeTables && <div className="next-to-arrive">Próximo en llegar</div>;

Current.propTypes = {
  i: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  noTimeTables: PropTypes.bool
};

export default Current;
