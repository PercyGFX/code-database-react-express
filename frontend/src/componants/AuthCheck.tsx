import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

function AuthCheck() {
  if (Cookies.get("token")) {
    const token = Cookies.get("token");

    // verify token from backend
    if (token) {
      return <Outlet />;
    } else {
      return (
        <div>
          <Navigate to="/login" />
        </div>
      );
    }
  } else {
    return (
      <div>
        <Navigate to="/login" />
      </div>
    );
  }
}

export default AuthCheck;
