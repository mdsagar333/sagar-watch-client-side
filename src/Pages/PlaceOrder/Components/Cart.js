import React from "react";

const Cart = ({ name, image, price, qty }) => {
  const subTotal = price * parseInt(qty);
  const total = subTotal + 10;
  return (
    <div className="px-1 py-3 border bg-info text-dark">
      <h5 className="text-center text-capitalize mb-4">order summary</h5>
      <div className="cart_container">
        <div className="container-fluid">
          <div className="row mb-4">
            <div className="col-6 text-center">Product</div>
            <div className="col-3 text-center">Qunatity</div>
            <div className="col-3 text-end">Price</div>
          </div>
          <div className="row border-bottom pb-3">
            <div className="col-3">
              <img
                src={image}
                alt={name}
                className="img-fluid"
                style={{ width: "60px" }}
              />
            </div>
            <div className="col-3">{name}</div>
            <div className="col-3 text-center">{qty}</div>
            <div className="col-3 text-end">${subTotal.toFixed(2)}</div>
          </div>
          <div className="row mt-3">
            <div className="col-6"></div>
            <div className="col-6">
              <div className="sub_total d-flex justify-content-between ">
                <p>Subtotal</p>
                <p>${subTotal.toFixed(2)}</p>
              </div>
              <div className="sub_total d-flex justify-content-between border-bottom">
                <p>Shipping Cost</p>
                <p>$10</p>
              </div>
              <div className="sub_total d-flex justify-content-between">
                <p>Total</p>
                <p>{total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
