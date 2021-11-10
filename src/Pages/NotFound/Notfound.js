import React from "react";
import { Link } from "react-router-dom";
const Notfound = () => {
  return (
    <div>
      <h1>404 page not found.</h1>
      <Link className="btn btn-outline-dark" to="/home">
        Back Home
      </Link>
    </div>
  );
};

export default Notfound;
