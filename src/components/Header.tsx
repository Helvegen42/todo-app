import { FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { reset, selectUser } from "../features/userSlice";
import { useAppDispatch, useAppSelector } from "../hooks/tshooks";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { id } = useAppSelector(selectUser);
  const onLogout = () => {
    dispatch(reset());
    navigate("/");
  };
  const onProfileClick = () => navigate("/profile");
  return (
    <>
      <header className='header'>
        <ul>
          {id ? (
            <li>
              <button className='btn btn-profile' onClick={onProfileClick}>
                <FaUserAlt /> Profile
              </button>
            </li>
          ) : (
            ""
          )}
        </ul>

        <Link to='/'>ToDo</Link>

        <ul>
          {id ? (
            <li>
              <button className='btn btn-logout' onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          ) : (
            ""
          )}
        </ul>
      </header>
    </>
  );
};

export default Header;
