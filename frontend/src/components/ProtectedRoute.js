import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../services/authContext";

const ProtectedRoute = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={props =>
      !useAuth.isAuthenticated() ? <Component {...props} /> : <Navigate to="/" />
    }
  />
);

export default ProtectedRoute;