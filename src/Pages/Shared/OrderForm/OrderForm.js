import React from "react";

const OrderForm = (props) => {
  const {
    handleOrder,
    isOrderPlaced,
    handleChange,
    userInfo,
    isConfirmLoading,
  } = props;
  return (
    <div>
      <form onSubmit={handleOrder}>
        {isOrderPlaced.length > 0 ? (
          <p className="alert alert-success">{isOrderPlaced}</p>
        ) : null}
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
            value={userInfo.address}
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
            value={userInfo.postCode}
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
            value={userInfo.phone}
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-outline-dark custom_btn w-100 mt-3">
          {isConfirmLoading ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            "Confirm Order"
          )}
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
