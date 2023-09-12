import React, { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import JobAssignForm from "./JobAssignForm";
import useAuth from "../../hooks/useAuth";
import UpdateJob from "./UpdateJob";
import AsideBox from "../../components/AsideBox";
import Comments from "../comments/Comments";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function CreateJob({ job }) {
  const navigate = useNavigate();
  const { permissions } = useAuth();
  // console.log("jddddd", job._id);
  const date = new Date(job.createdAt).toLocaleDateString("en-us");
  console.log("qqqq", job);

  const ChatData = [
    {
      sender_msg: "Worem ipsum dolor sit amet, consectetur adipiscing elit.",
      send_time: "3:14 PM , 23-Jun",
      receiver_msg: "Worem ipsum dolor sit amet, consectetur",
      receive_time: "3:14 PM , 23-Jun",
    },
    {
      sender_msg: "Worem ipsum dolor sit amet, consectetur adipiscing elit.",
      send_time: "3:14 PM , 23-Jun",
      receiver_msg: "Worem ipsum dolor sit amet, consectetur",
      receive_time: "3:14 PM , 23-Jun",
    },
    {
      sender_msg: "Worem ipsum dolor",
      send_time: "3:14 PM , 23-Jun",
      receiver_msg: "Worem ipsum dolor sit",
      receive_time: "3:14 PM , 23-Jun",
    },
  ];

  return (
    <>
      <DashboardLayout>
        <section className="job_description_sec">
          <div className="created_by px-3 py-2 mb-3 rounded d-lg-flex d-block justify-content-between align-items-center">
            <div className="d-md-flex d-block gap-4 mb-4 mb-md-2 mb-md-0 py-md-2">
              {permissions.view.createdBy && (
                <p className="mb-md-0 mb-3">
                  Created By: {job.createdBy?.name}
                </p>
              )}
              {permissions.view.createdOn && (
                <p className="mb-md-0 mb-3">Created on: {date}</p>
              )}
              {permissions.view.priority && (
                <p className="mb-md-0 mb-3">
                  Priority:
                  <span
                    className={`${
                      job.priority === "medium"
                        ? "blue_box"
                        : job.priority === "high"
                        ? "red_box"
                        : "green_box"
                    } text-capitalize`}
                  >
                    {job.priority}
                  </span>
                </p>
              )}
            </div>

            <div className="d-md-flex  d-block gap-4">
              {permissions.view.downloadDocket && (
                <button type="button" className="btn_docket mb-3 mb-md-0">
                  Download Docket
                  <svg
                    className="ms-2"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.99968 16.6668C4.54134 16.6668 4.14884 16.5035 3.82218 16.1768C3.49551 15.8502 3.33245 15.4579 3.33301 15.0002V12.5002H4.99968V15.0002H14.9997V12.5002H16.6663V15.0002C16.6663 15.4585 16.503 15.851 16.1763 16.1777C15.8497 16.5043 15.4575 16.6674 14.9997 16.6668H4.99968ZM9.99968 13.3335L5.83301 9.16683L6.99968 7.9585L9.16634 10.1252V3.3335H10.833V10.1252L12.9997 7.9585L14.1663 9.16683L9.99968 13.3335Z"
                      fill="white"
                    />
                  </svg>
                </button>
              )}
              {/* Download Docket Button */}
              <br className="d-block d-md-none" />
              {permissions.view.updateJob && (
                <>
                  <UpdateJob />
                </>
              )}
              {/* EDIT BUTTON */}
            </div>
          </div>
          {/* HEAD BOX */}

          <div className="row">
            <div className="col-md-7 col-lg-8 col-xl-8">
              {permissions.view.keyword && (
                <div className="keyword_box rounded px-3 py-2 mb-3">
                  <h6 className="mb-0">Keyword</h6>
                  <hr />
                  <p>{job.keyword}</p>
                </div>
              )}
              {/* keyword */}

              <div className="blog-title rounded mb-3">
                {permissions?.view?.blogTitle && (
                  <div className="keyword_box  rounded px-3 py-2 ">
                    <h6 className="mb-0">Blog Title</h6>
                    <hr />
                    <p>{job.blogTitle}</p>
                  </div>
                )}
                {permissions?.view?.products && (
                  <div className="keyword_box rounded px-3 py-2 ">
                    <h6 className="mb-0">Products</h6>
                    <hr />
                    <p>{job.products}</p>
                  </div>
                )}
                {/* Products */}

                {permissions?.view?.alliedkeyword && (
                  <div className="keyword_box rounded px-3 py-2 ">
                    <h6 className="mb-0">Allied Keyword</h6>
                    <hr />
                    <p>{job.alliedKeyword}</p>
                  </div>
                )}
                {/* Allied Keyword */}

                {permissions?.view?.questions && (
                  <div className="keyword_box rounded px-3 py-2 ">
                    <h6 className="mb-0">Questions</h6>
                    <hr />
                    {job?.questions?.map((questions, index) => {
                      // console.log("firstqqqq", questions);
                      return (
                        <p className="mb-1" key={index}>
                          <b>{index + 1}</b>{" "}
                          {questions?.questions
                            ? questions?.questions
                            : questions}
                        </p>
                      );
                    })}
                  </div>
                )}
                {/* Questions */}

                {permissions?.view?.interlinkingBlogs && (
                  <div className="keyword_box rounded px-3 py-2 ">
                    <h6 className="mb-0">Interlinking Blogs</h6>
                    <hr />
                    {job?.interlinkingBlogs.map((interlinkingBlogs, index) => (
                      <p className="mb-1" key={index}>
                        <b>{index + 1}</b>{" "}
                        {interlinkingBlogs?.interlinkingBlogs
                          ? interlinkingBlogs?.interlinkingBlogs
                          : interlinkingBlogs}
                      </p>
                    ))}
                  </div>
                )}
                {/* Interlinking Blogs */}

                {/* Comments */}
              </div>
              {/* BLOG TITLE BOX */}

              {permissions?.view?.comments && <Comments />}
              {/* Add Comment Button */}
            </div>

            <div className="col-md-5 col-lg-4 col-xl-4">
              <div className="d-xl-flex d-block mb-3 gap-2 justify-content-between mt-5 mt-md-0 ">
                {permissions?.view?.keywordAnalystAndAuthorChat &&
                  permissions?.edit?.keywordAnalystAndAuthorChat &&
                  job?.assignJob?.author !== "" && (
                    <button
                      onClick={() => navigate(`/chats/${"KA"}/${job?._id}`)}
                      type="button"
                      className="btn_green d-flex align-items-center mb-3 mb-xl-0 mx-auto mx-lg-0"
                    >
                      Kw. Analyst-Author Chat
                      <img
                        src="/images/icons/chat.svg"
                        alt="icon"
                        className="ms-2"
                      />
                    </button>
                  )}

                {permissions?.view?.evaluatorAndAuthorChat &&
                  permissions?.edit?.evaluatorAndAuthorChat &&
                  job?.assignJob?.evaluator?.evaluatedBy !== "" &&
                  job?.assignJob?.evaluator !== "" &&
                  job?.assignJob?.evaluator?.gScreenShoot === true &&
                  job?.assignJob?.evaluator?.blogDoc === true && (
                    <button
                      type="button"
                      className="btn_green d-flex align-items-center mx-auto mx-lg-0"
                      onClick={() => navigate(`/chats/${"EA"}/${job?._id}`)}
                    >
                      Evaluator-Author Chat
                      <img
                        src="/images/icons/chat.svg"
                        alt="icon"
                        className="ms-2"
                      />
                    </button>
                  )}
              </div>
              {/* CHAT BUTTONS */}
              <JobAssignForm jobId={job?._id} assignJobId={job?.assignJobId} />
            </div>
          </div>
          {/* row*/}
        </section>
      </DashboardLayout>

      {/* <!-- Modal --> */}
      <div
        class="modal fade modal__chat__box"
        id="chatOptionModal"
        tabindex="-1"
        aria-labelledby="chatOptionModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-header border-0 p-0 pt-1">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body ">
              <div className="main_team_inbox d-md-flex d-block">
                <div className="aside_box d-none d-md-block d-lg-block d-xxl-block">
                  <AsideBox />
                </div>

                <div className="go__back d-md-none d-lg-none  d-xxl-none ">
                  <div
                    className="text-start ps-2 d-flex align-items-center gap-1"
                    role="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="14"
                      viewBox="0 0 448 512"
                    >
                      <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                    </svg>
                    Back
                  </div>
                </div>

                <div className="chat__box w-100 border rounded position-relative">
                  <div className="head rounded d-flex justify-content-between align-items-center p-3">
                    <h6 className="mb-0">Evaluator-Author Chat</h6>
                  </div>
                  {/* chat head */}

                  <div className="main_chat_body position-relative scroll">
                    <div className="chat_body p-3 position-absolute w-100">
                      {ChatData.map((val, i) => {
                        return (
                          <div className="row" key={i}>
                            <div className="col-md-12 text-end">
                              <div className="d-flex align-items-center gap-3 justify-content-end">
                                <div className="sender_box mb-3 ">
                                  <p>{val.sender_msg} </p>
                                  <span className="text-end">
                                    {val.send_time}
                                  </span>
                                </div>
                                <div className="s_img ">
                                  <img
                                    src="/images/user1.png"
                                    alt=""
                                    className="rounded-circle"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="receiver__main d-flex gap-3">
                                <div className="r_img">
                                  <img
                                    src="/images/user.png"
                                    alt=""
                                    className="rounded-circle"
                                  />
                                </div>
                                <div className="rec_box mb-3">
                                  <p> {val.receiver_msg} </p>
                                  <div className="text-end">
                                    <span> {val.receive_time}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {/* chat body */}

                  <div className="input_box position-absolute w-100">
                    <div class="input-group ">
                      <input
                        type="text"
                        class="form-control shadow-none border-0"
                        placeholder="Type a message....."
                      />
                      <span class="input-group-text border-0" id="basic-addon2">
                        Send
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="ms-2"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M2 13.3332V2.6665L14.6667 7.99984L2 13.3332ZM3.33333 11.3332L11.2333 7.99984L3.33333 4.6665V6.99984L7.33333 7.99984L3.33333 8.99984V11.3332Z"
                            fill="#44C025"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                  {/* Input// send msg  */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
