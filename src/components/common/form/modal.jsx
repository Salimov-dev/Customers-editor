import React from "react";

const Modal = ({ header, component, id }) => {
  return (
    <div className="modal fade" id={id} tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
         
            <h5 className="modal-title p-3">{header}</h5>
        
          <div className="modal-body">{component}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
