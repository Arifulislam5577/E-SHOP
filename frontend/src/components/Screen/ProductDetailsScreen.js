import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Loader";
import Message from "../Message";
import {
  addToCartAction,
  ProductDetailAction,
} from "../../redux/actions/productAction";
import Rating from "../Rating";

const ProductDetailsScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  const { _id, name, img, star, starCount, stock, price, features, category } =
    product;

  useEffect(() => {
    dispatch(ProductDetailAction(id));
  }, [dispatch, id]);

  const [qty, setQty] = useState(1);

  const notify = () => toast.success("Product add to cart");
  const addToCartHandler = () => {
    dispatch(addToCartAction(_id, qty));
  };
  return (
    <section className="py-5">
      <div className="container">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message />
        ) : (
          <>
            <div className="row w-25 w-sm-100 w-md-75 mb-5">
              <button
                className="btn btn-outline-dark btn-lg rounded-0 p-lg-3 p-md-2 p-sm-0 w-50 w-md-100 w-sm-100 fw-bold"
                onClick={() => navigate(-1)}
              >
                Go Back
              </button>
            </div>
            <div className="row">
              <div className="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
                <img src={img} alt={name} className="img-responsive w-100" />
              </div>
              <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <h4 className="card-title mb-3">{name}</h4>
                <h4 className="mb-3">Price : ${price}</h4>
                <hr />
                <h4 className="mb-3 text-capitalize">Category : {category}</h4>
                <hr />
                <div className="d-flex align-items-center">
                  <Rating rating={star} /> ({starCount})
                </div>
                <hr />
                <table className="table table-borderless">
                  <tbody>
                    {features?.map((feature, index) => {
                      return (
                        <tr key={index}>
                          <td>{feature.description}</td>
                          <td>{feature.value}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                <ul className="list-group rounded-0 bg-light">
                  <li className="list-group-item  bg-dark text-center text-light text-uppercase">
                    <h2>Product Summary</h2>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <strong>Price</strong>
                    <strong>${price}</strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <strong>Stock</strong>
                    <strong>{stock ? "In Stock" : "Out Of Stock"}</strong>
                  </li>
                  {stock && (
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <strong>Quantity</strong>
                      <select
                        className="form-select w-25"
                        aria-label="Default select example"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(stock).keys()].map((x) => {
                          return (
                            <option
                              value={x + 1}
                              key={x + 1}
                              className="w-25 fs-5"
                            >
                              {x + 1}
                            </option>
                          );
                        })}
                      </select>
                    </li>
                  )}
                  <li className="list-group-item">
                    <button
                      className="btn btn-dark btn-lg rounded-0 w-100 p-3 fw-bold"
                      disabled={stock === 0}
                      onClick={() => {
                        notify();
                        addToCartHandler();
                      }}
                    >
                      ADD TO CART
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <ToastContainer autoClose={2000} />
          </>
        )}
      </div>
    </section>
  );
};

export default ProductDetailsScreen;
