import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isAdmin = false;
  let isSubAdmin = false;
  let isJobAllocator = false;
  //   let userRole = "Employee";
  //   let isRole;

  if (token) {
    const decoded = jwtDecode(token);
    const { userId, userName, userEmail, userRole, permissions, userImage } =
      decoded.userInfo;

    isAdmin = userRole.includes("admin");
    isSubAdmin = userRole.includes("sub-admin");
    isJobAllocator = userRole.includes("job-allocator");
    // isSubAdmin = userRole.includes("sub-admin");
    // isSubAdmin = userRole.includes("sub-admin");
    // isSubAdmin = userRole.includes("sub-admin");
    // isSubAdmin = userRole.includes("sub-admin");

    // if (isManager) userRole = "Manager";
    // if (isAdmin) userRole = "Admin";
    // console.log("permissions", permissions);

    return {
      userId,
      userName,
      userEmail,
      userImage,
      userRole,
      isAdmin,
      isSubAdmin,
      isJobAllocator,
      permissions,
    };
  }

  return {
    userId,
    userEmail: "",
    userRole: "",
    userName: "",
    userImage,
    isAdmin,
    isSubAdmin,
    isJobAllocator,
    permissions,
  };
};
export default useAuth;
