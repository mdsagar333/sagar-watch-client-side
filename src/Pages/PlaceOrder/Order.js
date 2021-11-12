import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useContextAPI from "../../Hooks/useContextAPI";
import orderImg from "../../images/order_confirm.png";
import Spinner from "../Shared/Spinner/Spinner";
import Cart from "./Components/Cart";

const Order = () => {
  const { user, isDataLoading, userLoading } = useContextAPI();
  const { watchesData } = useContextAPI();
  const { productId, qty } = useParams();
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });

  useEffect(() => {
    const name = user?.displayName || "";
    const email = user?.email || "";
    setUserInfo({ ...userInfo, name, email });
    console.log(userInfo);
  }, []);

  if (isDataLoading || userLoading) {
    return <Spinner />;
  }
  const product = watchesData.find((item) => item._id === productId);
  const { name, image, price, _id } = product;
  const cartProduct = { name, image, price, _id, qty };

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleOrder = (e) => {
    e.preventDefault();
    console.log(user.uid);
    console.log({
      ...userInfo,
      productName: name,
      productQuantity: qty,
      productPrice: price,
      userUID: user.uid,
    });

    fetch("http://127.0.0.1:5000/orders", {
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
      .then((data) => console.log(data));
  };

  return (
    <div className="order_container">
      <h1 className="text-center text-capitalize my-4">Confirm your order</h1>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6">
            <form onSubmit={handleOrder}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  aria-describedby="emailHelp"
                  required
                  value={userInfo.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  name="name"
                  required
                  value={userInfo.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Post Code
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="postCode"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Phone
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="phone"
                  min="11"
                  required
                  onChange={handleChange}
                />
              </div>
              <button className="btn btn-outline-dark custom_btn w-100 mt-3">
                Confirm Order
              </button>
            </form>
          </div>
          <div className="col-12 col-md-6">
            {/* <img src={orderImg} alt="" className="img-fluid" /> */}
            <Cart {...cartProduct} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
