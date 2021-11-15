import React from "react";
import BestProducts from "./BestProduct/BestProducts";
import Blog from "./Blogs/BlogContainer";
import Header from "./Header/Header";
import Testimonial from "./Testimonial/Testimonial";

const Home = () => {
  return (
    <>
      <Header></Header>
      <BestProducts />
      <Blog />
      <Testimonial />
    </>
  );
};

export default Home;
