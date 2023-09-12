import React, { useEffect, useState } from "react";
import { useUpdatePermissionsMutation } from "./permissionsApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RolesList = ({ permissions }) => {
  const [updatePermissions, { isSuccess, isLoading, isError, error }] =
    useUpdatePermissionsMutation();
  const navigate = useNavigate();
  // const [isViewPermission, setisViewPermission] = useState({
  //   activeMember: permissions?.permissionType?.view?.activeMember?.isViewPermission,
  //   alliedkeyword:
  //     permissions?.permissionType?.view?.alliedkeyword?.isViewPermission,
  //   allocatedTo: permissions?.permissionType?.view?.allocatedTo?.isViewPermission,
  //   amount: permissions?.permissionType?.view?.amount?.isViewPermission,
  //   blogDocument: permissions?.permissionType?.view?.blogDocument?.isViewPermission,
  //   blogTitle: permissions?.permissionType?.view?.blogTitle?.isViewPermission,
  //   comments: permissions?.permissionType?.view?.comments?.isViewPermission,
  //   createdBy: permissions?.permissionType?.view?.createdBy?.isViewPermission,
  //   createdOn: permissions?.permissionType?.view?.createdOn?.isViewPermission,
  //   dateOfpublishing:
  //     permissions?.permissionType?.view?.dateOfpublishing?.isViewPermission,
  //   downloadDocket:
  //     permissions?.permissionType?.view?.downloadDocket?.isViewPermission,
  //   evaluatedBy: permissions?.permissionType?.view?.evaluatedBy?.isViewPermission,
  //   evaluatorAndAuthorChat:
  //     permissions?.permissionType?.view?.evaluatorAndAuthorChat?.isViewPermission,
  //   grammarlyScreenshot:
  //     permissions?.permissionType?.view?.grammarlyScreenshot?.isViewPermission,
  //   interlinkingBlogs:
  //     permissions?.permissionType?.view?.interlinkingBlogs?.isViewPermission,
  //   jobClose: permissions?.permissionType?.view?.jobClose?.isViewPermission,
  //   jobListing: permissions?.permissionType?.view?.jobListing?.isViewPermission,
  //   keyword: permissions?.permissionType?.view?.keyword?.isViewPermission,
  //   keywordAnalystAndAuthorChat:
  //     permissions?.permissionType?.view?.keywordAnalystAndAuthorChat
  //       ?.isViewPermission,
  //   paidOn: permissions?.permissionType?.view?.paidOn?.isViewPermission,
  //   priority: permissions?.permissionType?.view?.priority?.isViewPermission,
  //   products: permissions?.permissionType?.view?.products?.isViewPermission,
  //   questions: permissions?.permissionType?.view?.questions?.isViewPermission,
  //   scoreGivenByEvaluator:
  //     permissions?.permissionType?.view?.scoreGivenByEvaluator?.isViewPermission,
  //   url: permissions?.permissionType?.view?.url?.isViewPermission,
  //   wordCount: permissions?.permissionType?.view?.wordCount?.isViewPermission,
  // });

  const [isViewPermission, setIsViewPermission] = useState(
    permissions?.permissionType?.view
  );
  const [isEditPermission, setIsEditPermission] = useState(
    permissions?.permissionType?.edit
  );

  // console.log(isViewPermission);
  // console.log(isEditPermission);
  const permissionViewTitle = Object.keys(permissions?.permissionType?.view);
  const permissionEditTitle = Object.keys(permissions?.permissionType?.edit);
  //   console.log("object", permissionTitle);
  const roleData = [
    {
      img: "create.png",
      label: "Create Job",
      title: "createJob",
      viewPermission: isViewPermission?.createJob,
      editPermission: "onlyView",
    },
    {
      img: "create.png",
      label: "Update Job",
      title: "updateJob",
      viewPermission: isViewPermission?.updateJob,
      editPermission: "onlyView",
    },
    {
      img: "create.png",
      label: "Delete Job",
      title: "deleteJob",
      viewPermission: isViewPermission?.deleteJob,
      editPermission: "onlyView",
    },
    {
      img: "keyboard.png",
      label: "Keyword",
      title: "keyword",
      viewPermission: isViewPermission?.keyword,
      editPermission: isEditPermission?.keyword,
    },
    {
      img: "Questions.png",
      label: "Questions",
      title: "questions",
      viewPermission: isViewPermission?.questions,
      editPermission: isEditPermission?.questions,
    },
    {
      img: "allied.png",
      label: "Allied keyword",
      title: "alliedkeyword",
      viewPermission: isViewPermission?.alliedkeyword,
      editPermission: isEditPermission?.alliedkeyword,
    },
    {
      img: "Download.png",
      label: "Download docket",
      title: "downloadDocket",
      viewPermission: isViewPermission?.downloadDocket,
      editPermission: "onlyView",
    },
    {
      img: "eva.png",
      label: "Evaluated by",
      title: "evaluatedBy",
      viewPermission: isViewPermission?.evaluatedBy,
      editPermission: isEditPermission?.evaluatedBy,
    },
    {
      img: "Comments.png",
      label: "Comments",
      title: "comments",
      viewPermission: isViewPermission?.comments,
      editPermission: isEditPermission?.comments,
    },
    {
      img: "URL.png",
      label: "URL",
      title: "url",
      viewPermission: isViewPermission?.url,
      editPermission: isEditPermission?.url,
    },
    {
      img: "1.png",
      label: "Products",
      title: "products",
      viewPermission: isViewPermission?.products,
      editPermission: isEditPermission?.products,
    },
    {
      img: "2.png",
      label: "Grammarly Screenshot",
      title: "grammarlyScreenshot",
      viewPermission: isViewPermission?.grammarlyScreenshot,
      editPermission: isEditPermission?.grammarlyScreensho,
    },
    {
      img: "3.png",
      label: "Allocated to",
      title: "allocatedTo",
      viewPermission: isViewPermission?.allocatedTo,
      editPermission: isEditPermission?.allocatedTo,
    },
    {
      img: "4.png",
      label: "Job Listing",
      title: "jobListing",
      viewPermission: isViewPermission?.jobListing,
      editPermission: "onlyView",
    },

    {
      img: "5.png",
      label: "Priority",
      title: "priority",
      viewPermission: isViewPermission?.priority,
      editPermission: isEditPermission?.priority,
    },
    {
      img: "6.png",
      label: "Blog Title",
      title: "blogTitle",
      viewPermission: isViewPermission?.blogTitle,
      editPermission: isEditPermission?.blogTitle,
    },
    {
      img: "7.png",
      label: "Date of publishing",
      title: "dateOfpublishing",
      viewPermission: isViewPermission?.dateOfpublishing,
      editPermission: isEditPermission?.dateOfpublishing,
    },
    {
      img: "8.png",
      label: "Created on",
      title: "createdOn",
      viewPermission: isViewPermission?.createdOn,
      editPermission: "onlyView",
    },
    {
      img: "9.png",
      label: "Interlinking Blogs",
      title: "interlinkingBlogs",
      viewPermission: isViewPermission?.interlinkingBlogs,
      editPermission: isEditPermission?.interlinkingBlogs,
    },

    {
      img: "12.png",
      label: "Created by",
      title: "createdBy",
      viewPermission: isViewPermission?.createdBy,
      editPermission: "onlyView",
    },
    {
      img: "13.png",
      label: "Score given by evaluator",
      title: "scoreGivenByEvaluator",
      viewPermission: isViewPermission?.scoreGivenByEvaluator,
      editPermission: isEditPermission?.scoreGivenByEvaluator,
    },
    {
      img: "14.png",
      label: "Word count",
      title: "wordCount",
      viewPermission: isViewPermission?.wordCount,
      editPermission: isEditPermission?.wordCount,
    },
    {
      img: "15.png",
      label: "Blog Document",
      title: "blogDocument",
      viewPermission: isViewPermission?.blogDocument,
      editPermission: isEditPermission?.blogDocument,
    },
    {
      img: "16.png",
      label: "Amount",
      title: "amount",
      viewPermission: isViewPermission?.amount,
      editPermission: isEditPermission?.amount,
    },
    {
      img: "17.png",
      label: "Paid on",
      title: "paidOn",
      viewPermission: isViewPermission?.paidOn,
      editPermission: isEditPermission?.paidOn,
    },

    {
      img: "chat.png",
      label: "keyWord Analyst and Author Chat",
      title: "keywordAnalystAndAuthorChat",
      viewPermission: isViewPermission?.keywordAnalystAndAuthorChat,
      editPermission: isEditPermission?.keywordAnalystAndAuthorChat,
    },
    {
      img: "19.png",
      label: "Evaluator and Author chat ",
      title: "evaluatorAndAuthorChat",
      viewPermission: isViewPermission?.evaluatorAndAuthorChat,
      editPermission: isEditPermission?.evaluatorAndAuthorChat,
    },
    {
      img: "20.png",
      label: "Active",
      title: "activeMember",
      viewPermission: isViewPermission?.activeMember,
      editPermission: isEditPermission?.activeMember,
    },
  ];

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    // let list = { ...isViewPermission };
    // // console.log("list", list);
    // const mkl = list[index][name] = value;
    // console.log("sds", mkl);
    // // setisViewPermission(list);
    if (permissionViewTitle.includes(name)) {
      setIsViewPermission({ ...isViewPermission, [name]: e.target.checked });
    }
  };

  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    if (permissionEditTitle.includes(name)) {
      setIsEditPermission({ ...isEditPermission, [name]: e.target.checked });
    }
  };

  console.log(isViewPermission);
  console.log(isEditPermission);
  const formSubmit = async (e) => {
    e.preventDefault();
    const myObj = {
      id: permissions?.userId,
      permissionType: {
        view: isViewPermission,
        edit: isEditPermission,
      },
    };
    console.log(myObj);
    try {
      await updatePermissions(myObj);
    } catch (error) {
      console.log("dsdsd", error.status);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("User Update SuccessFully");
      // navigate("/users-list");
    }
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, isError]);
  return (
    <>
      <form onSubmit={formSubmit}>
        <div className="Permissions_table">
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th scope="col">Permissions</th>
                  <th scope="col">View</th>
                  <th scope="col">Edit</th>
                </tr>
              </thead>
              <tbody>
                {roleData.map((val, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <td>
                          <div className="ps-3 py-1">
                            <img
                              src={`/images/rules-permission/${val.img}`}
                              alt="img"
                              className=" me-3"
                              style={{ height: "35px" }}
                            />
                            {/* Create Job */}
                            {val.label}
                          </div>
                        </td>
                        <td>
                          <div className="form-check ms-2">
                            <input
                              // ref={ref}
                              className="form-check-input shadow-none"
                              type="checkbox"
                              name={val?.title}
                              value={val?.viewPermission}
                              id="flexCheckDefault"
                              // checked={val?.viewPermission}
                              defaultChecked={val?.viewPermission}
                              onChange={(e) => handleChange(e, index)}
                            />
                          </div>
                        </td>
                        <td>
                          {val.editPermission === "onlyView" ? (
                            "Only View"
                          ) : (
                            <div className="form-check ms-2">
                              <input
                                className="form-check-input shadow-none"
                                type="checkbox"
                                name={val?.title}
                                value={val.editPermission}
                                defaultChecked={val?.editPermission}
                                id="flexCheckDefault"
                                onChange={(e) => handleChangeEdit(e, index)}
                              />
                            </div>
                          )}
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-end gap-4 px-3">
            <button type="submit" className="btn_save">
              {isLoading ? (
                <>
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                </>
              ) : (
                "Save"
              )}
              <img src="/images/icons/save.svg" alt="icon" className="ms-2" />
            </button>
            <button
              type="button"
              className="btn_cancel"
              onClick={() => navigate("/users-list")}
            >
              Cancel
              <img src="/images/icons/cut.svg" alt="icon" className="ms-2" />
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default RolesList;
