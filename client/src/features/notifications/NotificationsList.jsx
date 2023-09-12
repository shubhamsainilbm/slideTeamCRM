import React, { useEffect } from "react";
import { selectNotificationsById } from "./notificationsApiSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const NotificationsList = ({ notifyId }) => {
  const notify = useSelector((state) =>
    selectNotificationsById(state, notifyId)
  );
  const navigate = useNavigate();
  console.log("dfdsf", notify);
  //   useEffect(() => {
  //     if (isSuccess) {
  //       toast.success("Delete User Success");
  //     }
  //     if (isError) {
  //       console.log("err", error);
  //       toast.error(error.data.message);
  //     }
  //   }, [isSuccess, isError]);

  //   const handleDelete = async (userID) => {
  //     await deleteUser({ id: userID });
  //   };
  let content;

  if (notify) {
    const date = new Date(notify.createdAt).toLocaleDateString("en-us");
    const readAuthor = notify?.notifyTo?.author?.read;
    const readEvaluator = notify?.notifyTo?.evaluator?.read;
    // const handleEdit = () =>  navigate(`/edit-user/${userId}`);
    content = (
      <tr
        className={`${
          readAuthor === false && readEvaluator === false ? "green" : "redColor"
        }`}
      >
        <td>{notify?.jobId?.blogTitle}</td>
        <td>{notify?.jobId?.priority}</td>
        <td>{date}</td>
        {/* ACTIVE BOX */}
        {/* <td>
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
            {isLoading ? "Loading..." : "Delete"}
          </span>
        </td> */}
      </tr>
    );
  } else return null;

  return content;
};

export default NotificationsList;
