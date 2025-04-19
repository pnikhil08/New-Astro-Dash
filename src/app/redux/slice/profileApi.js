import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_BASE_URL from "../apiConfig";
import { LOCAL_STORAGE_KEY } from "@/constant";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token =
        getState().auth.accessToken || localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getExpertProfileDetails: builder.query({
      query: () => `expert-all-details?user_id=117360`,
    }),
  
    getOnlineDetails: builder.query({
      query: () => `online-status`,
    }),
    updateExpertStatus: builder.mutation({
      query: (body) => ({
        url: "update-expert-status",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetExpertProfileDetailsQuery,  useGetOnlineDetailsQuery ,  useUpdateExpertStatusMutation  } = profileApi;
export default profileApi;
