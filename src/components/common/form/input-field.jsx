import React, { forwardRef } from "react";

const InputField = forwardRef(
  (
    { type = "text", label, placeholder, name, register, error, errorMessage },
    forwardRef
  ) => {
    return (
      <div className="mb-2">
        <label htmlFor={name} className="form-label fw-bold lh-lg">
          {label}
        </label>
        <input
          {...register(name)}
          className={error ? "form-control is-invalid" : "form-control"}
          type={type}
          id={name}
          placeholder={placeholder}
          ref={forwardRef}
        />
        <div className="invalid-feedback">{errorMessage}</div>
      </div>
    );
  }
);

export default InputField;