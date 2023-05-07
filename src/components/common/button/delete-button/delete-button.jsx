import React from "react";
import "./delete-button.css";

const DeleteButton = ({ onClick }) => {
  return (
    <button className="delete-button" onClick={onClick}>
      <i className="bi bi-x-square delete-button__icon"></i>
    </button>
  );
};

export default DeleteButton;
