import React from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

function CompletionCheck() {
  const [apiSuccess, setApiSuccess] = React.useState(false);
  const navigate = useNavigate();
  if (localStorage.getItem("token")) {
    const token = localStorage.getItem("token");

    // verify token from backend
    if (token) {
      axios
        .post(
          `${process.env.REACT_APP_BACKEND}/profilecheck`,
          { token },
          {
            withCredentials: true,
          }
        )
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
