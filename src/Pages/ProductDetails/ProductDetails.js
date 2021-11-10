import React, { useState } from "react";
import { useParams } from "react-router";
import { AiFillPlusSquare, AiFillMinusSquare } from "react-icons/ai";
import useContextAPI from "../../Hooks/useContextAPI";
import Spinner from "../Shared/Spinner/Spinner";
import { Link } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [qnt, setQnt] = useState(1);
  const { watchesData, isDataLoading } = useContextAPI();

  const filteredProduct = watchesData.find(
    (product) => product._id === parseInt(id)
  );

  const handleIncrease = (num) => {
    const newQuantity = qnt + num;
    if (newQuantity >= 10) {
      setQnt(10);
    } else if (newQuantity <= 1) {
      setQnt(1);
    } else {
      setQnt(newQuantity);
    }
  };
  if (isDataLoading) {
    return <Spinner />;
  }
  if (filteredProduct == undefined) {
    return <h1>Not found</h1>;
  }
  const { name, image, description, _id, price, feature, brand } =
    filteredProduct;
  return (
    <div className="container mt-5 p-5">
      <div className="row">
        <div className="col-12 col-md-6 mb-4 mb-md-2">
          <img src={image} alt={name} className="img-fluid" />
        </div>
        <div className="col-12 col-md-6">
          <div className="product_info">
            <h1>{name}</h1>
            <h4 className="text-muted mb-3">${price}</h4>
            <div className="product_underline"></div>
            <p className="text-muted my-4 custom_letter_spacing">
              {description}
            </p>
            <div className="product_underline"></div>
            <div className="feature_container">
              <h6 className="text-capitalize my-3">about this item</h6>
              <ul>
                {feature.map((item, index) => (
                  <li key={index} className="text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <p className="small text-muted fw-bold">Brand: {brand}</p>
          </div>
          <div className="product_btn_handler_container">
            <div className="row">
              <div className="col-4">
                <div className="d-flex align-items-center border p-1">
                  <span className="me-1 btn" onClick={() => handleIncrease(-1)}>
                    <AiFillMinusSquare className="quntity_btn" />
                  </span>
                  <span
                    className="text-center"
                    style={{ fontSize: "34px", width: "30px" }}
                  >
                    {qnt}
                  </span>
                  <span className="ms-1 btn" onClick={() => handleIncrease(1)}>
                    <AiFillPlusSquare className="quntity_btn" />
                  </span>
                </div>
              </div>
              <div className="col-6">
                <button className="btn btn-dark p-3 text-uppercase">
                  Add to cart
                </button>
              </div>
            </div>
          </div>
          <Link to={`/place-order/${_id}`}>
            <button className="btn mt-3 text-uppercase fw-bold btn-outline-dark w-100 p-3">
              buy now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
