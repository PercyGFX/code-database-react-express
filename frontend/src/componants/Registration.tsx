import React, { useState } from "react";
import { Form, Input, Card, Upload, message, Button } from "antd";
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
          const imageRef = storageRef.child(`images/${fileName}`);
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
      image: imageUrls,
    };

    axios
      .post(`${process.env.REACT_APP_BACKEND}/profilecomplete`, postData, {
        withCredentials: true,
      })
      .then((result) => {})
      .catch((error: any) => {
        console.log(error);
      });
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
              label="Book Image"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              name="bookImage"
              rules={[{ required: true, message: "Please Add an image" }]}
            >
              <Upload
                listType="picture-card"
                maxCount={3}
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
