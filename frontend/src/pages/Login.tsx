"use client";
import axios from "axios";

import { Form, Input, Card, Button } from "antd";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const onFinish = (values: any) => {
    axios
      .post("/api/auth/login", values)
      .then((result: any) => {
        console.log(result);
        toast.success(result.data.message);
      })
      .catch((error: any) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="  flex justify-center items-center md:h-screen py-8">
        <div className=" lg:w-3/12 w-full mx-4 lg:mx-0 shadow-md ">
          <Card className="px-5 py-4">
            <div className=" flex justify-center pb-4">
              <p className=" text-3xl font-semibold text-slate-600">Login</p>
            </div>
            <Form
              name="basic"
              // labelCol={{ span: 8 }}
              // wrapperCol={{ span: 16 }}
              // style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <div className="flex justify-end">
                <Form.Item>
                  <Button>Sign In</Button>
                </Form.Item>
              </div>
            </Form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Login;
