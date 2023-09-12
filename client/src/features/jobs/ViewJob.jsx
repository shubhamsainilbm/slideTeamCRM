import React from "react";
import CreateJob from "./CreateJob";
import { useParams } from "react-router-dom";
import { useGetJobQuery } from "./jobsApiSlice";
import { useEffect } from "react";
import Loader from "../../components/Loader";

const ViewJob = () => {
  const { id } = useParams();
  const { job } = useGetJobQuery("getJob", {
    selectFromResult: ({ data }) => ({
      job: data?.entities[id],
    }),
  });

  if (!job) return <Loader />;

  const content = <CreateJob job={job} />;

  return content;
};

export default ViewJob;
