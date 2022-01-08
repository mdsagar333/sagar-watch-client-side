import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useContextAPI from "../../../../Hooks/useContextAPI";
import Spinner from "../../../Shared/Spinner/Spinner";

const CheckoutPayment = () => {
  const { user, userLoading } = useContextAPI();
  const [isOrderLoading, setIsOrderLoading] = useState(true);
  const [myOrderHistory, setMyOrderHistory] = useState([]);

  useEffect(async () => {
    if (user) {
      setIsOrderLoading(true);
      const url = `https://fierce-bastion-00988.herokuapp.com/orders/${user.uid}`;
      const orders = await fetch(url).then((res) => res.json());
      setIsOrderLoading(false);
      setMyOrderHistory(orders.allOrders);
    }
  }, []);

  if (isOrderLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <h1 className="text-center">Payment</h1>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product Name</th>
              <th scope="col">Qty</th>
              <th scope="col">Price</th>
              <th scope="col">Payment</th>
            </tr>
          </thead>
          <tbody>
            {myOrderHistory.map((order, index) => {
              return (
                <tr key={order._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{order.productName}</td>
                  <td>{order.productQuantity}</td>
                  <td>{order.productPrice}</td>
                  <td>
                    <Link
                      to={`/dashboard/payment/checkout/${order._id}`}
                      className="btn btn-outline-dark btn-sm"
                    >
                      Pay Now
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CheckoutPayment;
