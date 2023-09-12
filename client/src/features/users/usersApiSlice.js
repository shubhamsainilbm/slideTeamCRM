import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (role) => `/user/get-users?${role}`,

      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      //   keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        console.log("user", responseData);
        const loadedUsers = responseData.map((user) => {
          user.id = user._id;
          return user;
        });

        return usersAdapter.setAll(initialState, loadedUsers);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "User", id: "LIST" },
            ...result.ids.map((id) => ({ type: "User", id })),
          ];
        } else {
          return [{ type: "User", id: "LIST" }];
        }
      },
    }),
    getUser: builder.query({
      query: () => `/user/get-user`,
    }),
    addUser: builder.mutation({
      query: (initialUserData) => ({
        url: "/user/create-user",
        method: "POST",
        body: { ...initialUserData },
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    updateUser: builder.mutation({
      query: (initialUserData) => ({
        url: "/user/update-user",
        method: "PATCH",
        body: { ...initialUserData },
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    updateOwnUser: builder.mutation({
      query: (initialUserData) => ({
        url: "/user/update-own-user",
        method: "PATCH",
        body: initialUserData,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/user/delete-user`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    forceDeleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/user/force-delete-user`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useUpdateOwnUserMutation,
  useDeleteUserMutation,
  useForceDeleteUserMutation,
} = usersApiSlice;

export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data
);

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = usersAdapter.getSelectors(
  (state) => selectUsersData(state) ?? initialState
);
