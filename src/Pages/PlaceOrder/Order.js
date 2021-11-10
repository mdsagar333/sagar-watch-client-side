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
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  class="form-control"
                  name="email"
                  aria-describedby="emailHelp"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputPassword1"
                  name="name"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Address
                </label>
                <input
                  type="text"
                  class="form-control"
                  name="address"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Post Code
                </label>
                <input
                  type="number"
                  class="form-control"
                  name="postCode"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Phone
                </label>
                <input
                  type="number"
                  class="form-control"
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
