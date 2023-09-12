import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserById, useDeleteUserMutation } from "./usersApiSlice";
import { toast } from "react-toastify";

const Users = ({ userId }) => {
  const user = useSelector((state) => selectUserById(state, userId));
  const navigate = useNavigate();
  const [deleteUser, { isSuccess, isLoading, isError, error }] =
    useDeleteUserMutation();
  console.log("usersdfsdf", user);
  useEffect(() => {
    if (isSuccess) {
      toast.success("Delete User Success");
    }
    if (isError) {
      console.log("err", error);
      toast.error(error.data.message);
    }
  }, [isSuccess, isError]);

  const handleDelete = async (userID) => {
    await deleteUser({ id: userID });
  };
  let content;

  if (user) {
    // const handleEdit = () =>  navigate(`/edit-user/${userId}`);
    content = (
      <tr>
        <td>#{user.id.slice(-4)}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.mobile}</td>
        <td>{user.role}</td>
        {/* ACTIVE BOX */}
        <td>
          <Link
            className={`${
              user.activeUser ? "green_box" : "red_box"
            } py-1 px-2 text-decoration-none`}
            to="#"
          >
            {user.activeUser ? "Active" : "Inactive"}
          </Link>
        </td>
        <td>
          <Link className="green_box" to={`/edit-user/${userId}`}>
            View/Edit
          </Link>{" "}
          <span className="red_box" onClick={() => handleDelete(user.id)}>
            {isLoading ? (
              <>
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              </>
            ) : (
              "Delete"
            )}
          </span>
        </td>

        {/* INACTIVE BOX */}
        {/* <td><span className="red_box py-1 px-2">{val.action}</span></td> */}
      </tr>
    );
  } else return null;

  return content;
};

export default Users;
