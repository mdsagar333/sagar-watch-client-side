import React from "react";
import useContextAPI from "../../../Hooks/useContextAPI";
import Product from "../../Shared/Product/Product";
import Spinner from "../../Shared/Spinner/Spinner";

const BestProducts = () => {
  const { watchesData, isDataLoading } = useContextAPI();
  const bestDeals = watchesData.slice(0, 6);
  console.log(bestDeals);

  if (isDataLoading) {
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
          {bestDeals.map((watch) => (
            <Product key={watch._id} {...watch} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default BestProducts;
