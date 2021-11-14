import React from "react";
import OrderForm from "../Shared/OrderForm/OrderForm";

const ShippingCart = () => {
  // const { user, isDataLoading, userLoading } = useC;
  // const { watchesData } = useContextAPI();
  // const [userInfo, setUserInfo] = useState({ name: "", email: "" });
  // const [isConfirmLoading, setIsConfirmLoading] = useState(false);
  // const [isOrderPlaced, setIsOrderPlaced] = useState("");
  return (
    <div className="shipping_cart container">
      <h1>cart</h1>
      <div className="row">
        <div className="col-12 col-md-6">{/* <OrderForm /> */}</div>
        <div className="col-12 col-md-6"></div>
      </div>
    </div>
  );
};

export default ShippingCart;
