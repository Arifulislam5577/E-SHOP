import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const CheckoutScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const formatNumber = (num) => {
    return ((num * 100) / 100).toFixed(2);
  };

  cart.totalItems = formatNumber(
    cartItems.reduce((acc, item) => acc + item.qty * 1, 0)
  );
  cart.totalItemsPrice = formatNumber(
    cartItems.reduce((acc, item) => acc + item.qty * 1 * item.price, 0)
  );
  cart.taxPrice = formatNumber(
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0) * 0.1
  );
  cart.shippingPrice = formatNumber(cart.totalItemsPrice > 100 ? 0 : 20);
  cart.totalPrice = formatNumber(
    cart.totalItemsPrice * 1 + cart.taxPrice * 1 + cart.shippingPrice * 1
  );

  const handleSubmitHandler = () => {
    localStorage.setItem("allCalculations", JSON.stringify(cart));
    navigate("/shipping");
  };
  return (
    <section className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8">
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
                        <strong>
                          <Link
                            to={`/product/${_id}`}
                            className="text-decoration-none text-warning"
                          >
                            {name.slice(0, 50)}...
                          </Link>
                        </strong>
                      </td>
                      <td>
                        <strong>
                          ${price} x {qty} = ${price * (qty * 1)}
                        </strong>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
            <ul className="list-group rounded-0">
              <li className="list-group-item bg-black">
                <h3 className="text-center text-light text-uppercase">
                  Order Summary
                </h3>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <strong>Total Items</strong>
                <strong>{cart.totalItems}</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <strong>Tax</strong>
                <strong>${cart.taxPrice}</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <strong>Shipping</strong>
                <strong>${cart.shippingPrice}</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <strong>Total Items Price</strong>
                <strong>${cart.totalItemsPrice}</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <strong>Total Price</strong>
                <strong>${cart.totalPrice}</strong>
              </li>
              <li className="list-group-item ">
                <button
                  className="btn btn-dark w-100 rounded-0 btn-lg p-3 fw-bold text-light "
                  onClick={handleSubmitHandler}
                >
                  Shipping
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutScreen;
