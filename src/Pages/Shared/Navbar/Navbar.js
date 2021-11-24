import React, { useEffect, useRef, useState } from "react";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";
import useContextAPI from "../../../Hooks/useContextAPI";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Navbar = () => {
  const { user, logout, setNavSize, cartLength } = useContextAPI();
  const navRef = useRef();
  useEffect(() => {
    setNavSize(navRef.current.offsetHeight);
  });

  console.log(user);

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
                <li className="nav-item d-flex">
                  {/* dropdown */}
                  <div className="dropdown ">
                    <button
                      className="btn nav-link active fw-bold dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Account
                    </button>
                    <ul
                      className="dropdown-menu p-2"
                      aria-labelledby="dropdownMenuButton1"
                      style={{ left: "-25%" }}
                    >
                      <li className="d-flex justify-content-center mb-2">
                        <img
                          className="rounded-circle"
                          src={
                            user.photoURL ||
                            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                          }
                          style={{ width: "40px" }}
                        ></img>
                      </li>
                      <li className="d-flex justify-content-center">
                        <span className="text-muted fw-bold text-uppercase">
                          {user.displayName}
                        </span>
                      </li>
                      <li className="mt-3">
                        <Link
                          className="nav-link btn text-dark fw-bold dropdown-item"
                          to="/account-settings"
                        >
                          Account Settings
                        </Link>
                      </li>
                      <li>
                        <button
                          className="nav-link btn text-dark fw-bold w-100"
                          onClick={logout}
                          to="/login"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                  {/*end dropdown */}
                  {/* <button
                    className="nav-link btn active fw-bold"
                    onClick={logout}
                    to="/login"
                  >
                    Logout
                  </button> */}
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
