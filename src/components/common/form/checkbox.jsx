import React from "react";

const CheckBox = ({ id, onSelectedCustomers }) => {

  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        id={id}
        role="button"
        onClick={() => onSelectedCustomers(id)}
      />
    </div>
  );
};

export default CheckBox;
