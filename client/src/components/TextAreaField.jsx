import React from "react";

const TextAreaField = ({
  name,
  placeholder,
  handleChange,
  value,
  cssClass,
  label,
  isRequired,
  rows,
}) => {
  return (
    <div className="form__box mb-3">
      <label htmlFor="basic-url" className="form-label">
        {label} {isRequired && <span style={{ color: "red" }}>*</span>}
      </label>
      <div className="input-group p-0">
        <textarea
          placeholder={placeholder}
          onChange={handleChange}
          name={name}
          value={value}
          className={`${cssClass} form-control shadow-none`}
          required={isRequired ? true : false}
          rows={rows}
        />
      </div>
    </div>
  );
};

export default TextAreaField;
