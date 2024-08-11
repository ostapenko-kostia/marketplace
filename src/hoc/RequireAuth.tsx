import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/store";

function RequireAuth({ children }: PropsWithChildren) {
  const { isAuth } = useAppSelector((state) => state.auth);

  if (!isAuth) return <Navigate to="/log-in" />;

  return children;
}

export default RequireAuth;
