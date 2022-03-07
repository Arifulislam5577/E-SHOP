import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ShippingStep from "./ShippingStep";

const PlaceOrder = () => {
  const shippingAddress = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : {};
  const allCalculations = localStorage.getItem("allCalculations")
    ? JSON.parse(localStorage.getItem("allCalculations"))
    : {};
  const { userInfo } = useSelector((state) => state.userLogIn);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const navigate = useNavigate();
  return (
    <section className="py-5">
      <div className="container">
        <ShippingStep className="mb-5" step2 />
        <div className="row mt-5">
          <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
            <h2 className="text-uppercase">Shipping Address</h2>
            <hr />

            <table className="table table-borderless">
              <tbody>
                <tr>
                  <td>
                    <h4>Name : </h4>
                  </td>
                  <td>
                    <h4>{userInfo.name}</h4>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h4>Email Address : </h4>
                  </td>
                  <td>
                    <h4>{userInfo.email}</h4>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h4>Address : </h4>
                  </td>
                  <td>
                    <h4>{shippingAddress.address}</h4>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h4>House No : </h4>
                  </td>
                  <td>
                    <h4>{shippingAddress.houseNumber}</h4>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h4>City : </h4>
                  </td>
                  <td>
                    <h4>{shippingAddress.city}</h4>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h4>Country : </h4>
                  </td>
                  <td>
                    <h4>{shippingAddress.country}</h4>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h4>Payment Method : </h4>
                  </td>
                  <td>
                    <h4>{shippingAddress.paymentmethod}</h4>
                  </td>
                </tr>
              </tbody>
            </table>
            <h2 className="text-uppercase">Your Product</h2>
            <hr />
            <table className="table table-borderless align-middle table-sm text-center">
              <tbody className="align-middle">
                {cartItems.map((product) => {
                  const { _id, img, price, qty, name } = product;
                  return (
                    <tr key={_id} className="align-middle">
                      <td>
                        <img src={img} alt={name} style={{ width: "5rem" }} />
                      </td>
                      <td>
                        <p>
                          <Link
                            to={`/product/${_id}`}
                            className="text-decoration-none text-warning"
                          >
                            {name.slice(0, 30)}...
                          </Link>
                        </p>
                      </td>
                      <td>
                        <p>
                          ${price} x {qty} = ${price * (qty * 1)}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
            <ul className="list-group rounded-0">
              <li className="list-group-item bg-black">
                <h3 className="text-center text-light text-uppercase">
                  Order Summary
                </h3>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <strong>Total Items</strong>
                <strong>{allCalculations.totalItems}</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <strong>Tax</strong>
                <strong>${allCalculations.taxPrice}</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <strong>Shipping</strong>
                <strong>${allCalculations.shippingPrice}</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <strong>Total Items Price</strong>
                <strong>${allCalculations.totalItemsPrice}</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <strong>Total Price</strong>
                <strong>${allCalculations.totalPrice}</strong>
              </li>
              <li className="list-group-item ">
                <button
                  className="btn btn-dark w-100 rounded-0 btn-lg p-3 fw-bold text-light "
                  onClick={() => navigate("/payment")}
                >
                  continue
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlaceOrder;
