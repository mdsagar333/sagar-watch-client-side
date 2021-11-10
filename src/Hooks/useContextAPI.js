import { useContext } from "react";
import { contextAPI } from "../Context/AllContext";

const useContextAPI = () => {
  return useContext(contextAPI);
};

export default useContextAPI;
