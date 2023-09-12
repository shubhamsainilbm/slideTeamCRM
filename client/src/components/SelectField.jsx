import React from "react";

const SelectField = ({
  label,
  isRequired,
  mapsItem,
  handleChange,
  cssClass,
  value,
}) => {
  return (
    <div className={`select_box mb-3 ${cssClass}`}>
      <label htmlFor="basic-url" className="form-label">
        {label} {isRequired && <span style={{ color: "red" }}>*</span>}
      </label>
      <select
        className="form-select shadow-none"
        value={value}
        required={isRequired ? true : false}
        onChange={handleChange}
      >
        <option defaultValue selected disabled hidden>
          Choose here
        </option>
        {mapsItem?.map((item) => {
          return (
            <option value={item} key={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectField;
