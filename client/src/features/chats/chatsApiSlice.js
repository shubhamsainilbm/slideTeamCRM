import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const chatsAdapter = createEntityAdapter({});

const initialState = chatsAdapter.getInitialState();

export const chatsApiSlice = apiSlice.injectEndpoints({
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
    //     return chatsAdapter.setAll(initialState, loadedChats);
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
    getChats: builder.query({
      query: () => `/chats/get-chats`,
    }),
    createChat: builder.mutation({
      query: (initialChatsData) => ({
        url: "/chats/create-chat",
        method: "post",
        body: { ...initialChatsData },
      }),
      invalidatesTags: [{ type: "Chat", id: "LIST" }],
    }),
    getChatUsers: builder.query({
      query: (search) => `/user/get-chat-users?search=${search}`,
    }),
  }),
});

export const { useGetChatsQuery, useCreateChatMutation, useGetChatUsersQuery } =
  chatsApiSlice;

export const selectChatsResult = chatsApiSlice.endpoints.getChats.select();

const selectChatsData = createSelector(
  selectChatsResult,
  (chatsResult) => chatsResult.data
);

export const {
  selectAll: selectAllChats,
  selectById: selectChatById,
  selectIds: selectChatIds,
} = chatsAdapter.getSelectors(
  (state) => selectChatsData(state) ?? initialState
);
