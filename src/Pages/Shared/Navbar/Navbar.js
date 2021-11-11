import React from "react";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";
import useContextAPI from "../../../Hooks/useContextAPI";

const Navbar = () => {
  const { user, logout } = useContextAPI();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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
              <div className="d-flex">
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
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
