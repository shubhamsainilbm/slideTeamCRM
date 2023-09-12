import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const messageAdapter = createEntityAdapter({});

const initialState = messageAdapter.getInitialState();

export const messageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getChats: builder.query({
    //   query: () => "/chats/get-chats",
    //   validateStatus: (response, result) => {
    //     return response.status === 200 && !result.isError;
    //   },
    //   //   keepUnusedDataFor: 5,
    //   transformResponse: (responseData) => {
    //     const loadedChats = responseData?.map((chats) => {
    //       chats.id = chats._id;
    //       return chats;
    //     });
    //     return messageAdapter.setAll(initialState, loadedChats);
    //   },
    //   providesTags: (result, error, arg) => {
    //     if (result?.ids) {
    //       return [
    //         { type: "Chat", id: "LIST" },
    //         ...result.ids.map((id) => ({ type: "Chat", id })),
    //       ];
    //     } else {
    //       return [{ type: "Chat", id: "LIST" }];
    //     }
    //   },
    // }),
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

    //   invalidatesTags: [{ type: "Chat", id: "LIST" }],
    // }),
    getMessages: builder.query({
      query: (chatId) => `/messages/get-all-messages/${chatId}`,
    }),
    sendMessage: builder.mutation({
      query: (initialChatsData) => ({
        url: "/messages/send-message",
        method: "post",
        body: { ...initialChatsData },
      }),
      invalidatesTags: [{ type: "Message", id: "LIST" }],
    }),
  }),
});

export const { useGetMessagesQuery, useSendMessageMutation } = messageApiSlice;

export const selectMessagesResult =
  messageApiSlice.endpoints.getMessages.select();

const selectMessageData = createSelector(
  selectMessagesResult,
  (messageResult) => messageResult.data
);

export const {
  selectAll: selectAllMessages,
  selectById: selectMessageById,
  selectIds: selectMessageIds,
} = messageAdapter.getSelectors(
  (state) => selectMessageData(state) ?? initialState
);
