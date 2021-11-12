import React, { createContext, useState, useEffect } from "react";
import useFirebaseAuth from "../Hooks/useFirebaseAuth";

export const contextAPI = createContext();

const AllContext = ({ children }) => {
  const [watchesData, setWatchesData] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [navSize, setNavSize] = useState();
  const auth = useFirebaseAuth();

  useEffect(() => {
    setIsDataLoading(true);
    fetch("http://127.0.0.1:5000/products")
      .then((res) => res.json())
      .then((data) => {
        setWatchesData(data.products);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsDataLoading(false);
      });
  }, []);
  return (
    <contextAPI.Provider
      value={{ watchesData, isDataLoading, ...auth, setNavSize, navSize }}
    >
      {children}
    </contextAPI.Provider>
  );
};

export default AllContext;
