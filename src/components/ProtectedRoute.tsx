import { Navigate, useLocation } from "react-router-dom";
import { useUserStore } from "@/stores/User/User";
import { type ReactNode } from "react";


interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isAuthenticated, isLoading } = useUserStore();
    const location = useLocation();
    if(isLoading) {
        return(<div>Loading.....</div>)
    }
    console.log("Protected Loading:", isLoading)
    console.log("Authenticated:", isAuthenticated)
    if(!isLoading && !isAuthenticated){
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default ProtectedRoute