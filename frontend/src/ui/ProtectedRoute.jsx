import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // Try to get the user or token from localStorage or your Auth Context
  const token = localStorage.getItem("_grecaptcha");

  // If no token exists, send them back to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If token exists, render the Dashboard (children)
  return children;
}
