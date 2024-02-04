import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

function AuthCheck() {
  if (Cookies.get("token")) {
    const token = Cookies.get("token");

    // verify token from backend
    if (token) {
      console.log("token found");
      return <Outlet />;
    } else {
      console.log("token found bot not valid");
      return (
        <div>
          <Navigate to="/login" />
        </div>
      );
    }
  } else {
    console.log("no token found");
    return (
      <div>
        <Navigate to="/login" />
      </div>
    );
  }
}

export default AuthCheck;
