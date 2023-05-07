import React from "react";
import "./add-new-field.css";

const AddNewField = ({ onClick, text }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="d-flex justify-content-center align-items-center add-new-field rounded mb-3"
    >
      <i className="bi bi-plus-lg add-new-field__icon"></i>

      {text}
    </button>
  );
};

export default AddNewField;
