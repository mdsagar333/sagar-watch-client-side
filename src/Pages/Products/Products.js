import React, { useEffect, useState } from "react";
import useContextAPI from "../../Hooks/useContextAPI";
import Product from "../Shared/Product/Product";
import Spinner from "../Shared/Spinner/Spinner";

const Products = () => {
  const { isDataLoading, setWatchesData } = useContextAPI();
  const [allProdcuts, setAllProducts] = useState([]);
  const [isProductsLoading, setIsProductLoading] = useState(false);

  useEffect(() => {
    setIsProductLoading(true);
    fetch(`http://127.0.0.1:5000/products`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setWatchesData(data.products);
          setAllProducts(data.products);
        }
      })
      .finally(() => {
        setIsProductLoading(false);
      });
  }, []);
  return (
    <div className="shop_container">
      <div className="title_banner d-flex justify-content-center align-items-center">
        <h1 className="text-light">Our All products</h1>
      </div>
      <div className="products_container mt-4 container">
        {isProductsLoading ? (
          <Spinner></Spinner>
        ) : (
          <div className="row g-4">
            {allProdcuts.map((product, index) => (
              <Product key={product._id} {...product} index={index}></Product>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
