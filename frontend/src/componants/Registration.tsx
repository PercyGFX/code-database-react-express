import React, { useState } from "react";
import { Form, Input, Card, Upload, message, Button } from "antd";
import toast, { Toaster } from "react-hot-toast";
import { Select } from "antd";
import { storage, firebase } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

function Registration() {
  const [imageUrl, setImageUrl] = React.useState("");
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // image validator
  const customUploadValidator = async (file: File) => {
    console.log("File name:", file.name);
    console.log("File type:", file.type);
    console.log("File size (in bytes):", file.size);

    const maxSize = 2 * 1024 * 1024; // 2 MB (adjust as needed)

    if (file.size > maxSize) {
      message.error("File size exceeds the allowed limit (5 MB)");
      form.resetFields(["bookImage"]); // Reset the upload element
      return false; // Prevent the file from being uploaded
    }

    // check type
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      message.error("You can only upload JPG and PNG files!");
      form.resetFields(["bookImage"]);
      return false;
    }

    // Display a loading message while uploading
    const loadingMessage = message.loading("Uploading image...", 0);

    // Upload the file to Firebase Storage
    const storageRef = storage.ref();
    const fileName = `${Date.now()}-${file.name}`;
    try {
      const imageRef = storageRef.child(`images/${fileName}`);
      const snapshot = await imageRef.put(file);

      // You can now use the 'downloadURL' as needed (e.g., store it in your database)
      setImageUrl(await snapshot.ref.getDownloadURL());

      console.log("Download URL:", imageUrl);

      // Close the loading message
      loadingMessage();

      message.info("Image uploaded successfully");

      return false; // Prevent automatic file upload by returning false
    } catch (error) {
      // Close the loading message
      loadingMessage();
      console.error("Error uploading image:", error);
      message.error("Error uploading image");
      form.resetFields(["bookImage"]);

      return false; // Prevent automatic file upload by returning false
    }
  };

  const OPTIONS = ["Computer", "Fashion", "Craft", "Food"];
  const PLATFORMOPTIONS = [
    "Facebook",
    "Whatsapp",
    "Tiktok",
    "Youtube",
    "Web Store",
  ];

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
  const filteredPlatforms = PLATFORMOPTIONS.filter(
    (o) => !selectedItems.includes(o)
  );

  const onFinish = (values: any) => {
    const postData = {
      name: values.name,
      business: values.business,
      categories: values.categories,
      description: values.description,
      phone: values.phone,
      whatsapp: values.whatsapp,
      platform: values.platform,
      image: imageUrl,
    };

    console.log(postData);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  // handle submit
  // const handlesubmit = (values: any) => {
  //   // vales to post
  //   const postData = {
  //     bookname: values.bookname,
  //     author: values.author,
  //     description: values.description,
  //     rating: values.rating,
  //     image: imageUrl,
  //   };

  //   // axios post

  //   axios
  //     .post(`${process.env.REACT_APP_BACKEND_URL}/addbook`, postData)
  //     .then((response) => {
  //       console.log("POST request success:", response.data);
  //       message.success("Book posted");
  //       navigate("/");
  //     })
  //     .catch((error) => {
  //       console.error("POST request error:", error);
  //       message.error("Some field is missing or database not working");
  //     });
  // };

  return (
    <div className="  flex justify-center py-8">
      <div className=" lg:w-3/12 w-full mx-4 lg:mx-0 shadow-md ">
        <Card className="px-5 py-4">
          <div className=" flex justify-center pb-4">
            <p className=" text-3xl font-semibold text-slate-600">
              Complete Registration
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
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Business Name"
              name="business"
              rules={[
                { required: true, message: "Please input your Business Name!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Categories"
              name="categories"
              rules={[
                { required: true, message: "Please input your Categories!" },
              ]}
            >
              <Select
                mode="multiple"
                placeholder="Select Cateogries"
                value={selectedItems}
                onChange={setSelectedItems}
                style={{ width: "100%" }}
                options={filteredOptions.map((item) => ({
                  value: item,
                  label: item,
                }))}
              />
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
                maxLength={6}
              />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                { required: true, message: "Please input your Phone Number!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Whatsapp Number"
              name="whatsapp"
              rules={[
                {
                  required: true,
                  message: "Please input your Whatsapp Number!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Business Platform"
              name="platform"
              rules={[
                {
                  required: true,
                  message: "Please input your Business Platform!",
                },
              ]}
            >
              <Select
                mode="multiple"
                placeholder="Select Platforms"
                value={selectedPlatforms}
                onChange={setSelectedPlatforms}
                style={{ width: "100%" }}
                options={filteredPlatforms.map((item) => ({
                  value: item,
                  label: item,
                }))}
              />
            </Form.Item>

            <Form.Item
              label="Upload Business Image"
              name="bookImage"
              rules={[
                {
                  required: false,
                  message: "Please input your Business Image!",
                },
              ]}
            >
              <Upload
                listType="picture-card"
                maxCount={1}
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
                <Button htmlType="submit">Login</Button>
              </Form.Item>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default Registration;
