import { Navigate } from "react-router-dom";
import { useUserStore } from "@/stores/User/User";
import { JSX } from "react";

export default function GuestRoute({children}: {children: JSX.Element}) {
    const { isAuthenticated, isLoading } = useUserStore();
    if(isLoading) {
        return (<div>Loading...</div>)
    }
    if(isAuthenticated){
        return <Navigate to="/dashboard" replace />
    }
    return children
}