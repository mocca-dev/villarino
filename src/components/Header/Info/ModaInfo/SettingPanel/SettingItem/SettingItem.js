import React from "react";
import PropTypes from "prop-types";

import "./SettingItem.css";
import SharedBtn from "../../InfoPanel/SharedBtn/SharedBtn";

const SettingItem = ({ data }) => {
  const { title, detail, action, disabled, value } = data;
  return (
    <div
      className={
        disabled ? "setting-item-container disabled" : "setting-item-container"
      }
    >
      <h4>{title}</h4>
      <div>
        <span>{detail}</span>
        {action.type === "check" && (
          <div>
            <label className="check-container">
              <input
                type="checkbox"
                checked={value}
                disabled={disabled}
                onChange={() => action.payload(!value)}
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
  data: PropTypes.object.isRequired
};

export default SettingItem;
