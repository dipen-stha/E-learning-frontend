import { Navigate, useLocation } from "react-router-dom";
import { useUserStore } from "@/stores/User/User";
import { JSX } from "react";

export default function GuestRoute({children}: {children: JSX.Element}) {
    const location = useLocation();
    const { isAuthenticated, isAdminAuthenticated, isLoading } = useUserStore();
    if(location.pathname.includes("/admin")){
        console.log(isAdminAuthenticated)
        if(isLoading) {
            return (<div>Loading...</div>)
        }
        if(isAdminAuthenticated){
            return <Navigate to="/admin/dashboard" replace />
        }
        return children
    } else {
        if(isLoading) {
            return (<div>Loading...</div>)
        }
        if(isAuthenticated){
            return <Navigate to="/dashboard" replace />
        }
        return children
    }
}