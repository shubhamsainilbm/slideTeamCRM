import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const jobsAdapter = createEntityAdapter({});

const initialState = jobsAdapter.getInitialState();

export const jobsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJob: builder.query({
      query: (pageNumber) => ({
        url: `/job/get-jobs?${pageNumber}`,
        method: "get",
      }),
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      //   keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        console.log("res", responseData);
        const loadedJob = responseData.map((job) => {
          job.id = job._id;
          return job;
        });
        return jobsAdapter.setAll(initialState, loadedJob);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Job", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Job", id })),
          ];
        } else {
          return [{ type: "Job", id: "LIST" }];
        }
      },
    }),
    createJob: builder.mutation({
      query: (initialUserData) => ({
        url: "/job/create-job",
        method: "POST",
        body: { ...initialUserData },
      }),
      invalidatesTags: [{ type: "Job", id: "LIST" }],
    }),
    updateJob: builder.mutation({
      query: (initialJobData) => ({
        url: "/job/update-jobs",
        method: "PATCH",
        body: { ...initialJobData },
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    uploadCsv: builder.mutation({
      query: (initialJobData) => ({
        url: "/job/csv-create-job",
        method: "post",
        body: initialJobData,
      }),
      invalidatesTags: [{ type: "Job", id: "LIST" }],
    }),
    getAuthorAndEvaluator: builder.query({
      query: () => "/user/get-author-and-evaluator",
    }),
  }),
});

export const {
  useGetJobQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  useUploadCsvMutation,
  useGetAuthorAndEvaluatorQuery,
} = jobsApiSlice;

export const selectJobsResult = jobsApiSlice.endpoints.getJob.select();

const selectJobsData = createSelector(
  selectJobsResult,
  (jobsResult) => jobsResult.data
);

export const {
  selectAll: selectAllJobs,
  selectById: selectJobById,
  selectIds: selectJobIds,
} = jobsAdapter.getSelectors((state) => selectJobsData(state) ?? initialState);
