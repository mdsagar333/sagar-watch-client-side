import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="banner-container d-flex align-items-center">
      <div className="banner-content text-light p-3 p-md-5">
        <h6 className="text-uppercase custom_letter_spacing">
          timeless & elegant
        </h6>
        <h1 className="text-uppercase ">new arrivals</h1>
        <p className="text-capitalize">
          complete your everyday look with a classic leather strap watch.
        </p>
        <button className="btn btn-primary text-uppercase">explore now</button>
      </div>
    </div>
  );
};

export default Banner;
