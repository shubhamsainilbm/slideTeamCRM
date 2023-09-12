import React, { useEffect } from "react";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import { useNavigate } from "react-router-dom";
const LogOutBtn = () => {
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);
  // if (isSuccess) navigate("/");
  const onClickLogout = () => sendLogout();

  if (isLoading)
    return (
      <>
        <span
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
      </>
    );

  if (isError) return <p>{error.data?.message}</p>;
  return (
    <button className="btn_logout" onClick={onClickLogout}>
      Logout
    </button>
  );
};

export default LogOutBtn;
