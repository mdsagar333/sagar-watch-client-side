import React from "react";
import { Link } from "react-router-dom";

const Product = ({ image, name, price, description, _id, brand }) => {
  return (
    <div className="col-6 col-md-3 d-flex align-items-stretch">
      <div className="card">
        <img src={image} className="card-img-top" alt={name} />
        <div className="card-body text-center">
          <span className="small text-muted">{brand}</span>
          <h6 className="card-title mt-3">{name}</h6>
          <p className="card-text custom_letter_spacing">
            {description.substr(0, 40)}...
          </p>
          <h6 className="text-muted mb-0">${price}</h6>
        </div>
        <div className="card-footer border-0 bg-transparent p-0 custom_letter_spacing fw-bold">
          <Link
            to={`/product/${_id}`}
            className="btn text-uppercase btn_custom w-100"
          >
            Buy This Product
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
