import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="h-100 bg-white">
      <div className="container">
        <div className="row m-auto w-50">
          <img
            src="/img/404.png"
            alt="not found"
            style={{ width: "100%", height: "100%", display: "block" }}
          />
          <Link
            to="/"
            className="btn btn-dark btn-lg p-3 rounded-3 fw-bold m-auto w-lg-25 w-md-25 w-sm-50 my-5"
          >
            Back Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
