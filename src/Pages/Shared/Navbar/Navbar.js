import React, { useEffect, useRef, useState } from "react";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";
import useContextAPI from "../../../Hooks/useContextAPI";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Navbar = () => {
  const { user, logout, setNavSize, cartLength } = useContextAPI();
  const navRef = useRef();

  useEffect(() => {
    console.log(navRef.current.offsetHeight);
    setNavSize(navRef.current.offsetHeight);
  });

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark "
      ref={navRef}
      style={{ backgroundColor: "#297B70" }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <Logo></Logo>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                className="nav-link active fw-bold"
                aria-current="page"
                to="/home"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active fw-bold" to="/products">
                Explore All Products
              </Link>
            </li>
            {user ? (
              <div className="d-flex flex-column flex-lg-row">
                <li className="nav-item">
                  <Link className="nav-link active fw-bold" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link btn active fw-bold"
                    onClick={logout}
                    to="/login"
                  >
                    Logout
                  </button>
                </li>
              </div>
            ) : (
              <li className="nav-item">
                <Link className="nav-link active fw-bold" to="/login">
                  Login
                </Link>
              </li>
            )}
            <li className="nav-item  me-2">
              <Link
                className="nav-link active fw-bold position-relative"
                to="/place-order-cart"
              >
                <AiOutlineShoppingCart
                  style={{ fontSize: "22px" }}
                  className=""
                ></AiOutlineShoppingCart>
                <span
                  className="position-absolute start-90 translate-middle p-0 custom_cart_amount text-warning"
                  style={{ fontSize: "15px" }}
                >
                  {cartLength}
                  <span className="visually-hidden">New alerts</span>
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
