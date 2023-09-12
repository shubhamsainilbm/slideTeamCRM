import React, { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useGetPermissionsQuery } from "./permissionsApiSlice";
import { useParams } from "react-router-dom";
import RolesList from "./RolesList";
import Loader from "../../components/Loader";

export default function RolesPermissions() {
  const { id } = useParams();

  // let viewPer = [];
  // // const onjK = Object.keys(permission?.permissionType?.view);
  // // console.log(onjK);

  // [permission?.permissionType?.view]?.filter((item) => {
  //   // const objKey = Object.entries(item);

  //   viewPer.push({
  //     activeMember: item?.activeMember?.isPermission,
  //     alliedkeyword: item?.alliedkeyword?.isPermission,
  //     allocatedTo: item?.allocatedTo?.isPermission,
  //     amount: item?.amount?.isPermission,
  //     blogDocument: item?.blogDocument?.isPermission,
  //     blogTitle: item?.blogTitle?.isPermission,
  //     comments: item?.comments?.isPermission,
  //     createdBy: item?.createdBy?.isPermission,
  //     createdOn: item?.createdOn?.isPermission,
  //     dateOfpublishing: item?.dateOfpublishing?.isPermission,
  //     downloadDocket: item?.downloadDocket?.isPermission,
  //     evaluatedBy: item?.evaluatedBy?.isPermission,
  //     evaluatorAndAuthorChat: item?.evaluatorAndAuthorChat?.isPermission,
  //     grammarlyScreenshot: item?.grammarlyScreenshot?.isPermission,
  //     interlinkingBlogs: item?.interlinkingBlogs?.isPermission,
  //     jobClose: item?.jobClose?.isPermission,
  //     jobListing: item?.jobListing?.isPermission,
  //     keyword: item?.keyword?.isPermission,
  //     keywordAnalystAndAuthorChat:
  //       item?.keywordAnalystAndAuthorChat?.isPermission,
  //     paidOn: item?.paidOn?.isPermission,
  //     priority: item?.priority?.isPermission,
  //     products: item?.products?.isPermission,
  //     questions: item?.questions?.isPermission,
  //     scoreGivenByEvaluator: item?.scoreGivenByEvaluator?.isPermission,
  //     url: item?.url?.isPermission,
  //     wordCount: item?.wordCount?.isPermission,
  //   });
  // });
  // const [updateVal, setUpdateVal] = useState({});
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   const mkl = { [name]: value };
  //   console.log("dfdf", ref.current.checked);
  //   // console.log("sdsd", e);
  //   // Object.keys().filter((item) => {
  //   //   console.log("ff", item);
  //   // });
  //   // console.log("value", { [name]: value === false });
  //   // value === e.target.checked;

  //   // for (let item of Object.keys(myObject)) {
  //   //   // if (typeof myObject[item] == "number" && myObject[item] >= 4) {
  //   //   // myObject[item] = 10;
  //   //   // }
  //   //   myObject[item] === false;
  //   //   console.log(myObject.activeMember);
  //   // }
  //   console.log("va", e.target.checked);
  // };
  // console.log("isCheck", isLoading ? "dsd" : isCheck);

  // const handleChangeCheck = (e) => {
  //   console.log(ref.current.value === false);
  //   ref.current.value;
  // };

  const { permissions } = useGetPermissionsQuery("getPermissions", {
    selectFromResult: ({ data }) => ({
      permissions: data?.entities[id],
    }),
  });
  if (!permissions) return <Loader />;

  const content = <RolesList permissions={permissions} />;
  return (
    <>
      <DashboardLayout>
        <section className="roles_permission_sec rounded py-3">
          <div className="row">
            <div className="col-md-12 mb-4">
              <div className="head px-3 ">
                Roles & Permissions
                {/* (Select any role to check the permissions) */}
              </div>
              <hr />
              <div className="filter_box d-flex gap-3 px-3">
                <span
                  className="active"
                  style={{ textTransform: "capitalize" }}
                >
                  {permissions?.permissionRole}
                </span>
                {/* <span>Job Allocator</span>
                <span>Author</span>
                <span>Evaluator</span>
                <span>Analyst</span> */}
              </div>
            </div>
            <div className="col-md-12">{content}</div>
          </div>
        </section>
      </DashboardLayout>
    </>
  );
}
