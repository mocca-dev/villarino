import React from "react";
import PropTypes from "prop-types";

const Current = ({ isCurrent, noTimeTables }) =>
  isCurrent &&
  !noTimeTables && <div className="next-to-arrive">Próximo en llegar</div>;

Current.propTypes = {
  isCurrent: PropTypes.bool.isRequired,
  noTimeTables: PropTypes.bool
};

export default Current;
