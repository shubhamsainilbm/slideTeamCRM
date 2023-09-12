import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const notificationsAdapter = createEntityAdapter({});

const initialState = notificationsAdapter.getInitialState();

export const notificationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => "/notifications/get-notifications",
      validateStatus: (response, result) => {
        console.log("result", result);
        console.log("response", response);
        return response.status === 200 && !result.isError;
      },
      //   keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        const loadedNotifications = responseData?.notifications?.map(
          (notification) => {
            notification.id = notification._id;
            return notification;
          }
        );
        return notificationsAdapter.setAll(initialState, loadedNotifications);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Notification", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Notification", id })),
          ];
        } else {
          return [{ type: "Notification", id: "LIST" }];
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
    //     getJobAssign: builder.mutation({
    //       query: (initialJobAssignData) => ({
    //         url: "/job-assign/create-job-assigning",
    //         method: "get",
    //         body: { ...initialJobAssignData },
    //       }),

    //       invalidatesTags: [{ type: "JobAssigning", id: "LIST" }],
    //     }),
    //     updateJobAssign: builder.mutation({
    //       query: (initialJobAssignData) => ({
    //         url: "/job-assign/create-job-assigning",
    //         method: "put",
    //         body: { ...initialJobAssignData },
    //       }),
    //       invalidatesTags: [{ type: "JobAssigning", id: "LIST" }],
    //     }),
  }),
});

export const { useGetNotificationsQuery } = notificationsApiSlice;

export const selectNotificationsResult =
  notificationsApiSlice.endpoints.getNotifications.select();

const selectNotificationsData = createSelector(
  selectNotificationsResult,
  (notificationsResult) => notificationsResult.data
);

export const {
  selectAll: selectAllNotifications,
  selectById: selectNotificationsById,
  selectIds: selectNotificatinsIds,
} = notificationsAdapter.getSelectors(
  (state) => selectNotificationsData(state) ?? initialState
);
