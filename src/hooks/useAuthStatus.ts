import { useState, useEffect } from "react";
import { selectUser } from "../features/userSlice";
import { useAppSelector } from "./tshooks";

const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  const user = useAppSelector(selectUser);
  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    setCheckingStatus(false);
  }, [user]);

  return { loggedIn, checkingStatus };
};

export default useAuthStatus;
