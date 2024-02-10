import axios from "axios";
import { Form, Input, Card, Button, message } from "antd";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
  const onFinish = (values: any) => {
    console.log("Success:", values);
    axios
      .post(`${process.env.REACT_APP_BACKEND}/register`, values)
      .then((result: any) => {
        //toast.success("User Created Succussfully.");
        message.success("User Created Succussfully.");
        navigate("/login");
      })
      .catch((error: any) => {
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
      <div className=" flex justify-center items-center h-screen bg-zinc-100">
        <div className="mx-4 flex flex-col justify-center items-center">
          <div className=" flex justify-between shadow-md rounded-xl w-full max-w-[900px] ">
            <div className="w-full p-4 bg-white rounded-l-lg">
              <p className="text-center text-slate-700 mx-auto text-4xl font-bold drop-shadow-sm mt-8">
                Register New Account!
              </p>

              <Form
                name="form"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className=" my-16 px-6 md:px-20"
                layout="vertical"
              >
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                    {
                      type: "email",
                      message: "Please enter a valid email address!",
                    },
                  ]}
                >
                  <Input
                    maxLength={50}
                    className="rounded-full py-2 text-lg drop-shadow-sm"
                    placeholder="Email"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  // label="Password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password
                    maxLength={50}
                    className="rounded-full py-2 text-lg drop-shadow-sm"
                    placeholder="Password here"
                  />
                </Form.Item>

                <Form.Item>
                  <div className="flex justify-center">
                    <Button
                      className=" bg-indigo-600 rounded-full font-poppins drop-shadow-md my-2 hover:bg-slate-100"
                      type="primary"
                      htmlType="submit"
                      size="large"
                      shape="round"
                      block={true}
                      // style={{ height: "5vh", width: "50%" }}
                    >
                      Register
                    </Button>
                  </div>
                  Already Registered?
                  <Link to="/login">
                    <span className=" text-sky-600 cursor-pointer">
                      &nbsp; Login Here
                    </span>
                  </Link>
                </Form.Item>
              </Form>
            </div>

            <div className="hidden md:flex flex-col bg-gradient-to-r from-indigo-600 to-purple-600 rounded-r-lg p-4 justify-center">
              <p className=" text-center font-poppins text-4xl font-bold text-white drop-shadow-md my-2">
                Already Registered?
              </p>

              <p className=" text-center font-poppins text-white drop-shadow-sm my-2">
                Sign in from here!
              </p>

              <Link to="/login">
                <p className="bg-white rounded-full px-3 py-2 text-center drop-shadow-md my-2 hover:bg-slate-100 cursor-pointer">
                  Sign In
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
