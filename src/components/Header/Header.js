import React from "react";

import "./Header.css";
import Info from "./Info/Info";

const Header = ({ dispatch, isBasic, showUpdateBadge }) => (
  <div className={"header-container" + (isBasic ? " basic" : "")}>
    <h2>Horarios de El Villarino - 319</h2>
    <Info dispatch={dispatch} showUpdateBadge={showUpdateBadge} />
  </div>
);

export default Header;
