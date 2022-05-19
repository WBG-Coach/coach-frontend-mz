import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/auth";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute: React.FC<any> = ({ children }) => {
  const location = useLocation();
  const user = useSelector(selectCurrentUser);

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};
