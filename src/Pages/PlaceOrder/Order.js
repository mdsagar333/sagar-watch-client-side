import React from "react";
import orderImg from "../../images/order_confirm.png";

const Order = () => {
  return (
    <div className="order_container">
      <h1 className="text-center text-capitalize my-4">Confirm your order</h1>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6">
            <form>
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
                />
              </div>
              <button className="btn btn-outline-dark custom_btn w-100 mt-3">
                Confirm Order
              </button>
            </form>
          </div>
          <div className="col-0 col-md-6 d-none d-md-block">
            <img src={orderImg} alt="" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
