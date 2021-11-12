import React from "react";
import productImg from "../../../images/addProduct.png";

const AddProduct = () => {
  return (
    <div className="addProduct_container">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-5">
            <h1>Add a Product</h1>
          </div>
          <div className="col-12 col-md-7">
            <img src={productImg} alt="" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
