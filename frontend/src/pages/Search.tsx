"use client";
import axios from "axios";
import React from "react";

import { Card, message, Image, Modal, Button } from "antd";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [search, setSearch] = React.useState("");
  const [data, setData] = React.useState<Order[] | null>(null);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);

  interface Order {
    id: number;
    name: string;
    address: string;
    courier: string;
    couriercharge: number;
    date: string;
    description: string;
    phone: string;
    phone2?: string;
    price: number;
    images?: { image: string }[];
  }

  const showOrderDetails = (order: any) => {
    setSelectedOrder(order);
    showModal();
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    axios
      .post(
        `${process.env.REACT_APP_BACKEND}/search`,
        { search },
        { withCredentials: true }
      )
      .then((result) => {
        console.log(result.data.data);
        setData(result.data.data);
      })
      .catch((error) => {
        setData([]);
        message.error("No data found");
      });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Order Details"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {selectedOrder && (
          <>
            <p>Name: {selectedOrder.name}</p>
            <p>Address: {selectedOrder.address}</p>
            <p>Courier: {selectedOrder.courier}</p>
            <p>Date: {selectedOrder.date}</p>
            <p>Description: {selectedOrder.description}</p>
            <p>Courier Charge: {selectedOrder.couriercharge}</p>
            <p>Phone Number: {selectedOrder.phone}</p>
            <p>
              Phone Number 2:
              {selectedOrder.phone2 ? selectedOrder.phone2 : "Not Available"}
            </p>
            <p>Package Price: {selectedOrder.price}</p>

            {/* Iterate over images array */}
            {selectedOrder.images && selectedOrder.images.length > 0 && (
              <div>
                <p>Images:</p>
                <Image.PreviewGroup
                  preview={{
                    onChange: (current, prev) =>
                      console.log(
                        `current index: ${current}, prev index: ${prev}`
                      ),
                  }}
                >
                  {selectedOrder.images.map((image, index) => (
                    <Image
                      key={index}
                      src={image.image}
                      alt={`Image ${index + 1}`}
                      width={200}
                      height={200}
                      className="mx-2 my-2"
                    />
                  ))}
                </Image.PreviewGroup>
              </div>
            )}
          </>
        )}
      </Modal>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="mt-1 p-4 flex justify-center h-vh">
        <form
          onSubmit={handleSubmit}
          className=" bg-white rounded-full p-1 md:w-5/12 flex justify-center shadow-md px-4"
        >
          <input
            className=" text-2xl p-2 w-full rounded-full focus:outline-none border-none font-poppins"
            type="text"
            placeholder="Customer Phone Number"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
          />
          <button
            type="submit"
            className="appearance-none border border-none shadow-md bg-blue-600 m-0.5 rounded-full font-poppins text-white p-4 hover:bg-blue-500 font-semibold hover:cursor-pointer"
          >
            Go
          </button>
        </form>
      </div>

      <div className="flex justify-center md:h-vh py-3">
        <div className="lg:w-6/12 w-full mx-4 lg:mx-0">
          {data && data.length > 0 && (
            <>
              <p className="text-3xl font-semibold text-slate-600 py-6">
                Details
              </p>
              {data.map((data1) => (
                <Card
                  key={data1.id}
                  className="px-5 py-4 shadow-md my-4"
                  style={{ cursor: "pointer" }}
                >
                  <div className="justify-center pb-4">
                    <p>Order Date: {data1.date}</p>
                    <p>Order Description: {data1.description}</p>
                  </div>
                  <Button onClick={() => showOrderDetails(data1)}>
                    View Order
                  </Button>
                </Card>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
