import React, { useEffect, useState } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import useContextAPI from "../../../Hooks/useContextAPI";
import Spinner from "../../Shared/Spinner/Spinner";
const MyOrders = () => {
  const { user } = useContextAPI();
  const [orderIsLoading, setOrderIsLoading] = useState(false);
  const [myOrders, setMyOrders] = useState([]);
  const [itemToDelete, setItemToDelete] = useState("");
  const [loadData, setLoadData] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const handleItemDelete = (id) => {
    console.log(id);
    setItemToDelete(id);
    setShowModal(true);
  };

  const confirmDeleteItem = () => {
    fetch(`http://127.0.0.1:5000/orders/${itemToDelete}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .finally(() => {
        setLoadData(loadData + 1);
        setShowModal(false);
      });
  };

  useEffect(() => {
    if (user) {
      setOrderIsLoading(true);
      const url = `http://127.0.0.1:5000/orders/${user.uid}`;
      console.log(url);
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setMyOrders(data.allOrders);
        })
        .finally(() => {
          setOrderIsLoading(false);
        });
    }
  }, [loadData]);

  if (orderIsLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <h1 className="text-center mb-4">My orders</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Product Name</th>
            <th scope="col">Qty</th>
            <th scope="col">Price</th>
            <th scope="col">Total</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {myOrders.map((order, index) => (
            <tr key={order._id}>
              <th scope="row">{index + 1}</th>
              <td>{order.productName}</td>
              <td>{order.productQuantity}</td>
              <td>{order.productPrice}</td>
              <td>{(order.productQuantity * order.productPrice).toFixed(2)}</td>
              <td>
                <span
                  className={
                    order.isPending ? "badge bg-warning" : "badge bg-success"
                  }
                >
                  {order.isPending ? "Pending" : "Shipped"}
                </span>
              </td>
              <td>
                <button
                  className="btn"
                  style={{ display: "inline-block" }}
                  disabled={order.isPending ? false : true}
                >
                  <AiTwotoneDelete
                    style={{ fontSize: "22px", cursor: "pointer" }}
                    className="text-danger"
                    onClick={() => handleItemDelete(order._id)}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* modal */}
      <div className={`${showModal ? "d-block" : "d-none"} custom_modal`}>
        <div className="d-flex justify-content-center align-items-center">
          <div className="modal_content p-3 mt-5">
            <h3>Are you sure? You want to delete?</h3>
            <div className="d-flex justify-content-end">
              <div className="modal_btn_container mt-5">
                <button
                  className="btn btn-outline-primary me-2"
                  onClick={confirmDeleteItem}
                >
                  Confirm{" "}
                </button>
                <button
                  className="btn btn-outline-primary"
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
  );
};

export default MyOrders;
