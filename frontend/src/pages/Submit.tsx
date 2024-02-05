import React, { useState } from "react";
import { Form, Input, Card, Upload, message, Button, DatePicker } from "antd";
import { Select } from "antd";
import { storage, firebase } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface jwt {
  email: string;
  id: number;
}

const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

function Submit() {
  const navigate = useNavigate();
  const [imageUrls, setImageUrls] = React.useState<string[]>([]);

  const [form] = Form.useForm();

  const customUploadValidator = async (file: File, files: File[]) => {
    for (const file of files) {
      // File Size Validation
      const maxSize = 2 * 1024 * 1024; // 2 MB
      const fileSizeValidation = file.size <= maxSize;

      // Type Validation
      const allowedTypes = ["image/jpeg", "image/png"];
      const typeValidation = allowedTypes.includes(file.type);

      if (fileSizeValidation && typeValidation) {
        try {
          // Display a loading message while uploading
          const loadingMessage = message.loading("Uploading image...", 0);

          const storageRef = storage.ref();
          const fileName = `${Date.now()}-${file.name}`;
          const imageRef = storageRef.child(`complains/${fileName}`);
          const snapshot = await imageRef.put(file);
          const downloadURL = await snapshot.ref.getDownloadURL();

          setImageUrls((prevUrls) => [...prevUrls, downloadURL]);
          loadingMessage();
          message.success("Image upload Success!");
          console.log(imageUrls);
        } catch (error) {
          console.error(error);
          message.error("Error uploading image");
        }
      } else {
        if (!fileSizeValidation) {
          message.error("File size exceeds the allowed limit (2 MB)");
        }
        if (!typeValidation) {
          message.error("You can only upload JPG and PNG files!");
        }
      }
    }

    return false; // Prevent automatic file upload
  };

  const onFinish = (values: any) => {
    const token = localStorage.getItem("token") || "";
    const decodedToken: jwt = jwtDecode(token);

    const postData = {
      userid: decodedToken.id,
      name: values.name,
      phone: values.phone,
      phone2: values.phone2,
      address: values.address,
      date: values.date.$d,
      price: values.price,
      courier: values.courier,
      couriercharge: values.couriercharge,
      description: values.description,
      image: imageUrls,
    };

    console.log(postData);

    axios
      .post(`${process.env.REACT_APP_BACKEND}/submitComplain`, postData, {
        withCredentials: true,
      })
      .then((result) => {
        message.success("Submittion Done");
        console.log(result);
        navigate("/");
      })
      .catch((error: any) => {
        message.error(error.response.data.message);
        navigate("/");
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="  flex justify-center py-8">
      <div className=" lg:w-3/12 w-full mx-4 lg:mx-0 shadow-md ">
        <Card className="px-5 py-4">
          <div className=" flex justify-center pb-4">
            <p className=" text-3xl font-semibold text-slate-600">
              Submit Bad Customer
            </p>
          </div>
          <Form
            form={form}
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
              label="Customer Name"
              name="name"
              rules={[
                { required: true, message: "Please input customer name!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Customer Phone Number 1 "
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input customer Phone Number!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Customer Phone Number 2 "
              name="phone2"
              rules={[
                { required: false, message: "Please input your Phone Number!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Customer Address"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please input customer address!",
                },
              ]}
            >
              <TextArea
                rows={4}
                placeholder="Customer Address"
                maxLength={500}
              />
            </Form.Item>

            <Form.Item
              label="Order Date"
              name="date"
              rules={[{ required: true, message: "Please input order date!" }]}
            >
              <DatePicker className="w-full" />
            </Form.Item>

            <Form.Item
              label="Order Price "
              name="price"
              rules={[{ required: true, message: "Please input Order price!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Courier Service"
              name="courier"
              rules={[
                { required: true, message: "Please input Courier Service!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Courier Charges"
              name="couriercharge"
              rules={[
                { required: true, message: "Please input courier charges!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please input your Description!" },
              ]}
            >
              <TextArea
                rows={4}
                placeholder="About your Business"
                maxLength={500}
              />
            </Form.Item>

            <Form.Item
              label="Proof Images"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              name="bookImage"
              rules={[{ required: false, message: "Please Add an image" }]}
            >
              <Upload
                listType="picture-card"
                maxCount={5}
                accept=".jpg, .png"
                beforeUpload={customUploadValidator}
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>

            <div className="flex justify-end">
              <Form.Item>
                <Button htmlType="submit">Submit</Button>
              </Form.Item>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default Submit;
