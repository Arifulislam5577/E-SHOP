import React from "react";
import Rating from "../Rating";
import { Link } from "react-router-dom";
const ProductScreen = ({ product }) => {
  const { _id, img, name, price, star, starCount, stock } = product;
  return (
    <div className="col">
      <div className="card mb-3 p-4 h-100">
        <div className="row g-0 ">
          <div className="col-md-4">
            <Link to={`/product/${_id}`}>
              <img src={img} className="card-img-top" alt={name} />
            </Link>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <Link
                className="card-title text-decoration-none text-dark"
                to={`/product/${_id}`}
              >
                {name}
              </Link>
              <h4 className="mt-4">${price}</h4>
              <h4 className="">
                Status : {stock ? "In Stock" : "Out Of Stock"}
              </h4>

              <div className="d-flex align-items-center">
                <Rating rating={star} />({starCount})
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
