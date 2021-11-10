import React from "react";

const Spinner = () => {
  return (
    <div className="d-flex mt-5 justify-content-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
