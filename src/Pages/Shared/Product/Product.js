import React from "react";
import { Link } from "react-router-dom";

import Flip from "react-reveal/Flip";

const Product = ({ image, name, price, description, _id, brand, index }) => {
  return (
    <Flip left duration={1200} delay={index * 200}>
      <div className="col-12 col-md-3 d-flex align-items-stretch">
        <div className="custom_watch_card">
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
            <div>
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
        </div>
      </div>
    </Flip>
  );
};

export default Product;
