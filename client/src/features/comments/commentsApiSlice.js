import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const commentsAdapter = createEntityAdapter({});

const initialState = commentsAdapter.getInitialState();

export const commentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query({
      query: () => "/comment/get-comments/",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      //   keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        const loadedComments = responseData?.comment?.map((comment) => {
          comment.id = comment._id;
          return comment;
        });
        return commentsAdapter.setAll(initialState, loadedComments);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Comment", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Comment", id })),
          ];
        } else {
          return [{ type: "Comment", id: "LIST" }];
        }
      },
    }),
    addComment: builder.mutation({
      query: (initialUserData) => ({
        url: "/comment/add-comment",
        method: "POST",
        body: { ...initialUserData },
      }),
      invalidatesTags: [{ type: "Comment", id: "LIST" }],
    }),
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

export const { useGetCommentsQuery, useAddCommentMutation } = commentsApiSlice;

export const selectCommentResult =
  commentsApiSlice.endpoints.getComments.select();

const selectCommentData = createSelector(
  selectCommentResult,
  (commentResult) => commentResult.data
);

export const {
  selectAll: selectAllComments,
  selectById: selectCommentById,
  selectIds: selectCommentIds,
} = commentsAdapter.getSelectors(
  (state) => selectCommentData(state) ?? initialState
);
