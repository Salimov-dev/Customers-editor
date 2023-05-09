import React from "react";

const Button = ({
  text,
  type = "text",
  styleBtn,
  disabled,
  onClick,
  dataBsToggle,
  dataBsTarget,
  dataBsDismiss,
}) => {
  return (
    <button
      type={type}
      className={"btn btn-" + styleBtn}
      disabled={disabled}
      onClick={onClick}
      data-bs-toggle={dataBsToggle}
      data-bs-target={dataBsTarget}
      data-bs-dismiss={dataBsDismiss}
    >
      {text}
    </button>
  );
};

export default Button;
