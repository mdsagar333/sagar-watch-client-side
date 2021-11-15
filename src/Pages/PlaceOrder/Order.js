import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useContextAPI from "../../Hooks/useContextAPI";
import OrderForm from "../Shared/OrderForm/OrderForm";
import Spinner from "../Shared/Spinner/Spinner";
import CartTotal from "../ShippingCart/Component/CartTotal";
import ProductCart from "../ShippingCart/Component/ProductCart";

const Order = () => {
  const { user, isDataLoading, userLoading, watchesData } = useContextAPI();
  const { productId, qty } = useParams();
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });
  const [isConfirmLoading, setIsConfirmLoading] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState("");

  useEffect(() => {
    const name = user?.displayName || "";
    const email = user?.email || "";
    setUserInfo({ ...userInfo, name, email });
  }, []);

  if (isDataLoading || userLoading) {
    return <Spinner />;
  }
  const product = watchesData.find((item) => item._id === productId);
  const { name, image, price, _id } = product;
  const cartProduct = [
    {
      productName: name,
      productImage: image,
      productPrice: price,
      _id,
      productQuantity: qty,
    },
  ];

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleOrder = (e) => {
    e.preventDefault();
    setIsConfirmLoading(true);
    setIsOrderPlaced("");
    fetch("https://fierce-bastion-00988.herokuapp.com/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...userInfo,
        productName: name,
        productQuantity: qty,
        userUID: user.uid,
        productPrice: price,
        orderedDate: new Date().getTime(),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setIsOrderPlaced("Your order has been placed.");
        }
      })
      .finally(() => {
        setIsConfirmLoading(false);
        setUserInfo({ ...userInfo, address: "", postCode: "", phone: "" });
      });
  };

  return (
    <div className="order_container">
      <h1 className="text-center text-capitalize my-4">Confirm your order</h1>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6">
            <OrderForm
              handleOrder={handleOrder}
              isOrderPlaced={isOrderPlaced}
              handleChange={handleChange}
              userInfo={userInfo}
              isConfirmLoading={isConfirmLoading}
            />
          </div>
          <div className="col-12 col-md-6">
            <ProductCart products={cartProduct} showAction={false} />
            <CartTotal totalProduct={cartProduct} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
