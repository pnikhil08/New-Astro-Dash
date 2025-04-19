import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_BASE_URL from "../apiConfig";
import { LOCAL_STORAGE_KEY } from "@/constant";

export const myFollowerApi = createApi({
  reducerPath: "myFollowerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.accessToken || localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMyFollowerApi: builder.query({
      query: (user_id) => ({
        url: `my-clients`,
        method: "GET",
        params: { user_id }, 
      }), 
    }),
  }),
});

export const { useGetMyFollowerApiQuery } = myFollowerApi;
export default myFollowerApi;
