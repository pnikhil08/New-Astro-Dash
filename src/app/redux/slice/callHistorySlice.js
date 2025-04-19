import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_BASE_URL from "../apiConfig";
import { API_END_POINT, LOCAL_STORAGE_KEY } from "@/constant";

export const expertCallApi = createApi({
  reducerPath: "expertCallApi",
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
    getExpertCallHistory: builder.query({
      query: (page = 1) => `${API_END_POINT.CALL_HISTORY}?&page=${page}`,
    }),
  }),
});

export const { useGetExpertCallHistoryQuery } = expertCallApi;
export default expertCallApi;
