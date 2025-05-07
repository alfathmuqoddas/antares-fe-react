// src/components/ProtectedRoute.js
import { Navigate, Outlet } from "react-router";
import useAuth from "@/store/useAuth"; // Or your auth hook/context

const ProtectedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { user } = useAuth();

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to an unauthorized page if role doesn't match
    return <Navigate to="/unauthorized" replace />;
  }

  // If authenticated and role matches, render the child routes/component
  return <Outlet />;
};

export default ProtectedRoute;
