import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ShippingStep from "./ShippingStep";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [paymentmethod, setPaymentmethod] = useState("paypal");

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/");
    }
  }, [navigate, cartItems]);

  const handleSubmitHandler = (e) => {
    e.preventDefault();
    cart.address = address;
    cart.houseNumber = houseNumber;
    cart.city = city;
    cart.country = country;
    cart.paymentmethod = paymentmethod;

    localStorage.setItem("cart", JSON.stringify(cart));

    if (address && houseNumber && city && country && paymentmethod) {
      navigate("/placeorder");
    }
  };

  return (
    <section className="my-5 ">
      <div className="container">
        <ShippingStep className="mb-5" step1 />
        <form
          className="m-auto shadow p-5 mt-5 form"
          onSubmit={handleSubmitHandler}
        >
          <div className="col-12 mb-4 mt-5">
            <input
              type="text"
              className="form-control p-3 rounded-0 fs-5"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="col-12  mb-4">
            <input
              type="text"
              className="form-control p-3 rounded-0 fs-5"
              placeholder="House Number"
              value={houseNumber}
              onChange={(e) => setHouseNumber(e.target.value)}
              required
            />
          </div>
          <div className="col-12  mb-4">
            <input
              type="text"
              className="form-control p-3 rounded-0 fs-5"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>

          <div className="col-12  mb-4">
            <input
              type="text"
              className="form-control p-3 rounded-0 fs-5"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
          <div className="col-12  mb-4">
            <select
              className="form-select form-control p-3 rounded-0 fs-5"
              value={paymentmethod}
              onChange={(e) => setPaymentmethod(e.target.value)}
              aria-label="Default select example"
            >
              <option value="paypal">Paypal</option>
              <option value="stripe">Stripe</option>
            </select>
          </div>
          <button
            type="submit"
            className="btn btn-dark btn-lg p-3 px-5 fs-5 rounded-0  w-100"
          >
            continue
          </button>
        </form>
      </div>
    </section>
  );
};

export default ShippingScreen;
