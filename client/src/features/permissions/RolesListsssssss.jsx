import React, { useState } from "react";
import { useGetPermissionsQuery } from "./permissionsApiSlice";

const RolesListsssssss = ({ id }) => {
  const {
    data: permission,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPermissionsQuery(id);
  console.log("PermissionData", permission?.permissionType);

  if (isLoading) {
    console.log("Loading..");
  }

  if (isError) {
    console.log(error);
  }

  const [isCheck, setIsCheck] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log("va", name);
    setIsCheck(!isCheck, { ...isCheck, [name]: value });
  };

  console.log("isCheck", isCheck);

  let content = [
    {
      img: "create.png",
      label: "Create Job",
    },
    {
      img: "keyboard.png",
      label: "Keyword",
      title: permission?.permissionType?.view?.keyword?.title,
      viewPermission: permission?.permissionType?.view?.keyword?.isPermission,
      editPermission: permission?.permissionType?.edit?.keyword?.isPermission,
    },
    {
      img: "Questions.png",
      label: "Questions",
      title: permission?.permissionType?.view?.questions?.title,
      viewPermission: permission?.permissionType?.view?.questions?.isPermission,
      editPermission: permission?.permissionType?.edit?.questions?.isPermission,
    },
    {
      img: "allied.png",
      label: "Allied keyword",
      title: permission?.permissionType?.view?.alliedkeyword?.title,
      viewPermission:
        permission?.permissionType?.view?.alliedkeyword?.isPermission,
      editPermission:
        permission?.permissionType?.edit?.alliedkeyword?.isPermission,
    },
    {
      img: "Download.png",
      label: "Download docket",
      title: permission?.permissionType?.view?.downloadDocket?.title,
      viewPermission:
        permission?.permissionType?.view?.downloadDocket?.isPermission,
      editPermission: "onlyView",
    },
    {
      img: "eva.png",
      label: "Evaluated by",
      title: permission?.permissionType?.view?.evaluatedBy?.title,
      viewPermission:
        permission?.permissionType?.view?.evaluatedBy?.isPermission,
      editPermission:
        permission?.permissionType?.edit?.evaluatedBy?.isPermission,
    },
    {
      img: "Comments.png",
      label: "Comments",
      title: permission?.permissionType?.view?.comments?.title,
      viewPermission: permission?.permissionType?.view?.comments?.isPermission,
      editPermission: permission?.permissionType?.edit?.comments?.isPermission,
    },
    {
      img: "URL.png",
      label: "URL",
      title: permission?.permissionType?.view?.url?.title,
      viewPermission: permission?.permissionType?.view?.url?.isPermission,
      editPermission: permission?.permissionType?.edit?.url?.isPermission,
    },
    {
      img: "1.png",
      label: "Products",
      title: permission?.permissionType?.view?.products?.title,
      viewPermission: permission?.permissionType?.view?.products?.isPermission,
      editPermission: permission?.permissionType?.edit?.products?.isPermission,
    },
    {
      img: "2.png",
      label: "Grammarly Screenshot",
      title: permission?.permissionType?.view?.grammarlyScreenshot?.title,
      viewPermission:
        permission?.permissionType?.view?.grammarlyScreenshot?.isPermission,
      editPermission:
        permission?.permissionType?.edit?.grammarlyScreenshot?.isPermission,
    },
    {
      img: "3.png",
      label: "Allocated to",
      title: permission?.permissionType?.view?.allocatedTo?.title,
      viewPermission:
        permission?.permissionType?.view?.allocatedTo?.isPermission,
      editPermission:
        permission?.permissionType?.edit?.allocatedTo?.isPermission,
    },
    {
      img: "4.png",
      label: "Job Listing",
      title: permission?.permissionType?.view?.jobListing?.title,
      viewPermission:
        permission?.permissionType?.view?.jobListing?.isPermission,
      editPermission: "onlyView",
    },

    {
      img: "5.png",
      label: "Priority",
      title: permission?.permissionType?.view?.priority?.title,
      viewPermission: permission?.permissionType?.view?.priority?.isPermission,
      editPermission: permission?.permissionType?.edit?.priority?.isPermission,
    },
    {
      img: "6.png",
      label: "Blog Title",
      title: permission?.permissionType?.view?.blogTitle?.title,
      viewPermission: permission?.permissionType?.view?.blogTitle?.isPermission,
      editPermission: permission?.permissionType?.edit?.blogTitle?.isPermission,
    },
    {
      img: "7.png",
      label: "Date of publishing",
      title: permission?.permissionType?.view?.dateOfpublishing?.title,
      viewPermission:
        permission?.permissionType?.view?.dateOfpublishing?.isPermission,
      editPermission:
        permission?.permissionType?.edit?.dateOfpublishing?.isPermission,
    },
    {
      img: "8.png",
      label: "Created on",
      title: permission?.permissionType?.view?.createdOn?.title,
      viewPermission: permission?.permissionType?.view?.createdOn?.isPermission,
      editPermission: "onlyView",
    },
    {
      img: "9.png",
      label: "Interlinking Blogs",
      title: permission?.permissionType?.view?.interlinkingBlogs?.title,
      viewPermission:
        permission?.permissionType?.view?.interlinkingBlogs?.isPermission,
      editPermission:
        permission?.permissionType?.edit?.interlinkingBlogs?.isPermission,
    },

    {
      img: "12.png",
      label: "Created by",
      title: permission?.permissionType?.view?.createdBy?.title,
      viewPermission: permission?.permissionType?.view?.createdBy?.isPermission,
      editPermission: "onlyView",
    },
    {
      img: "13.png",
      label: "Score given by evaluator",
      title: permission?.permissionType?.view?.scoreGivenByEvaluator?.title,
      viewPermission:
        permission?.permissionType?.view?.scoreGivenByEvaluator?.isPermission,
      editPermission:
        permission?.permissionType?.edit?.scoreGivenByEvaluator?.isPermission,
    },
    {
      img: "14.png",
      label: "Word count",
      title: permission?.permissionType?.view?.wordCount?.title,
      viewPermission: permission?.permissionType?.view?.wordCount?.isPermission,
      editPermission: permission?.permissionType?.edit?.wordCount?.isPermission,
    },
    {
      img: "15.png",
      label: "Blog Document",
      title: permission?.permissionType?.view?.blogDocument?.title,
      viewPermission:
        permission?.permissionType?.view?.blogDocument?.isPermission,
      editPermission:
        permission?.permissionType?.edit?.blogDocument?.isPermission,
    },
    {
      img: "16.png",
      label: "Amount",
      title: permission?.permissionType?.view?.amount?.title,
      viewPermission: permission?.permissionType?.view?.amount?.isPermission,
      editPermission: permission?.permissionType?.edit?.amount?.isPermission,
    },
    {
      img: "17.png",
      label: "Paid on",
      title: permission?.permissionType?.view?.paidOn?.title,
      viewPermission: permission?.permissionType?.view?.paidOn?.isPermission,
      editPermission: permission?.permissionType?.edit?.paidOn?.isPermission,
    },

    {
      img: "chat.png",
      label: "keyWord Analyst and Author Chat",
      title:
        permission?.permissionType?.view?.keywordAnalystAndAuthorChat?.title,
      viewPermission:
        permission?.permissionType?.view?.keywordAnalystAndAuthorChat
          ?.isPermission,
      editPermission:
        permission?.permissionType?.edit?.keywordAnalystAndAuthorChat
          ?.isPermission,
    },
    {
      img: "19.png",
      label: "Evaluator and Author chat ",
      title: permission?.permissionType?.view?.evaluatorAndAuthorChat?.title,
      viewPermission:
        permission?.permissionType?.view?.evaluatorAndAuthorChat?.isPermission,
      editPermission:
        permission?.permissionType?.edit?.evaluatorAndAuthorChat?.isPermission,
    },
    {
      img: "20.png",
      label: "Active",
      title: permission?.permissionType?.view?.activeMember?.title,
      viewPermission:
        permission?.permissionType?.view?.activeMember?.isPermission,
      editPermission:
        permission?.permissionType?.edit?.activeMember?.isPermission,
    },
  ];
  return content;
};

export default RolesListsssssss;
