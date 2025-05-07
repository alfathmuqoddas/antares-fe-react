// src/components/ProtectedRoute.js
import { Navigate, Outlet } from "react-router";
import useAuth from "@/store/useAuth"; // Or your auth hook/context
import AdminLayout from "./adminLayout";
import UserLayout from "./userLayout";

const ProtectedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { user } = useAuth();

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.additionalInfo.roles)) {
    // Redirect to an unauthorized page if role doesn't match
    return <Navigate to="/unauthorized" replace />;
  }

  if (allowedRoles && allowedRoles.includes("admin")) {
    return <AdminLayout />;
  }

  if (allowedRoles && allowedRoles.includes("user")) {
    return <UserLayout />;
  }
};

export default ProtectedRoute;
