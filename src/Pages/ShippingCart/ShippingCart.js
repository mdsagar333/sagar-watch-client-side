import React, { useState, useEffect } from "react";
import useContextAPI from "../../Hooks/useContextAPI";
import { getDB } from "../../utils/utils";
import Cart from "../PlaceOrder/Components/Cart";
import OrderForm from "../Shared/OrderForm/OrderForm";

const ShippingCart = () => {
  const { user, isDataLoading, userLoading } = useContextAPI();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    postCode: "",
    address: "",
  });
  const [isConfirmLoading, setIsConfirmLoading] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState("");
  const [cartProduct, setCartProduct] = useState([]);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleOrder = (e) => {
    e.preventDefault();
    setIsConfirmLoading(true);
    setIsOrderPlaced("");
    const orderedProduct = cartProduct.map((product) => {
      const newProduct = { ...product, ...userInfo };
      delete newProduct["productImage"];
      return newProduct;
    });

    fetch("http://127.0.0.1:5000/cart-orders", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(orderedProduct),
    });
  };

  useEffect(() => {
    if (user) {
      setUserInfo({
        ...userInfo,
        name: user.displayName,
        email: user.email,
        userUID: user.uid,
      });
    }
  }, []);

  useEffect(() => {
    const productLists = getDB();
    if (productLists !== null) {
      const arrProducts = Object.keys(productLists);
      fetch("http://127.0.0.1:5000/product-selected", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(arrProducts),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            const productWithQty = data.products.map((product) => {
              const qty = parseInt(productLists[product._id]);
              return {
                productName: product.name,
                productPrice: product.price,
                productImage: product.image,
                productQuantity: qty,
              };
            });
            setCartProduct(productWithQty);
          }
        });
    }
  }, []);

  return (
    <div className="shipping_cart container">
      <h1>cart</h1>
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
        <div className="col-12 col-md-6"></div>
      </div>
    </div>
  );
};

export default ShippingCart;
