import React, { useEffect, useState } from "react";
import useContextAPI from "../../../../Hooks/useContextAPI";

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
  }, [user?.uid]);

  console.log(myOrderHistory);
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
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
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
