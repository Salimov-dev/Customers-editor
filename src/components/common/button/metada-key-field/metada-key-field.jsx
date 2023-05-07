import React, { forwardRef } from "react";

const MetadaKeyField = forwardRef(
  (
    {
      type = "text",
      name,
      placeholder,
      register,
      fields,
      field,
      validateOptions,
      errors,
      index,
    },
    forwardRef
  ) => {
    return (
      <>
        <div className="d-flex justify-content-start w-100">

            <input
              {...register(`${fields}.${index}.${field}`, validateOptions)}
              className={
                errors?.name?.message
                  ? "form-control is-invalid"
                  : "form-control"
              }
              type={type}
              id={name}
              placeholder={placeholder}
              ref={forwardRef}
            />

        </div>
      </>
    );
  }
);

export default MetadaKeyField;
