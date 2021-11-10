import React, { createContext, useState, useEffect } from "react";

export const contextAPI = createContext();

const AllContext = ({ children }) => {
  const [watchesData, setWatchesData] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    setIsDataLoading(true);
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setWatchesData(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsDataLoading(false);
      });
  }, []);
  return (
    <contextAPI.Provider value={{ watchesData, isDataLoading }}>
      {children}
    </contextAPI.Provider>
  );
};

export default AllContext;
