import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectReportById } from "./reportingApiSlice";

const Reports = ({ reportId }) => {
  console.log(reportId, "at report compoentntnryhjrk");
  const allReportData = useSelector((state) =>
    selectReportById(state, reportId)
  );
  console.log("all reposrt data by id", allReportData);
  const allReportDatasssss = useSelector((state) => state);
  // const allReportData = useSelector((state) => selectReportIds(state, reportId))
  const navigate = useNavigate();
  let content;
  console.log("allReportDatasssss", allReportDatasssss);
  if (allReportData) {
    // const handleEdit = () =>  navigate(`/edit-user/${userId}`);
    content = (
      <tr>
        <td>{allReportData?.code}</td>
        <td>#{allReportData?._id.slice(-4)}</td>
        <td>{allReportData?.name}</td>
        <td>{allReportData?.email}</td>
        <td>{allReportData?.mobile}</td>
        <td>{allReportData?.numOfBlogSubmitted}</td>
        <td>{allReportData?.numOfBlogpublished}</td>
        <td>0</td>
        <td>{allReportData?.status}</td>
      </tr>
    );
  } else return null;

  return content;
};

export default Reports;
