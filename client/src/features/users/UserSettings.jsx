import React from "react";
import { useGetUserQuery } from "./usersApiSlice";
import { useParams } from "react-router-dom";
import UserSettingEdit from "./UserSettingEdit";

const UserSettings = () => {
  const { id } = useParams();
  const {
    data: user,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetUserQuery(id);
  if (!user)
    return (
      <>
        <div class="text-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
    );

  const content = <UserSettingEdit user={user} />;

  return content;
};

export default UserSettings;
