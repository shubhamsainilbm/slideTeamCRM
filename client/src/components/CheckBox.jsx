import React from "react";

const CheckBox = ({ handleCheckBoxChange, labelName, iD, value, name }) => {
  return (
    <>
      <table>
        <div className="form-check ms-2">
          <input
            className="form-check-input shadow-none"
            type="checkbox"
            name={name}
            value={value}
            id={iD}
            onClick={handleCheckBoxChange}
          />
          <label htmlFor={iD}>{labelName}</label>
        </div>
      </table>
    </>
  );
};

export default CheckBox;
