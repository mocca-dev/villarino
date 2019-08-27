import React from "react";

import "./Header.css";
import Info from "./Info/Info";

const Header = ({ dispatch, isBasic }) => (
  <div className={"header-container" + (isBasic ? " basic" : "")}>
    <h2>Horarios de El Villarino - 319</h2>
    <Info dispatch={dispatch} />
  </div>
);

export default Header;
