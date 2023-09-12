import React from "react";
import { useAddCommentMutation, useGetCommentsQuery } from "./commentsApiSlice";
import { useParams } from "react-router-dom";
import CommentsData from "./CommentsData";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const Comments = () => {
  const { permissions } = useAuth();
  const { id } = useParams();
  const {
    data: comments,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCommentsQuery();
  const [
    addComment,
    {
      isSuccess: isSuccessComment,
      isLoading: isLoadingComment,
      isError: isErrorComment,
      error: errorComment,
    },
  ] = useAddCommentMutation();

  let content;
  if (isLoading) {
    content = (
      <>
        <div class="text-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
    );
  }

  if (isError) {
    content = <p>{error?.message}</p>;
  }

  if (isSuccess) {
    const { ids, entities } = comments;

    let filterIds = ids?.filter(
      (commentId) => entities[commentId].jobId === id
    );
    const commentData = ids?.length ? (
      filterIds.map((commentId) => (
        <CommentsData key={commentId} commentId={commentId} />
      ))
    ) : (
      <p className="mt-3 ">No Result Found</p>
    );
    content = commentData;
  }

  const [comment, setComment] = useState({
    id: id,
    comment: "",
  });

  const handleChange = (e) => {
    const { value } = e.target;
    setComment({ ...comment, comment: value });
  };
  const formSubmit = async (e) => {
    e.preventDefault();
    console.log(comment);
    try {
      await addComment(comment);
      setComment({ id: id, comment: "" });
      toast.success("Add Comment SuccessFully");
    } catch (error) {
      console.log("dsdsd", error.status);
    }
  };
  useEffect(() => {
    if (isSuccessComment) {
    }
    if (isErrorComment) {
      toast.error(errorComment?.data?.message);
    }
  }, [isSuccessComment, isErrorComment]);
  return (
    <>
      <div className="keyword_box rounded px-3 py-2 ">
        <h6 className="mb-0">Comments</h6>
        <hr />
        {content}
      </div>
      {permissions?.edit?.comments && (
        <form onSubmit={formSubmit}>
          <div className="leave_comment mt-3 mb-3">
            <div class="form-floating">
              <textarea
                class="form-control shadow-none"
                placeholder="Leave a comment here"
                id="floatingTextarea2"
                name={"comment"}
                value={comment?.comment}
                style={{ height: "100px" }}
                onChange={handleChange}
                required
              ></textarea>
              <label for="floatingTextarea2">Leave a comment......</label>
            </div>
          </div>
          {/* LEAVE COMMENTS BOX */}
          <button
            type="submit"
            className="btn_comment d-flex align-items-center"
          >
            {isLoadingComment ? "Loading..." : "Add Comment"}
            <img src="/images/icons/edit.svg" alt="icon" className="ms-2" />
          </button>
        </form>
      )}
    </>
  );
};

export default Comments;
