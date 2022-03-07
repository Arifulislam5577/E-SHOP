import React, { useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signUpActions } from "../../redux/actions/userAction";
import Loader from "../Loader";
import Message from "../Message";
const SignUpScreen = () => {
  const { loading, error } = useSelector((state) => state.userSignUp);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(signUpActions(name, email, password));
    setTimeout(() => {
      if (location.state?.from) {
        navigate(location.state.from.pathname);
      } else {
        navigate("/");
      }
    }, 2000);
  };

  return (
    <section className="my-5 ">
      <div className="container">
        <form className="m-auto shadow p-5 form" onSubmit={handleSubmitHandler}>
          {error && <Message variant="danger" message={error} />}
          {loading && <Loader />}
          <div className="m-auto w-100 text-center">
            <BiUserCircle
              className="m-auto text-center text-warning"
              style={{ fontSize: "5rem" }}
            />
          </div>
          <div className="col-12 mb-4 mt-5">
            <input
              type="text"
              className="form-control p-3 rounded-0 fs-5"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col-12  mb-4">
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
          >
            Sign In
          </button>
          <p>
            Already have an account?&nbsp;
            <Link to="/login" className="text-decoration-none ">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignUpScreen;
