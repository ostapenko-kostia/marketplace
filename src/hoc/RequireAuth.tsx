import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/store";

function RequireAuth({children}: PropsWithChildren) {
    const {isAuth} = useAuthStore()

    if(!isAuth) return <Navigate to='/log-in' />

    return children
}

export default RequireAuth;