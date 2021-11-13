import React, { useEffect, useState } from "react";
import { AiFillDelete, AiOutlineCheck } from "react-icons/ai";
import Spinner from "../../Shared/Spinner/Spinner";

const ManageAllOrders = () => {
  const [orderIsLoading, setOrderIsLoadin] = useState(false);
  const [allOrders, setAllOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState({ id: "", action: "" });
  const [isNeedToUpdate, setIsNeedToUpdate] = useState(0);

  const handleAction = (id, operation) => {
    setConfirmAction({ id, action: operation });
    setShowModal(true);
  };

  const handleConfirmAction = () => {
    setShowModal(false);
    const url = `http://127.0.0.1:5000/orders/${confirmAction.id}`;
    if (confirmAction.action === "update") {
      fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .finally(() => {
          setIsNeedToUpdate(isNeedToUpdate + 1);
        });
    } else if (confirmAction.action === "delete") {
      fetch(url)
        .then((res) => res.json())
        .then((data) => console.log(data))
        .finally(() => {
          setIsNeedToUpdate(isNeedToUpdate + 1);
        });
    }
  };

  useEffect(() => {
    setOrderIsLoadin(true);
    fetch("http://127.0.0.1:5000/orders")
      .then((res) => res.json())
      .then((data) => setAllOrders(data.allOrders))
      .finally(() => setOrderIsLoadin(false));
  }, [isNeedToUpdate]);
  return (
    <div>
      <h1 className="text-center mb-3 text-capitalize">Manage all orders</h1>

      <div className="data_container">
        {orderIsLoading ? (
          <Spinner />
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Product Name</th>
                <th scope="col">Ordered By</th>
                <th scope="col">Qty</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((order, index) => (
                <tr key={order._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{order.productName}</td>
                  <td>{order.email || order.name}</td>
                  <td>{order.productQuantity}</td>
                  <td>
                    {" "}
                    <span
                      className={
                        order.isPending
                          ? "badge bg-warning"
                          : "badge bg-success"
                      }
                    >
                      {order.isPending ? "Pending" : "Shipped"}
                    </span>{" "}
                  </td>
                  <td>
                    <button
                      className="btn"
                      style={{ display: "inline-block", padding: "0px" }}
                      disabled={order.isPending ? false : true}
                    >
                      <AiOutlineCheck
                        className="text-success"
                        style={{
                          fontSize: "20px",
                          marginRight: "6px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleAction(order._id, "update")}
                      />
                    </button>
                    <button
                      className="btn"
                      style={{ display: "inline-block", padding: "0px" }}
                      disabled={order.isPending ? false : true}
                    >
                      <AiFillDelete
                        className="text-danger"
                        style={{
                          fontSize: "20px",
                          marginLeft: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleAction(order._id, "delete")}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* modal */}
        <div className={`${showModal ? "d-block" : "d-none"} custom_modal`}>
          <div className="d-flex justify-content-center align-items-center">
            <div className="modal_content p-3 mt-5">
              <h3>Are you sure? You want to do this?</h3>
              <div className="d-flex justify-content-end">
                <div className="modal_btn_container mt-5">
                  <button
                    className="btn btn-outline-dark me-2"
                    onClick={handleConfirmAction}
                  >
                    Confirm{" "}
                  </button>
                  <button
                    className="btn btn-outline-dark"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end of modal */}
      </div>
    </div>
  );
};

export default ManageAllOrders;
