import React, { useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { loginActions } from "../../redux/actions/userAction";
import Loader from "../Loader";
import Message from "../Message";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginScreen = () => {
  const navigate = useNavigate();
  const { loading, error, userInfo } = useSelector((state) => state.userLogIn);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const notify = () =>
    toast.success("Login successfull😊", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const handleSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(loginActions(email, password));
    setTimeout(() => {
      if (location.state?.from) {
        navigate(location.state.from.pathname);
      }
    }, 2000);
  };

  return (
    <section className="my-5 ">
      <div className="container">
        <form className="m-auto shadow p-5 form" onSubmit={handleSubmitHandler}>
          {error && <Message variant="danger" message={error} />}
          {loading && <Loader />}
          <ToastContainer />
          <div className="m-auto w-100 text-center">
            <BiUserCircle
              className="m-auto text-center text-warning"
              style={{ fontSize: "5rem" }}
            />
          </div>
          <div className="col-12 mb-4 mt-5">
            <input
              type="email"
              className="form-control p-3 rounded-0 fs-5"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="col-12  mb-4">
            <input
              type="password"
              className="form-control p-3 rounded-0 fs-5"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-dark btn-lg p-3 px-5 fs-5 rounded-0 mb-5 w-100"
            onClick={() => userInfo && notify()}
          >
            Login In
          </button>
          <p>
            Create a new account?&nbsp;
            <Link to="/signup" className="text-decoration-none ">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default LoginScreen;
