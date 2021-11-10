import React from "react";
import logo from "../../../images/logo.png";
const Logo = () => {
  return (
    <div>
      <div className="logo-container d-flex align-items-center">
        <img src={logo} alt="logo" style={{ width: "80px" }} />
        <article className="logo-text" style={{ lineHeight: ".9" }}>
          <span className="custom_border mb-0 text-uppercase fw-bold custom_base_color">
            sagar watches
          </span>{" "}
          <br />
          <span className="text-uppercase small">since - 1991</span>
        </article>
      </div>
    </div>
  );
};

export default Logo;
