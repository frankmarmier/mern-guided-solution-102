import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = (props) => {
  const { isLoggedIn, isLoading, ...rest } = props;

  if (isLoading) {
    return null;
  }

  if (isLoggedIn) {
    return <Route {...rest} />;
  } else {
    return <Redirect to="/signin" />;
  }
};

export default ProtectedRoute;
