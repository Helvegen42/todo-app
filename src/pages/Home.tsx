import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { provider, auth } from "../firebase.config";
import { useAppDispatch, useAppSelector } from "../hooks/tshooks";
import { selectUser, login } from "../features/userSlice";
import { toast } from "react-toastify";

const Home = (): JSX.Element => {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const onGoogleClick = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        const { uid: id, displayName: name, email } = user;

        if (!name || !email)
          throw new Error("Something wrong with name or email");

        // ...
        appDispatch(
          login({
            id,
            name,
            email,
          })
        );

        navigate("/profile");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.user.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        toast(errorMessage);
      });
  };

  return (
    <>
      <section className='heading'>
        <h1>Don't get in trouble - just write all stuff down! </h1>
      </section>
      {user ? (
        ""
      ) : (
        <>
          <button onClick={onGoogleClick} className='btn btn-reverse btn-block'>
            <FaGoogle /> Sign In with Google
          </button>
        </>
      )}
    </>
  );
};

export default Home;
