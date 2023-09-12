import React from "react";
import { useSelector } from "react-redux";
import { selectCommentById } from "./commentsApiSlice";
import defaultImg from "/images/user.svg";
const CommentsData = ({ commentId }) => {
  const comment = useSelector((state) => selectCommentById(state, commentId));
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Date(comment?.createdAt).toLocaleDateString(
    "en-us",
    options
  );
  return (
    <>
      <div className="comment_box d-flex gap-2 align-items-center mb-3">
        <div>
          <span className="d-flex">
            <img
              src={
                comment?.userId?.image !== ""
                  ? comment?.userId?.image
                  : defaultImg
              }
              alt="img"
            />
          </span>
        </div>
        <div>
          <h5 className="mb-0 ">
            {comment?.userId?.email.split("@")[0]}
            <br className="d-block d-md-none" /> <span>{date}</span>
          </h5>
          <p className="mb-0">{comment?.comment}</p>
        </div>
      </div>
    </>
  );
};

export default CommentsData;
