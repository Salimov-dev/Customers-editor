import React, { forwardRef } from "react";
import RemoveNewField from "../button/remove-new-field/remove-new-field";

const InputFieldRemovable = forwardRef(
  (
    {
      type = "text",
      label,
      name,
      placeholder,
      register,
      fields,
      field,
      validateOptions,
      error,
      errorMessage,
      index,
      onClick,
    },
    forwardRef
  ) => {
    return (
      <>
        <div className="d-flex justify-content-start w-100">
          <div className="w-50">
            <label htmlFor={name} className="form-label fw-bold lh-lg">
              {label}
            </label>
            <input
              {...register(`${fields}.${index}.${field}`, validateOptions)}
              className={error ? "form-control is-invalid" : "form-control"}
              type={type}
              id={name}
              placeholder={placeholder}
              ref={forwardRef}
            />
            <div className="invalid-feedback">{errorMessage}</div>
          </div>
          {index > 0 && (
            <RemoveNewField onClick={onClick} text="Удалить Email" />
          )}
        </div>
        <hr />
      </>
    );
  }
);

export default InputFieldRemovable;
