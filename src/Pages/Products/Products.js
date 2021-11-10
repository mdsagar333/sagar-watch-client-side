import React from "react";
import useContextAPI from "../../Hooks/useContextAPI";
import Product from "../Shared/Product/Product";
import Spinner from "../Shared/Spinner/Spinner";

const Products = () => {
  const { watchesData, isDataLoading } = useContextAPI();
  return (
    <div className="shop_container">
      <div className="shop_banner d-flex justify-content-center align-items-center">
        <h1 className="text-light">Our All products</h1>
      </div>
      <div className="products_container mt-4 container">
        {isDataLoading ? (
          <Spinner></Spinner>
        ) : (
          <div className="row g-4">
            {watchesData.map((product) => (
              <Product key={product._id} {...product}></Product>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
