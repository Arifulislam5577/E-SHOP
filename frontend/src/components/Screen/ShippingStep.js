import React from "react";

const ShippingStep = ({ step1, step2, step3 }) => {
  return (
    <>
      <div className="d-flex align-items-center justify-content-between text-center w-75 m-auto text-uppercase">
        <h3>Shipping</h3>
        <h3>Place Order</h3>
        <h3>Payment</h3>
      </div>
      <div className="progress w-75 m-auto">
        <div
          className="progress-bar bg-warning"
          role="progressbar"
          style={{
            width: `${
              step1 ? "33.33%" : step2 ? "66.33%" : step3 ? "100%" : "25%"
            }`,
          }}
          aria-valuenow="75"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </>
  );
};

export default ShippingStep;
