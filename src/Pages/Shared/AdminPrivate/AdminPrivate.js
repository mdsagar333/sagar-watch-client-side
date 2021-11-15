import React from "react";
import { Route, Redirect } from "react-router-dom";
import useContextAPI from "../../../Hooks/useContextAPI";
import Spinner from "../Spinner/Spinner";

const AdminPrivateRoute = ({ children, ...rest }) => {
  const { user, userLoading, admin } = useContextAPI();
  console.log(admin);
  if (userLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user && admin ? (
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

export default AdminPrivateRoute;
