"use client";
import axios from "axios";

import { Form, Input, Card, Button, message } from "antd";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    axios
      .post(`${process.env.REACT_APP_BACKEND}/login`, values, {
        withCredentials: true,
      })
      .then((result: any) => {
        console.log(result);
        //toast.success(result.data.message);
        message.success(result.data.message);
        navigate("/");
      })
      .catch((error: any) => {
        console.log(error);
        //toast.error(error.response.data.message);
        message.error(error.response.data.message);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="mt-1 p-4 flex justify-center">
        <div className=" bg-white rounded-full p-1 md:w-5/12 flex justify-center shadow-md px-4">
          <input
            className=" text-2xl p-2 w-full rounded-full focus:outline-none border-none font-poppins"
            type="text"
            placeholder="Customer Phone Number"
          />
          <button className="appearance-none border border-none shadow-md bg-blue-600 m-0.5 rounded-full font-poppins text-white p-4 hover:bg-blue-500 font-semibold hover:cursor-pointer">
            Go
          </button>
        </div>
      </div>
      <div className="  flex justify-center md:h-screen py-3">
        <div className=" lg:w-6/12 w-full mx-4 lg:mx-0  ">
          <p className=" text-3xl font-semibold text-slate-600 py-6">Details</p>
          <Card className="px-5 py-4 shadow-md">
            <div className=" flex justify-center pb-4"></div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Search;
