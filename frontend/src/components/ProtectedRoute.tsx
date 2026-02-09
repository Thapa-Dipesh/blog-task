import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectIsLoggedIn } from "../features/app/authSlice";

const ProtectedRoute = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation();

  //  If not logged in, redirect to login page
  // We save the current location in 'state' so we can redirect them back after they login
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If everything is fine, render the child routes (the Outlet)
  return <Outlet />;
};

export default ProtectedRoute;
