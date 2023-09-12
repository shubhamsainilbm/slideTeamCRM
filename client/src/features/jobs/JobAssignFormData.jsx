import React from "react";
import SearchDropdown from "../../components/SearchDropdown";
import InputField from "../../components/InputField";
import { Link, useParams } from "react-router-dom";
import { useGetAuthorAndEvaluatorQuery } from "./jobsApiSlice";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { useUpdateJobAssignMutation } from "../jobAssign/jobAssignApiSlice";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
const JobAssignFormData = ({ jobAssignData, jobId }) => {
  const inputFileBlogRef = useRef(null);
  const inputFileInterRef = useRef(null);
  const { permissions, userRole } = useAuth();
  const { data } = useGetAuthorAndEvaluatorQuery();
  const [updateJobAssign, { isSuccess, isLoading, isError, error }] =
    useUpdateJobAssignMutation();
  // const [author, setAuthor] = useState("");
  // const [evaluator, setEaluator] = useState("");
  const [bDocument, setBDocument] = useState();
  const [bDocumentItem, setbDocumentItem] = useState(
    jobAssignData?.blogDocument
  );
  console.log("asdasdasdasda", jobAssignData);
  const [gShoot, setGShoot] = useState();
  const [gShootItem, setgShootItem] = useState(
    jobAssignData?.grammarlyScreenshot
  );
  const [jobAssign, setJobAssign] = useState({
    id: jobId,
    allocatedTo: jobAssignData?.allocatedTo,
    evaluatedBy: jobAssignData?.evaluatedBy,
    wordCount: jobAssignData?.wordCount,
    scoreGivenByEvaluator: jobAssignData?.scoreGivenByEvaluator,
    dateOfPublishing: jobAssignData?.dateOfPublishing,
    amount: jobAssignData?.amount,
    url: jobAssignData?.url,
    paidOn: jobAssignData?.paidOn,
    blogDocument: [],
    grammarlyScreenshot: [],
  });
  //   console.log(jobAssignData?.grammarlyScreenshot);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobAssign({ ...jobAssign, [name]: value });
  };
  const handleBlogDocumentFileChange = (e) => {
    const fileBlogDocumentObject = e.target.files[0];
    if (!fileBlogDocumentObject) return;
    // console.log("asadasdasd", fileGShootObject);
    if (
      e.target.files[0].type !==
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
      e.target.files[0].type !== "application/msword"
    ) {
      inputFileBlogRef.current.value = null;
      return toast.error("Please Select .doc, .docx");
    }
    setBDocument(fileBlogDocumentObject);
  };
  const handleGShootFileChange = (e) => {
    const fileGShootObject = e.target.files[0];
    if (!fileGShootObject) return;
    console.log(e.target.files[0], "----------------");
    if (
      e.target.files[0].type !== "image/jpeg" &&
      e.target.files[0].type !== "image/png"
    ) {
      inputFileInterRef.current.value = null;
      return toast.error("Please Select .png, .jpg, .jpge");
    }
    // console.log("asadasdasd", fileGShootObject);
    setGShoot(fileGShootObject);
  };
  const handleGShootRemoveClick = (index) => {
    const list = [...gShootItem];
    list.splice(index, 1);
    //     setGShoot(list);
    setgShootItem(list);
  };
  const handleBDocumentRemoveClick = (index) => {
    const list = [...bDocumentItem];
    list.splice(index, 1);
    //     setGShoot(list);
    setbDocumentItem(list);
  };

  const formSubmit = async (e) => {
    console.log("jobAssign");
    e.preventDefault();

    const formData = new FormData();
    //     console.log("sdasds", jobAssign.grammarlyScreenshot);
    formData.append("id", jobAssign?.id);
    formData.append("allocatedTo", jobAssign?.allocatedTo);
    formData.append("evaluatedBy", jobAssign?.evaluatedBy);
    formData.append("wordCount", jobAssign?.wordCount);
    formData.append("scoreGivenByEvaluator", jobAssign?.scoreGivenByEvaluator);
    formData.append("dateOfPublishing", jobAssign?.dateOfPublishing);
    formData.append("amount", jobAssign?.amount);
    formData.append("url", jobAssign?.url);
    formData.append("paidOn", jobAssign?.paidOn);
    bDocumentItem?.map((item) => {
      console.log("blogDocument", bDocumentItem);
      console.log("oiuoupi", item);
      formData.append("blogDocument", item);
      // setgShootItem(jobAssignData.grammarlyScreenshot);
    });
    bDocument && formData.append("blogDocument", bDocument);
    gShootItem?.map((item) => {
      console.log("sdasdasdasdasdasdasgShootItemgShootItem", gShootItem);
      console.log("oiuoupi", item);
      formData.append("grammarlyScreenshot", item);
      // setgShootItem(jobAssignData.grammarlyScreenshot);
    });
    gShoot && formData.append("grammarlyScreenshot", gShoot);

    try {
      inputFileBlogRef.current.value = null;
      inputFileInterRef.current.value = null;
      setGShoot("");
      setBDocument("");
      await updateJobAssign(formData);
    } catch (error) {
      console.log("dsdsd", error);
    }
  };
  const resetFileInput = () => {
    inputFileInterRef.current.value = null;
    setGShoot("");
  };
  const resetFileBloInput = () => {
    inputFileBlogRef.current.value = null;
    setBDocument("");
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Job Assigned SuccessFully");
    }
    if (isError) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  }, [isSuccess, isError]);
  return (
    <>
      <div className="allocated__box rounded p-3">
        {/* <div className="select__box mb-3">
      <label for="basic-url" class="form-label">
        Allocated to
      </label>
      <select
        class="form-select shadow-none"
        aria-label="Default select example"
      >
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
    </div> */}
        <form onSubmit={formSubmit}>
          {permissions?.view?.allocatedTo && (
            <SearchDropdown
              options={data?.author}
              labelName={"Allocated to"}
              placeholder={"Search Author..."}
              name={"name"}
              email={"email"}
              id="id"
              selectedVal={jobAssign.allocatedTo}
              handleChange={(val) =>
                setJobAssign({ ...jobAssign, allocatedTo: val })
              }
              disabled={permissions?.edit?.allocatedTo === false ? true : false}
            />
          )}
          {/* Allocated to */}

          {/* <div className="select__box mb-3">
      <label for="basic-url" class="form-label">
        Evaluated By
      </label>
      <select
        class="form-select shadow-none"
        aria-label="Default select example"
      >
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
    </div> */}
          {permissions?.view?.evaluatedBy && (
            <SearchDropdown
              options={data?.evaluator}
              labelName={"Evaluated to"}
              placeholder={"Search Evaluator..."}
              name={"name"}
              email={"email"}
              id="id"
              selectedVal={jobAssign?.evaluatedBy}
              handleChange={(val) =>
                setJobAssign({ ...jobAssign, evaluatedBy: val })
              }
              disabled={permissions?.edit?.evaluatedBy === false ? true : false}
            />
          )}
          {/* Evaluated By */}

          {permissions?.view?.wordCount && (
            <InputField
              label={"Word Count"}
              type={"text"}
              name={"wordCount"}
              value={jobAssign?.wordCount}
              disabled={permissions?.edit?.wordCount === false ? true : false}
              handleChange={handleChange}
            />
          )}
          {/* Word Count */}

          {permissions?.view?.scoreGivenByEvaluator && (
            <InputField
              label={"Score given by evaluator"}
              type={"text"}
              name={"scoreGivenByEvaluator"}
              value={jobAssign?.scoreGivenByEvaluator}
              disabled={
                permissions?.edit?.scoreGivenByEvaluator === false
                  ? true
                  : false
              }
              handleChange={handleChange}
            />
          )}
          {/* Score given by evaluator */}

          {permissions?.view?.dateOfpublishing && (
            <InputField
              label={"Date of Publishing"}
              type={"date"}
              name={"dateOfPublishing"}
              value={jobAssign?.dateOfPublishing}
              disabled={
                permissions?.edit?.dateOfpublishing === false ? true : false
              }
              handleChange={handleChange}
            />
          )}
          {/* Date of Publishing */}

          {permissions?.view?.amount && (
            <InputField
              label={"Amount"}
              type={"text"}
              name={"amount"}
              value={jobAssign?.amount}
              disabled={permissions?.edit?.amount === false ? true : false}
              handleChange={handleChange}
            />
          )}
          {/* Amount */}
          {permissions?.view?.url && (
            <InputField
              label={"URL"}
              type={"text"}
              name={"url"}
              value={jobAssign?.url}
              disabled={permissions?.edit?.url === false ? true : false}
              handleChange={handleChange}
            />
          )}
          {/* URL */}
          {permissions?.view?.paidOn && (
            <InputField
              label={"Paid On"}
              type={"text"}
              name={"paidOn"}
              value={jobAssign?.paidOn}
              disabled={permissions?.edit?.paidOn === false ? true : false}
              handleChange={handleChange}
            />
          )}
          {/* Paid On */}
          {permissions?.view?.blogDocument && (
            <>
              <div className="form__box mb-3">
                <label for="basic-url" class="form-label">
                  Blog Document
                </label>
                <div class="input-group">
                  <input
                    ref={inputFileBlogRef}
                    type="file"
                    class="form-control shadow-none"
                    name="blogDocument"
                    onChange={handleBlogDocumentFileChange}
                    disabled={
                      permissions?.edit?.blogDocument === false ? true : false
                    }
                  />
                  {bDocument && (
                    <span
                      className="input-group-text bg-transparent border-0"
                      onClick={resetFileBloInput}
                    >
                      <img
                        src="/images/icons/r-cross.svg"
                        alt=""
                        style={{ height: "11px" }}
                      />
                    </span>
                  )}
                </div>
              </div>
              {bDocumentItem?.map((item, i) => {
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
                    <Link
                      to={item}
                      target="_blank"
                      download
                      style={{ margin: "0px", textDecoration: "none" }}
                    >
                      <b>{i + 1}</b> {item?.split("_")[1]}
                    </Link>
                    <span onClick={() => handleBDocumentRemoveClick(i)}>
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
            </>
          )}
          {/* Blog Document */}

          {permissions?.view?.grammarlyScreenshot && (
            <>
              <div className="form__box mb-3">
                <label for="basic-url" class="form-label">
                  Grammarly Screenshot
                </label>
                <div class="input-group">
                  <input
                    type="file"
                    ref={inputFileInterRef}
                    class="form-control shadow-none"
                    name="grammarlyScreenshot"
                    disabled={
                      permissions?.edit?.grammarlyScreenshot === false
                        ? true
                        : false
                    }
                    onChange={handleGShootFileChange}
                  />

                  {gShoot && (
                    <span
                      className="input-group-text bg-transparent border-0"
                      onClick={resetFileInput}
                    >
                      <img
                        src="/images/icons/r-cross.svg"
                        alt=""
                        style={{ height: "11px" }}
                      />
                    </span>
                  )}
                </div>
              </div>
              {gShootItem?.map((item, i) => {
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
                    <Link
                      to={item}
                      target="_blank"
                      download
                      style={{ margin: "0px", textDecoration: "none" }}
                    >
                      <b>{i + 1}</b> {item?.split("_")[1]}
                    </Link>
                    <span onClick={() => handleGShootRemoveClick(i)}>
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
            </>
          )}
          {/* Grammarly Screenshot*/}

          {permissions?.view?.activeMember && (
            <div className="form__box mb-3">
              <label for="basic-url" class="form-label">
                Active Member
              </label>
              <div class="input-group">
                <input type="text" class="form-control shadow-none" disabled />
              </div>
            </div>
          )}
          {/* Active Member */}

          <button
            type="submit"
            className="btn_create d-flex align-items-center"
            disabled={userRole === "keyword-analyst" && "disabled"}
          >
            {isLoading ? (
              <>
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              </>
            ) : userRole === "author" ? (
              "Submit Job"
            ) : userRole === "evaluator" ? (
              "Send for Publishing"
            ) : (
              "Assign Job"
            )}
            <img src="/images/icons/edit.svg" alt="icon" className="ms-2" />
          </button>
          {/* Create Job */}
        </form>
      </div>
    </>
  );
};

export default JobAssignFormData;
