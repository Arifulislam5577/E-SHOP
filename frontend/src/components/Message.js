import React from "react";

const Message = (props) => {
  return (
    <div className={`alert p-3 alert-${props.variant}`} role="alert">
      <h2 className="fs-3 text-capitalize">{props.message}</h2>
    </div>
  );
};

export default Message;
