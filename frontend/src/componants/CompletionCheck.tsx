import React from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

function CompletionCheck() {
  const [apiSuccess, setApiSuccess] = React.useState(false);
  const navigate = useNavigate();
  if (Cookies.get("token")) {
    const token = Cookies.get("token");

    // verify token from backend
    if (token) {
      axios
        .get(`${process.env.REACT_APP_BACKEND}/profilecheck`, {
          withCredentials: true,
        })
        .then((result) => {
          setApiSuccess(true);
        })
        .catch((error) => {
          navigate("/profile_complete");
        });
      return apiSuccess ? <Outlet /> : null;
    } else {
      return (
        <div>
          <Navigate to="/profile_complete" />
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

export default CompletionCheck;
