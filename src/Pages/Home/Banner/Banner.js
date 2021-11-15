import React from "react";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
const Banner = () => {
  return (
    <div className="banner-container d-flex align-items-center">
      <div className="banner-content text-light p-3 p-md-5">
        <Fade left delay={100} duration={1500}>
          <h6 className="text-uppercase custom_letter_spacing mb-3">
            timeless & elegant
          </h6>
        </Fade>

        <Fade right delay={200} duration={1500}>
          <h1 className="text-uppercase mb-4">new arrivals</h1>
        </Fade>

        <Fade left delay={300} duration={1500}>
          <p className="text-capitalize custom_letter_spacing">
            complete your everyday look with a classic leather strap watch.
          </p>
        </Fade>
        <Fade bottom delay={400} duration={1500}>
          <Link to="/products" className="btn custom_btn text-uppercase">
            explore now
          </Link>
        </Fade>
      </div>
    </div>
  );
};

export default Banner;
