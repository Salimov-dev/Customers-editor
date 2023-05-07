import React from "react";

const SearchField = ({ placeholder, width, onChange, value, name, icon }) => {
  return (
    <div className="input-group mb-2" style={{ width: width }}>
      {icon && <span className="input-group-text">{icon}</span>}
      <input
        type="text"
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />
    </div>
  );
};

export default SearchField;
