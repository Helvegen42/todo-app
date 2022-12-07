import { useState, useEffect } from "react";
import { selectUser } from "../features/userSlice";
import { useAppSelector } from "./tshooks";

const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  const { id } = useAppSelector(selectUser);

  useEffect(() => {
    if (id) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    setCheckingStatus(false);
  }, [id]);

  return { loggedIn, checkingStatus };
};

export default useAuthStatus;
