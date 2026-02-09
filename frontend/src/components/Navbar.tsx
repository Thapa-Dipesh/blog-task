import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  logOut,
  selectCurrentUser,
  selectIsLoggedIn,
} from "../features/app/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../features/api/authApi";
import toast from "react-hot-toast";

const Navbar = () => {
  // Base styles for all links
  const baseStyle =
    "text-sm font-medium transition-all duration-200 border-b-2 py-1";

  const user = useSelector(selectCurrentUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    await logout().unwrap();
    dispatch(logOut());

    navigate("/login");
    toast.success("Logged out successfully");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/70 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
        {/* Logo / Brand Name */}
        <div className="flex items-center">
          <Link
            to="/"
            className="text-xl font-black tracking-tighter text-slate-900"
          >
            KODEX<span className="text-orange-500">.</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${baseStyle} ${isActive ? "text-slate-900 border-slate-900" : "text-slate-500 border-transparent hover:text-slate-900 hover:border-slate-200"}`
            }
          >
            Posts
          </NavLink>

          {isLoggedIn && (
            <>
              <NavLink
                to="/create"
                className={({ isActive }) =>
                  `${baseStyle} ${isActive ? "text-slate-900 border-slate-900" : "text-slate-500 border-transparent hover:text-slate-900 hover:border-slate-200"}`
                }
              >
                Create Post
              </NavLink>

              <NavLink
                to="/my-blogs"
                className={({ isActive }) =>
                  `${baseStyle} ${isActive ? "text-slate-900 border-slate-900" : "text-slate-500 border-transparent hover:text-slate-900 hover:border-slate-200"}`
                }
              >
                My Posts
              </NavLink>
            </>
          )}
        </div>

        {/* Action Button */}
       <div className="flex items-center justify-center gap-4">
         {isLoggedIn ? (
          <>
            <p>{user?.user?.name}</p>
            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition-all duration-200 active:scale-95 cursor-pointer"
            >
              Log Out
            </button>
          </>
        ) : (
          <div>
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition-all duration-200 active:scale-95"
            >
              Admin Login
            </Link>
          </div>
        )}
       </div>
      </div>
    </nav>
  );
};

export default Navbar;
