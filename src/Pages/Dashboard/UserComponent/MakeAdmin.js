import React from "react";

const MakeAdmin = () => {
  return (
    <div className="container">
      <h1 className="text-center mb-4">Make An Admin</h1>
      <div className="row">
        <div className="col-0 col-md-3"></div>
        <div className="col-12 col-md-6">
          <form>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter email address"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
              />
              <button
                className="btn btn-outline-dark"
                type="button"
                id="button-addon2"
              >
                Make Admin
              </button>
            </div>
          </form>
        </div>
        <div className="col-0 col-md-3"></div>
      </div>
    </div>
  );
};

export default MakeAdmin;
