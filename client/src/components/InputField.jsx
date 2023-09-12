import React from "react";

const InputField = ({
  type,
  name,
  placeholder,
  handleChange,
  value,
  cssClass,
  label,
  isRequired,
  disabled,
  accept,
  labelNone,
  pattern,
  minlength,
  maxlength,
}) => {
  return (
    <div className="form__box mb-3">
      <label
        htmlFor="basic-url"
        className="form-label"
        style={{ display: `${labelNone}` }}
      >
        {label} {isRequired && <span style={{ color: "red" }}>*</span>}
      </label>
      <div className="input-group p-0">
        <input
          type={type}
          placeholder={placeholder}
          onChange={handleChange}
          name={name}
          value={value}
          className={`${cssClass} form-control shadow-none`}
          required={isRequired ? true : false}
          disabled={disabled}
          accept={accept}
          pattern={pattern}
          minlength={minlength}
          maxlength={maxlength}
        />
      </div>
    </div>
  );
};

export default InputField;
