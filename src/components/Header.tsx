import { FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { reset, selectUser } from "../features/userSlice";
import { useAppDispatch, useAppSelector } from "../hooks/tshooks";

const Header = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const onLogout = () => {
    dispatch(reset());
    navigate("/");
  };
  const onProfileClick = () => navigate("/profile");

  if (!user)
    return (
      <header className='header'>
        <Link to='/'>ToDo</Link>
      </header>
    );
  const { id } = user;

  return (
    <>
      <header className='header'>
        {id ? (
          <>
            <ul>
              <li>
                <button className='btn btn-profile' onClick={onProfileClick}>
                  <FaUserAlt /> Profile
                </button>
              </li>
            </ul>
            <Link to='/'>ToDo</Link>
            <ul>
              <li>
                <button className='btn btn-logout' onClick={onLogout}>
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </ul>
          </>
        ) : (
          ""
        )}
      </header>
    </>
  );
};

export default Header;
