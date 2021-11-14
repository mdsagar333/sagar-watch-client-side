import React, { createContext, useState, useEffect } from "react";
import useFirebaseAuth from "../Hooks/useFirebaseAuth";

export const contextAPI = createContext();

const AllContext = ({ children }) => {
  const [watchesData, setWatchesData] = useState([]);
  const [navSize, setNavSize] = useState();
  const [isDataLoading, setDataLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const auth = useFirebaseAuth();

  useEffect(() => {
    setDataLoading(true);
    fetch("http://127.0.0.1:5000/products")
      .then((res) => res.json())
      .then((data) => {
        setWatchesData(data.products);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setDataLoading(false);
      });
  }, []);

  return (
    <contextAPI.Provider
      value={{
        watchesData,
        ...auth,
        setNavSize,
        navSize,
        setWatchesData,
        isDataLoading,
        setBlogs,
        blogs,
      }}
    >
      {children}
    </contextAPI.Provider>
  );
};

export default AllContext;
