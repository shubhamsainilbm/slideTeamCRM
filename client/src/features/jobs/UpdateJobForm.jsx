import InputField from "../../components/InputField";
import JobQuestions from "./JobQuestions";
import JobInterlinkingBlogs from "./JobInterlinkingBlogs";
import TextAreaField from "../../components/TextAreaField";
import SelectField from "../../components/SelectField";
import { priorityArrList } from "../../config/priorityList";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUpdateJobMutation } from "./jobsApiSlice";
import { toast } from "react-toastify";

const UpdateJobForm = ({ jobData, offcanvas, closeIsActive }) => {
  const [updateJob, { isSuccess, isLoading, isError, error }] =
    useUpdateJobMutation();
  // console.log("jobsData", jobData);
  const [queData, setQueData] = useState(jobData?.questions);
  const [interLinkBlogData, setInterLinkBlogData] = useState(
    jobData?.interlinkingBlogs
  );
  // const [questData, setQuestData] = useState(queData);
  // console.log("Sdasdasdasd", queData);

  const [job, setJob] = useState({
    id: jobData?._id,
    keyword: jobData?.keyword,
    blogTitle: jobData?.blogTitle,
    products: jobData?.products,
    alliedKeyword: jobData?.alliedKeyword,
    questions: queData,
    interlinkingBlogs: interLinkBlogData,
    priority: jobData?.priority,
    comments: jobData?.comments,
  });
  // console.log("dsfdsfdsfdsfs", job);
  const questionsData = (qData) => {
    queData.map((items) => {
      qData.push(items);
    });
    setJob({ ...job, questions: qData });
  };
  const interlinkingBlogsData = (inBData) => {
    interLinkBlogData.map((items) => {
      inBData.push(items);
    });
    setJob({ ...job, interlinkingBlogs: inBData });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };
  const handleSelectChange = (e) => {
    const { value } = e.target;
    setJob({ ...job, priority: value });
  };
  const formSubmit = async (e) => {
    e.preventDefault();
    console.log("job", job);
    const {
      keyword,
      blogTitle,
      products,
      alliedKeyword,
      questions,
      interlinkingBlogs,
      priority,
      comments,
    } = job;
    try {
      if (
        keyword === "" ||
        blogTitle === "" ||
        products === "" ||
        alliedKeyword === "" ||
        comments === ""
      ) {
        return toast.error("All Field are required");
      }
      document.getElementById("closeJobBtn").click();
      await updateJob(job);
    } catch (error) {
      console.log("dsdsd", error);
    }
  };
  const handleQRemoveClick = (index) => {
    const list = [...queData];
    list.splice(index, 1);
    setQueData(list);
    setJob({ ...job, questions: list });
  };
  const handleJRemoveClick = (index) => {
    const list = [...interLinkBlogData];
    list.splice(index, 1);
    setInterLinkBlogData(list);
    setJob({ ...job, interlinkingBlogs: list });
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Job Update SuccessFully");
    }
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, isError]);
  return (
    <>
      <div className="create_job_offcanvas">
        <div
          className={`offcanvas-end px-0 px-md-4 ${offcanvas}`}
          tabindex="-1"
          id="offcanvasCreateJob"
          aria-labelledby="offcanvasCreateJobLabel"
        >
          <div class="offcanvas-header ">
            <h5 id="offcanvasCreateJobLabel"></h5>
            {closeIsActive && (
              <button
                type="button"
                class="btn-close shadow-none text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                id="closeJobBtn"
              ></button>
            )}
          </div>
          <div class="offcanvas-body text-left">
            <form onSubmit={formSubmit}>
              <InputField
                label={"Keyword"}
                name={"keyword"}
                value={job.keyword}
                handleChange={handleChange}
              />

              <InputField
                label={"Blog Title"}
                name={"blogTitle"}
                value={job.blogTitle}
                isRequired={true}
                handleChange={handleChange}
              />
              <InputField
                label={"Products"}
                name={"products"}
                value={job.products}
                handleChange={handleChange}
              />
              <InputField
                label={"Allied Keyword"}
                name={"alliedKeyword"}
                value={job.alliedKeyword}
                handleChange={handleChange}
              />

              <JobQuestions questionsData={questionsData} />
              {queData?.map((item, i) => {
                return (
                  <div
                    style={{
                      backgroundColor: "#e8f6ff",
                      padding: ".6rem 1rem",
                      borderRadius: "6px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <p style={{ margin: "0px" }}>
                      <b>{i + 1}</b> {item?.questions ? item?.questions : item}
                    </p>
                    <span onClick={() => handleQRemoveClick(i)}>
                      {" "}
                      <img
                        src={"/images/trash.png"}
                        style={{ width: "14px" }}
                        alt="trash"
                      />
                    </span>
                  </div>
                );
              })}
              {/* <div style={{ marginTop: 20 }}>
              {JSON.stringify(questionsList.questions)}
            </div> */}
              <JobInterlinkingBlogs
                interlinkingBlogsData={interlinkingBlogsData}
              />
              {interLinkBlogData?.map((item, i) => {
                return (
                  <div
                    style={{
                      backgroundColor: "#e8f6ff",
                      padding: ".6rem 1rem",
                      borderRadius: "6px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <p style={{ margin: "0px" }}>
                      <b>{i + 1}</b>{" "}
                      {item?.interlinkingBlogs ? item?.interlinkingBlogs : item}
                    </p>
                    <span onClick={() => handleJRemoveClick(i)}>
                      <img
                        src={"/images/trash.png"}
                        style={{ width: "14px" }}
                        alt="trash"
                      />
                    </span>
                  </div>
                );
              })}
              <SelectField
                label={"Priority"}
                value={job.priority}
                mapsItem={priorityArrList}
                name={"priority"}
                handleChange={handleSelectChange}
              />

              <TextAreaField
                label={"Comments"}
                rows={3}
                name={"comments"}
                value={job.comments}
                handleChange={handleChange}
              />

              <button
                className="btn_create"
                type="submit"
                data-bs-dismiss={isSuccess ? "offcanvas" : ""}
              >
                {isLoading ? "Loading.." : "Update Job"}
                <svg
                  className="ms-2"
                  width="15"
                  height="15"
                  viewBox="0 0 18 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.125 7.0625V14.25C14.125 14.4552 14.0826 14.6584 14.0001 14.8479C13.9177 15.0375 13.7968 15.2098 13.6445 15.3549C13.4921 15.4999 13.3113 15.615 13.1122 15.6936C12.9132 15.7721 12.6998 15.8125 12.4844 15.8125H2.64062C2.2055 15.8125 1.7882 15.6479 1.48053 15.3549C1.17285 15.0618 1 14.6644 1 14.25V4.875C1 4.4606 1.17285 4.06317 1.48053 3.77015C1.7882 3.47712 2.2055 3.3125 2.64062 3.3125H9.50992"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.2398 0.39259C17.1798 0.329871 17.1072 0.279377 17.0262 0.244158C16.9452 0.208939 16.8575 0.189727 16.7685 0.187682C16.6795 0.185638 16.5909 0.200803 16.5083 0.232262C16.4256 0.263721 16.3504 0.310821 16.2874 0.370715L15.78 0.851574C15.7185 0.910173 15.684 0.989628 15.684 1.07247C15.684 1.15532 15.7185 1.23477 15.78 1.29337L16.2451 1.73556C16.2756 1.76473 16.3119 1.78788 16.3518 1.80368C16.3917 1.81947 16.4345 1.8276 16.4777 1.8276C16.5209 1.8276 16.5637 1.81947 16.6036 1.80368C16.6435 1.78788 16.6798 1.76473 16.7103 1.73556L17.2049 1.26681C17.4551 1.02892 17.4785 0.641418 17.2398 0.39259ZM14.7542 1.82814L7.35009 8.8672C7.3052 8.90978 7.27257 8.96265 7.25534 9.02072L6.91286 9.9922C6.90466 10.0186 6.90408 10.0465 6.91118 10.0732C6.91828 10.0998 6.93281 10.1242 6.95322 10.1436C6.97363 10.163 6.99918 10.1769 7.02716 10.1836C7.05514 10.1904 7.08452 10.1899 7.1122 10.182L8.13144 9.85587C8.19241 9.83947 8.24792 9.80839 8.29263 9.76564L15.6836 2.71329C15.752 2.64747 15.7904 2.55862 15.7904 2.46603C15.7904 2.37344 15.752 2.28458 15.6836 2.21876L15.2755 1.82814C15.2063 1.76242 15.1126 1.72552 15.0149 1.72552C14.9172 1.72552 14.8234 1.76242 14.7542 1.82814Z"
                    fill="white"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateJobForm;
