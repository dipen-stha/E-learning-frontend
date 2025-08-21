import { JSX, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useUserStore } from "@/stores//User/User";

interface ProtectedRouteProps {
  children: JSX.Element;
  admin?: boolean; // optional flag for admin routes
}

export function AdminProtectedRoute({ children}: ProtectedRouteProps) {
  const {
    isAdminAuthenticated,
    isAdminAuthChecked,
    fetchAdminSelf,
  } = useUserStore();

  useEffect(() => {
      if (!isAdminAuthChecked) fetchAdminSelf();
  }, [isAdminAuthChecked, fetchAdminSelf]);

  if (!isAdminAuthChecked) return <div>Loading...</div>;

    if(!isAdminAuthenticated) {
      return <Navigate to="/admin/login" />
    }

  return children;
}
