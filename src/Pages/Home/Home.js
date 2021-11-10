import React from "react";
import Footer from "../Shared/Footer/Footer";
import Navbar from "../Shared/Navbar/Navbar";
import Banner from "./Banner/Banner";

const Home = () => {
  return (
    <>
      <Navbar></Navbar>
      <Banner></Banner>
      <Footer />
    </>
  );
};

export default Home;
