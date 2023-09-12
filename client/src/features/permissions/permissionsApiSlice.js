import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const permissionsAdapter = createEntityAdapter({});

const initialState = permissionsAdapter.getInitialState();

export const permissionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPermissions: builder.query({
      query: () => `/user-permissions/get-user-permissions`,
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      //   keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        console.log("permission", responseData);
        const loadedPermissions = responseData.map((permission) => {
          permission.id = permission.userId;
          return permission;
        });

        return permissionsAdapter.setAll(initialState, loadedPermissions);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "UserPermissions", id: "LIST" },
            ...result.ids.map((id) => ({ type: "UserPermissions", id })),
          ];
        } else {
          return [{ type: "UserPermissions", id: "LIST" }];
        }
      },
    }),
    //     addUser: builder.mutation({
    //       query: (initialUserData) => ({
    //         url: "/user/create-user",
    //         method: "POST",
    //         body: { ...initialUserData },
    //       }),
    //       invalidatesTags: [{ type: "User", id: "LIST" }],
    //     }),
    updatePermissions: builder.mutation({
      query: (initialPermissionsData) => ({
        url: "/user-permissions/update-user-permissions",
        method: "PATCH",
        body: { ...initialPermissionsData },
      }),
      invalidatesTags: [{ type: "UserPermissions", id: "LIST" }],
    }),
  }),
});

export const { useGetPermissionsQuery, useUpdatePermissionsMutation } =
  permissionsApiSlice;

export const selectPermissionsResult =
  permissionsApiSlice.endpoints.getPermissions.select();

const selectPermissionsData = createSelector(
  selectPermissionsResult,
  (permissionsResult) => permissionsResult.data
);

export const {
  selectAll: selectAllPermissions,
  selectById: selectPermissionById,
  selectIds: selectPermissionIds,
} = permissionsAdapter.getSelectors(
  (state) => selectPermissionsData(state) ?? initialState
);
