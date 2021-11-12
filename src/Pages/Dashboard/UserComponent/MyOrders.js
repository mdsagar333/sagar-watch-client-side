import React, { useEffect, useState } from "react";

const MyOrders = () => {
  const [orderIsLoading, setOrderIsLoading] = useState(true);
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/orders")
      .then((res) => res.json())
      .then((data) => setMyOrders(data.allOrders));
  });

  return (
    <div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Product Name</th>
            <th scope="col">Qty</th>
            <th scope="col">Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {myOrders.map((order, index) => (
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{order.productName}</td>
              <td>{order.productQuantity}</td>
              <td>$10</td>
              <td>delete</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
