import React from "react";
import "./remove-new-field.css";

const RemoveNewField = ({ onClick, text }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="d-flex justify-content-center align-items-center text-nowrap remove-new-field rounded h-25"
    >
      <i className="bi bi-dash-lg remove-new-field__icon"></i>
      {text}
    </button>
  );
};

export default RemoveNewField;
