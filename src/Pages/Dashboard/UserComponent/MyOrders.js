import React, { useEffect, useState } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import Spinner from "../../Shared/Spinner/Spinner";
const MyOrders = () => {
  const [orderIsLoading, setOrderIsLoading] = useState(true);
  const [myOrders, setMyOrders] = useState([]);

  const handleItemDelete = (id) => {
    console.log(id);
  };

  useEffect(() => {
    fetch("http://127.0.0.1:5000/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrderIsLoading(false);
        setMyOrders(data.allOrders);
      });
  }, []);

  if (orderIsLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Product Name</th>
            <th scope="col">Qty</th>
            <th scope="col">Price</th>
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
              <td>{order.isPending ? "Pending" : "Shipped"}</td>
              <td>
                <AiTwotoneDelete
                  style={{ fontSize: "22px", cursor: "pointer" }}
                  className="text-danger"
                  onClick={() => handleItemDelete(order._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
