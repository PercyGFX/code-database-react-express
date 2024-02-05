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
      <div className="  flex justify-center items-center h-full md:h-screen py-8">
        <div className=" lg:w-3/12 w-full mx-4 lg:mx-0 shadow-md ">
          <Card className="px-5 py-4">
            <div className=" flex justify-center pb-4">
              <p className=" text-3xl font-semibold text-slate-600">Register</p>
            </div>
            <Form
              name="basic"
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
                  {
                    type: "email",
                    message: "Please enter a valid email address!",
                  },
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
                  <Button htmlType="submit">Register</Button>
                </Form.Item>
              </div>
              Already a member?
              <Link to="/login">
                <span className=" text-sky-600 cursor-pointer">
                  {" "}
                  Login here
                </span>
              </Link>
            </Form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Register;
