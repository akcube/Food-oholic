import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../services/authContext";

function UnauthenticatedRoute({ children }: { children: JSX.Element }) {
  return (
    (useAuth().isAuthenticated()) ? <Navigate to='/home'/> : children
  );
}

export default UnauthenticatedRoute;