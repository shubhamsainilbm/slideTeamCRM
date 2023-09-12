import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const AuthAccess = ({ allowedRoles }) => {
  const location = useLocation();
  const { userRole } = useAuth();
  // console.log("userRole", userRole.some);

  const content = allowedRoles.includes(userRole) ? (
    <Outlet />
  ) : (
    <Navigate to="/dashboard" state={{ from: location }} replace />
  );

  return content;
};
export default AuthAccess;
