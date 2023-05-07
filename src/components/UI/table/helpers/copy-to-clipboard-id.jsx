import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const CopyToClipboardId = ({ id }) => {
  return (
    <>
      <CopyToClipboard text={id}>
        <i className="bi bi-clipboard" role="button" > </i>
      </CopyToClipboard>
      {id}
    </>
  );
};

export default CopyToClipboardId;
