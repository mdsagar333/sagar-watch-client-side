import React, { createContext, useState, useEffect } from "react";
import useFirebaseAuth from "../Hooks/useFirebaseAuth";
import { getDB } from "../utils/utils";

export const contextAPI = createContext();

const AllContext = ({ children }) => {
  const [watchesData, setWatchesData] = useState([]);
  const [navSize, setNavSize] = useState();
  const [isDataLoading, setDataLoading] = useState(true);
  const auth = useFirebaseAuth();
  const [cartLength, setCartLength] = useState(0);

  useEffect(() => {
    setDataLoading(true);
    fetch("https://fierce-bastion-00988.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => {
        setWatchesData(data.products);
      })
      .catch((err) => {})
      .finally(() => {
        setDataLoading(false);
      });
  }, []);

  useEffect(() => {
    const cart = getDB();
    let len;
    if (cart) {
      len = Object.keys(cart).length;
    } else {
      len = 0;
    }
    setCartLength(len);
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
        cartLength,
        setCartLength,
      }}
    >
      {children}
    </contextAPI.Provider>
  );
};

export default AllContext;
