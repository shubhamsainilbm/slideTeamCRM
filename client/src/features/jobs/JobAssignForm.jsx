import React, { useEffect, useState } from "react";

import { useGetAllJobAssignQuery } from "../jobAssign/jobAssignApiSlice";
import JobAssignFormData from "./JobAssignFormData";

const JobAssignForm = ({ jobId, assignJobId }) => {
  const { jobAssignData } = useGetAllJobAssignQuery("getJobAssign", {
    selectFromResult: ({ data }) => ({
      jobAssignData: data?.entities[jobId],
    }),
  });
  console.log("jobAssignData", jobAssignData);
  if (!jobAssignData)
    return (
      <>
        <div class="text-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
    );
  const content = (
    <JobAssignFormData jobAssignData={jobAssignData} jobId={jobId} />
  );

  return content;
  return <></>;
};

export default JobAssignForm;
