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
    ordername: string;
    description: string;
    phone: string;
    phone2?: string;
    price: number;
    images?: { image: string }[];
    user: {
      name: string;
      business: string
    };
  }

  const showOrderDetails = (order: any) => {
    setSelectedOrder(order);
    showModal();
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const token = localStorage.getItem("token") || "";

    axios
      .post(
        `${process.env.REACT_APP_BACKEND}/search`,
        { search },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
          },
        }
      )
      .then((result) => {
        console.log(result.data.data);
        setData(result.data.data);
      })
      .catch((error: any) => {
        setData([]);
        message.error("No data found");
        if (error.response.data.token === false) {
          localStorage.removeItem("token");
          navigate("/login");
        }
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
        footer={null}
      >
        {selectedOrder && (
          <div>
            <p>
              <span className="font-semibold">Name:</span>
            </p>
            <p>{selectedOrder.name}</p>

            <p>
              <span className="font-semibold">Address:</span>
            </p>
            <p>{selectedOrder.address}</p>

            <p>
              <span className="font-semibold">Courier:</span>
            </p>
            <p>{selectedOrder.courier}</p>

            <p>
              <span className="font-semibold">Order Name:</span>
            </p>
            <p>{selectedOrder.ordername}</p>

            <p>
              <span className="font-semibold">Date:</span>
            </p>
            <p>{new Date(selectedOrder.date).toISOString().split("T")[0]}</p>

            <p>
              <span className="font-semibold">Description:</span>
            </p>
            <p>{selectedOrder.description}</p>

            <p>
              <span className="font-semibold">Courier Charge:</span>
            </p>
            <p>{selectedOrder.couriercharge}</p>

            <p>
              <span className="font-semibold">Phone Number:</span>
            </p>
            <p>{selectedOrder.phone}</p>

            <p>
              <span className="font-semibold">Phone Number 2:</span>
            </p>
            <p>
              {selectedOrder.phone2 ? selectedOrder.phone2 : "Not Available"}
            </p>

            <p>
              <span className="font-semibold">Package Price:</span>
            </p>
            <p>{selectedOrder.price}</p>

            {/* Iterate over images array */}
            {selectedOrder.images && selectedOrder.images.length > 0 && (
              <div>
                <p>
                  {" "}
                  <span className="font-semibold">Proof Photos: </span>
                </p>
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

            <p className=" text-right">
              <span className=" text-xs">
                Reported by: {selectedOrder.user.business}
              </span>
            </p>
          </div>
        )}
      </Modal>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="h-screen">
        <div className="mt-1 p-4 flex justify-center ">
          <form
            onSubmit={handleSubmit}
            className=" bg-white rounded-full p-1 md:w-5/12 flex justify-center shadow-md "
          >
            <input
              className=" text-xl p-2 w-full rounded-full focus:outline-none border-none font-poppins"
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
                <p className="text-2xl font-semibold text-slate-600">
                  Customer History
                </p>
                {data.map((data1) => (
                  <Card
                    key={data1.id}
                    className="px-5 py-4 shadow-md my-4"
                    style={{ cursor: "pointer" }}
                  >
                    <div className="justify-center pb-4">
                      <p>
                        Date: {new Date(data1.date).toISOString().split("T")[0]}
                      </p>
                      <p>Order Name: {data1.ordername}</p>
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
      </div>
    </>
  );
};

export default Search;
