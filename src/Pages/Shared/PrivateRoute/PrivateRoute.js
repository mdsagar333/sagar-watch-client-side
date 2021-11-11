import React from "react";
import { Route, Redirect } from "react-router-dom";
import useContextAPI from "../../../Hooks/useContextAPI";
import Spinner from "../Spinner/Spinner";

const PrivateRoute = ({ children, ...rest }) => {
  const { user, userLoading } = useContextAPI();
  if (userLoading) {
    return <Spinner></Spinner>;
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: location } }}
          ></Redirect>
        )
      }
    ></Route>
  );
};

export default PrivateRoute;
