import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_BASE_URL from "../apiConfig";
import { API_END_POINT, LOCAL_STORAGE_KEY } from "@/constant";

export const expertChatApi = createApi({
  reducerPath: "expertChatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL, 
    prepareHeaders: (headers, { getState }) => {
      const token =
        getState().auth.accessToken || localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
        console.log("ATTACHING TOKEN:", token);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getExpertChatHistory: builder.query({
      query: (page = 1) => `${API_END_POINT.CHAT_HISTORY}?&page=${page}`,
    }),
  }),
});

export const { useGetExpertChatHistoryQuery } = expertChatApi;
export default expertChatApi;
