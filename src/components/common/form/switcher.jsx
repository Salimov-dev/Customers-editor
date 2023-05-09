import React, { forwardRef } from "react";

const Switcher = forwardRef(
  ({ label, name, register, checked, onClick, disabled }, forwardRef) => {
    return (
      <div className="form-check form-switch mb-2">
        <label htmlFor={name} className="form-check-label">
          {label}
        </label>
        <input
          {...register(name)}
          className="form-check-input"
          type="checkbox"
          id={name}
          ref={forwardRef}
          checked={checked}
          disabled={disabled}
          onClick={onClick}
        />
      </div>
    );
  }
);

export default Switcher;
