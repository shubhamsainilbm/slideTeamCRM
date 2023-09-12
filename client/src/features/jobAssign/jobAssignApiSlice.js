import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const jobAssignAdapter = createEntityAdapter({});

const initialState = jobAssignAdapter.getInitialState();

export const jobAssignApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllJobAssign: builder.query({
      query: () => "/job-assign/get-job-assigning",
      validateStatus: (response, result) => {
        console.log("result", result);
        console.log("response", response);
        return response.status === 200 && !result.isError;
      },
      //   keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        const loadedJobAssign = responseData?.jobAssign?.map((jobAsign) => {
          jobAsign.id = jobAsign.jobId;
          return jobAsign;
        });
        return jobAssignAdapter.setAll(initialState, loadedJobAssign);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "JobAssigning", id: "LIST" },
            ...result.ids.map((id) => ({ type: "JobAssigning", id })),
          ];
        } else {
          return [{ type: "JobAssigning", id: "LIST" }];
        }
      },
    }),
    // createJob: builder.mutation({
    //   query: (initialUserData) => ({
    //     url: "/job/create-job",
    //     method: "POST",
    //     body: { ...initialUserData },
    //   }),
    //   invalidatesTags: [{ type: "Job", id: "LIST" }],
    // }),
    //     updateUser: builder.mutation({
    //       query: (initialUserData) => ({
    //         url: "/user/update-user",
    //         method: "PATCH",
    //         body: { ...initialUserData },
    //       }),
    //       invalidatesTags: [{ type: "User", id: "LIST" }],
    //     }),
    // uploadCsv: builder.mutation({
    //   query: (initialJobData) => ({
    //     url: "/job/csv-create-job",
    //     method: "post",
    //     body: { ...initialJobData },
    //   }),
    //   invalidatesTags: [{ type: "Job", id: "LIST" }],
    // }),
    // getAuthorAndEvaluator: builder.query({
    //   query: () => "/user/get-author-and-evaluator",
    // }),
    // getJobAssign: builder.mutation({
    //   query: (initialJobAssignData) => ({
    //     url: "/job-assign/create-job-assigning",
    //     method: "get",
    //     body: { ...initialJobAssignData },
    //   }),

    //   invalidatesTags: [{ type: "JobAssigning", id: "LIST" }],
    // }),
    updateJobAssign: builder.mutation({
      query: (initialJobAssignData) => ({
        url: "/job-assign/create-job-assigning",
        method: "post",
        body: initialJobAssignData,
      }),
      invalidatesTags: [{ type: "JobAssigning", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllJobAssignQuery,
  // useGetJobAssignMutation,
  useUpdateJobAssignMutation,
} = jobAssignApiSlice;

export const selectJobAssignResult =
  jobAssignApiSlice.endpoints.getAllJobAssign.select();

const selectJobAssignData = createSelector(
  selectJobAssignResult,
  (jobAssignResult) => jobAssignResult.data
);

export const {
  selectAll: selectAllJobAssign,
  selectById: selectJobAssignById,
  selectIds: selectJobAssignIds,
} = jobAssignAdapter.getSelectors(
  (state) => selectJobAssignData(state) ?? initialState
);
