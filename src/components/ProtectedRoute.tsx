import { JSX, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useUserStore } from "@/stores//User/User";

interface ProtectedRouteProps {
  children: JSX.Element;
  admin?: boolean; // optional flag for admin routes
}

export function ProtectedRoute({ children}: ProtectedRouteProps) {
  const {
    isAuthenticated,
    isAuthChecked,
    fetchSelf,
  } = useUserStore();

  useEffect(() => {

      if (!isAuthChecked) fetchSelf();
  }, [isAuthChecked, fetchSelf]);

  // Show loader until auth check completes
  if (!isAuthChecked) return <div>Loading...</div>;

  // Redirect if not authenticated
 if (!isAuthenticated){
    console.log("Student 403")
    return <Navigate to="/login"/>;
  }

  return children;
}
