import { Navigate, Outlet } from "react-router-dom";
import useAuthStatus from "../hooks/useAuthStatus";

export const PrivateRoute = (): JSX.Element => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <>Oops, something went wrong!</>;
  }

  return loggedIn ? <Outlet /> : <Navigate to='/' />;
};
