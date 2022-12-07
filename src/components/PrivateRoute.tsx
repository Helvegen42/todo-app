import { Navigate, Outlet } from "react-router-dom";
import useAuthStatus from "../hooks/useAuthStatus";

export const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <>Oops, something went wrong!</>;
  }

  return loggedIn ? <Outlet /> : <Navigate to='/login' />;
};
