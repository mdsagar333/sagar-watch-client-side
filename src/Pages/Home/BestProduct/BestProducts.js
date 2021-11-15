import React, { useEffect, useState } from "react";
import useContextAPI from "../../../Hooks/useContextAPI";
import Product from "../../Shared/Product/Product";
import Spinner from "../../Shared/Spinner/Spinner";

const BestProducts = () => {
  const [bestProducts, setBestProducts] = useState([]);
  const [productLoading, setProductLoading] = useState(true);

  useEffect(() => {
    setProductLoading(true);
    fetch("https://fierce-bastion-00988.herokuapp.com/products?limit=6")
      .then((res) => res.json())
      .then((data) => {
        setBestProducts(data.products);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setProductLoading(false);
      });
  }, []);

  if (productLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="product_title_container text-center mt-5">
        <h5 className="text-uppercase custom_letter_spacing">
          Latest Watches You Can't Resist!
        </h5>
        <h1 className="mb-4">Our Best Deals</h1>
      </div>
      <section className="products-container container">
        <div className="row g-4">
          {bestProducts.map((watch, index) => (
            <Product key={watch._id} {...watch} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default BestProducts;
