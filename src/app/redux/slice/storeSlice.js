import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_BASE_URL, { API_ENDPOINTS } from "../apiConfig";
import { API_END_POINT, LOCAL_STORAGE_KEY } from "@/constant";

export const storeApi = createApi({
  reducerPath: "storeApi",
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
    getStore: builder.query({
      query: () => `${API_END_POINT.STORE_HISTORY}`,
    }),
  }),
});

export const { useGetStoreQuery } = storeApi;
export default storeApi;
