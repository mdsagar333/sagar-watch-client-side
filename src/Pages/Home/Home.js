import React from "react";
import BestProducts from "./BestProduct/BestProducts";
import Blog from "./Blogs/BlogContainer";
import Header from "./Header/Header";

const Home = () => {
  return (
    <>
      <Header></Header>
      <BestProducts />
      <Blog />
    </>
  );
};

export default Home;
