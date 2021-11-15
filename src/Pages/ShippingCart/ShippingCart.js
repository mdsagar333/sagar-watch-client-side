import React, { useState, useEffect } from "react";
import useContextAPI from "../../Hooks/useContextAPI";
import { clearDB, getDB, removeFromCart } from "../../utils/utils";
import OrderForm from "../Shared/OrderForm/OrderForm";
import Spinner from "../Shared/Spinner/Spinner";
import CartTotal from "./Component/CartTotal";
import ProductCart from "./Component/ProductCart";

const ShippingCart = () => {
  const { user, isDataLoading, userLoading, setCartLength } = useContextAPI();
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
  const [productLists, setProductLists] = useState(getDB());
  const [isCartLoading, setIsCartLoading] = useState(true);

  const deleteCartItem = (id) => {
    removeFromCart(id);
    const filteredCartProduct = cartProduct.filter((item) => item._id !== id);
    setCartProduct(filteredCartProduct);
    setCartLength(filteredCartProduct.length);
  };

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
      delete newProduct["_id"];
      return newProduct;
    });

    fetch("http://127.0.0.1:5000/cart-orders", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(orderedProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setIsOrderPlaced("You order has been confirmed.");
          clearDB();
          setCartProduct([]);
          setCartLength(0);
        }
      })
      .finally(() => {
        setIsConfirmLoading(false);
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
                _id: product._id,
                productName: product.name,
                productPrice: product.price,
                productImage: product.image,
                productQuantity: qty,
              };
            });
            setCartProduct(productWithQty);
          }
        })
        .finally(() => {
          setIsCartLoading(false);
        });
    }
  }, []);

  if (isDataLoading || userLoading) {
    return <Spinner />;
  }

  return (
    <div className="shipping_cart container">
      <h1>cart</h1>
      {isCartLoading ? (
        <Spinner />
      ) : (
        <div className="row">
          <div className="col-12 col-md-5">
            <OrderForm
              handleOrder={handleOrder}
              isOrderPlaced={isOrderPlaced}
              handleChange={handleChange}
              userInfo={userInfo}
              isConfirmLoading={isConfirmLoading}
            />
          </div>
          <div className="col-12 col-md-7">
            <ProductCart
              products={cartProduct}
              deleteCartItem={deleteCartItem}
              showAction={true}
            />
            <div>
              <CartTotal totalProduct={cartProduct} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShippingCart;
