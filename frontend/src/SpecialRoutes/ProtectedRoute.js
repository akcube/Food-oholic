import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../services/authContext";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  return (
    (!useAuth().isAuthenticated()) ? <Navigate to='/login' /> : children
  );
}

export default ProtectedRoute;