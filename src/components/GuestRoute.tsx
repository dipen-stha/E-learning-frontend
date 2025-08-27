import { Navigate, useLocation } from "react-router-dom";
import { useUserStore } from "@/stores/User/User";
import { JSX, useEffect } from "react";

export default function GuestRoute({children}: {children: JSX.Element}) {
    const location = useLocation();
    const { isAuthenticated, isAdminAuthenticated, isLoading, fetchSelf, fetchAdminSelf } = useUserStore();
    const isAdmin = location.pathname.includes("/admin") ? true : false
    useEffect(() => {
        isAdmin ? fetchAdminSelf() : fetchSelf();
    }, [])
    if(isAdmin){
        if(isLoading) {
            return (<div>Loading...</div>)
        }

        if(isAdminAuthenticated && location.pathname.includes("/admin/login")){

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