import React, { useState } from "react";
import PropTypes from "prop-types";

import "./SettingItem.css";
import SharedBtn from "../../InfoPanel/SharedBtn/SharedBtn";

const SettingItem = ({ title, detail, action }) => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="setting-item-container">
      <h4>{title}</h4>
      <div>
        <span> {detail}</span>{" "}
        {action.type === "check" && (
          <div>
            <label className="check-container">
              <input
                type="checkbox"
                checked={checked}
                onChange={e => {
                  setChecked(!checked);
                  action.payload(!checked);
                }}
              />
              <span className="checkmark" />
            </label>
          </div>
        )}
        {action.type === "icon" && <SharedBtn />}
      </div>
    </div>
  );
};

SettingItem.propTypes = {
  title: PropTypes.string.isRequired,
  detail: PropTypes.string.isRequired,
  action: PropTypes.object.isRequired
};

export default SettingItem;
