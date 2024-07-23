import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useStore } from "../main";

function RequireAuth({children}: PropsWithChildren) {
    const {store} = useStore()
    const auth = store.isAuth;

    if(!auth) return <Navigate to='/log-in' />

    return children
}

export default RequireAuth;