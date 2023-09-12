import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const jobReportingAdapter = createEntityAdapter({});

const initialState = jobReportingAdapter.getInitialState();

export const reportingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllReports: builder.query({
      query: (arg) => `/report/get-all-author-report?${arg}`,
      // ({
      //     url: `/report/get-all-author-report?${arg}`,
      //     method: "GET",
      // }),
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      //   keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        // console.log("reports at slice-----", responseData);
        const loadedJobReporting = responseData?.map((report) => {
          console.log(report, "loaded reports after map===========");
          report.id = report._id;
          return report;
        });
        return jobReportingAdapter.setAll(initialState, loadedJobReporting);
      },
      providesTags: (result, error, arg) => {
        // console.log("reports", arg)
        if (result?.ids) {
          return [
            { type: "Report", id: "LIST" },
            ...result?.ids?.map((id) => ({ type: "Report", id })),
          ];
        } else {
          return [{ type: "Report", id: "LIST" }];
        }
      },
    }),
    getAllJobSubmission: builder.query({
      query: (role) => `/report/get-all-author-job-submission-report?${role}`,
    }),
    getPublishedReports: builder.query({
      query: (arg) => {
        return {
          url: `/report/get-Published-Job-Report?${arg}`,
          method: "GET",
        };
      },
    }),
    getAllReportJobData: builder.query({
      query: (role) => {
        return {
          url: `/report/get-all-job-report?${role}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAllReportsQuery } = reportingApiSlice;

export const selectJobReportResult =
  reportingApiSlice.endpoints.getAllReports.select();

const selectReportsData = createSelector(
  selectJobReportResult,
  (reportResult) => reportResult.data
);

export const {
  selectAll: selectAllReports,
  selectById: selectReportById,
  selectIds: selectReportIds,
} = jobReportingAdapter.getSelectors(
  (state) => selectReportsData(state) ?? initialState
);
