import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.userLogIn);
  const location = useLocation();

  return userInfo && Object.keys(userInfo).length > 0 ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default PrivateRoute;
