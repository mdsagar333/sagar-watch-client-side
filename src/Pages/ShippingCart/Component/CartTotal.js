import React from "react";

const CartTotal = (props) => {
  const { totalProduct } = { ...props };
  const shippingCost = 15;
  const { subTotal } = totalProduct.reduce(
    (acc, item) => {
      acc.subTotal +=
        parseFloat(item.productPrice) * parseFloat(item.productQuantity);
      return acc;
    },

    { subTotal: 0 }
  );
  console.log(subTotal);
  if (totalProduct.length < 1) {
    return null;
  }
  return (
    <div className="row">
      <div className="col-0 col-md-6"></div>
      <div className="col-12 col-md-5">
        <div className="d-flex justify-content-between">
          <p>Sub Total</p>
          <p>${subTotal.toFixed(2)}</p>
        </div>
        <div className="d-flex justify-content-between">
          <p>Shipping Cost</p>
          <p>${shippingCost.toFixed(2)}</p>
        </div>
        <div className="d-flex justify-content-between">
          <p>Total</p>
          <p>${(subTotal + shippingCost).toFixed(2)}</p>
        </div>
      </div>
      <div className="col-0 col-md-1"></div>
    </div>
  );
};

export default CartTotal;
