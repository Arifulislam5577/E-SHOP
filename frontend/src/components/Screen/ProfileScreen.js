import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import Message from "../Message";
import { BiUserCircle } from "react-icons/bi";
import { logoutUser } from "../../redux/actions/userAction";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector((state) => state.userLogIn);

  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  return (
    <section className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
            <form className="m-auto shadow p-5">
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
              <div className="col-12  mb-4">
                <input
                  type="password"
                  className="form-control p-3 rounded-0 fs-5"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setconfirmPassword(e.target.value)}
                />
              </div>
              <div className="col-12  mb-4">
                <button className="btn btn-dark btn-lg p-3 px-5 fs-5 rounded-0 mb-5 w-50">
                  Update
                </button>
                <button
                  className="btn btn-warning text-light fw-bold btn-lg p-3 px-5 fs-5 rounded-0 mb-5 w-50"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </div>
            </form>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
            <h1>My Orders</h1>
            <hr />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileScreen;
