/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsCart4, BsSearch } from "react-icons/bs";
import { GoSignIn } from "react-icons/go";
import { BiUserCircle } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { BsTrash } from "react-icons/bs";
import { Slide } from "react-toastify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addToCartAction,
  removeFromCart,
} from "../redux/actions/productAction";

const Navbar = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userLogIn);

  const notify = () =>
    toast.dark("Product Delete!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const deleteItemHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const style = {
    backgroundColor: "#000",
    right: "0",
    bottom: "0",
  };
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const handleSubmitKeyword = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate(`/`);
    }
  };
  return (
    <>
      <nav className=" navbar-light bg-black py-3 sticky-top">
        <div className="container">
          <div className="nav">
            <h2 className="fw-bolder ">
              <Link
                to="/"
                className="fw-bolder text-warning text-decoration-none "
              >
                E-SHOP
              </Link>
            </h2>

            <div className="input-group m-auto w-100">
              <form onSubmit={handleSubmitKeyword} className="d-flex w-100">
                <input
                  type="text"
                  className="form-control p-3 fs-5 rounded-0 w-100 fw-bold bg-light"
                  placeholder="Search product"
                  aria-describedby="basic-addon2"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />

                <button
                  className="input-group-text px-4 bg-warning text-black fs-3 rounded-0"
                  id="basic-addon2"
                >
                  <BsSearch />
                </button>
              </form>
            </div>

            <div className="allbuttons">
              <a
                href="#"
                className={`btn ${
                  cartItems.length > 0 ? "btn-warning" : "btn-dark"
                } rounded-1 text-white me-3`}
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight"
              >
                <BsCart4 className="nav-icon" />
              </a>

              <Link
                to="/signup"
                className="btn btn-dark rounded-1 text-white me-3"
                title="SignUp"
              >
                <GoSignIn className="nav-icon" />
              </Link>
              {userInfo && (
                <Link
                  to="/profile"
                  className="btn btn-warning
               rounded-1 text-white me-3"
                  title="Your Profile"
                >
                  <BiUserCircle className="nav-icon" />
                </Link>
              )}
              <a
                href="#"
                className="btn btn-dark rounded-1 text-white me-3"
                title="Menu"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight1"
                aria-controls="offcanvasRight"
              >
                <GiHamburgerMenu className="nav-icon" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div
        className="offcanvas offcanvas-end w-lg-25 w-md-50 w-sm-75  bg-light"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h1 id="offcanvasRightLabel" className="fw-bold text-warning ms-4">
            E-SHOP
          </h1>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body overflow-scroll">
          <ToastContainer
            position="top-right"
            autoClose={2000}
            transition={Slide}
          />
          {cartItems.length ? (
            <table className="table table-borderless align-middle table-sm text-center">
              <tbody className="align-middle">
                {cartItems.map((product) => {
                  const { _id, img, price, qty, stock } = product;
                  return (
                    <tr key={_id} className="align-middle">
                      <td>
                        <img
                          src={img}
                          alt={product.name}
                          style={{ width: "5rem" }}
                        />
                      </td>
                      <td>
                        <strong>${price}</strong>
                      </td>
                      <td>
                        <select
                          className="form-select fw-bold fs-5 w-50 m-auto"
                          aria-label="Default select example"
                          value={qty}
                          onChange={(e) =>
                            dispatch(addToCartAction(_id, e.target.value))
                          }
                        >
                          {[...Array(stock).keys()].map((x) => {
                            return (
                              <option
                                value={x + 1}
                                key={x + 1}
                                className="fs-5 fw-bold"
                              >
                                {x + 1}
                              </option>
                            );
                          })}
                        </select>
                      </td>
                      <td>
                        <BsTrash
                          style={{ color: "red", cursor: "pointer" }}
                          onClick={() => {
                            deleteItemHandler(_id);
                            notify();
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <h1 className="my-5 p-3 bg-dark text-light">Cart Is Empty</h1>
          )}
        </div>
        <footer
          className="text-light w-100 p-5 position-absolute mt-auto"
          style={style}
        >
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex flex-column">
              <strong>
                Price : $
                {cartItems
                  .reduce((acc, item) => acc + item.price * (item.qty * 1), 0)
                  .toFixed(2)}
              </strong>

              <strong>
                Items :&nbsp;
                {cartItems.reduce((acc, item) => acc + item.qty * 1, 0)}
              </strong>
            </div>
            <button
              onClick={() => navigate("/checkout")}
              className="btn btn-warning btn-lg rounded-0 px-5 py-3 text-white fw-bold"
              disabled={cartItems.length === 0}
            >
              Checkout
            </button>
          </div>
        </footer>
      </div>
      <div
        className="offcanvas offcanvas-end w-lg-25 w-md-50 w-sm-75  bg-light"
        tabIndex="-1"
        id="offcanvasRight1"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h2 className="fw-bold text-warning">E-SHOP</h2>

          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="category">
            <ul>
              <li>
                <h2 className="fw-bold">Category</h2>
                <hr />
              </li>
              <li>
                <Link to="/category/laptop">Laptop</Link>
              </li>
              <li>
                <Link to="/category/android">Android</Link>
              </li>
              <li>
                <Link to="/category/camera">Camera</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
