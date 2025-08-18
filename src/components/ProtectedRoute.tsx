import { Navigate, useLocation } from "react-router-dom";
import { useUserStore } from "@/stores/User/User";
import { type ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isAdminAuthenticated, isLoading } = useUserStore();
  const location = useLocation();
  if (isLoading) {
    return <div>Loading.....</div>;
  }
  if (location.pathname.includes("/admin")) {
    if (!isLoading && !isAdminAuthenticated) {
      return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }
  } else {
    if (!isLoading && !isAuthenticated) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
