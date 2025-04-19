import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_BASE_URL from "../apiConfig";
import { API_END_POINT, LOCAL_STORAGE_KEY } from "@/constant";

export const dosaAndDontApi = createApi({
  reducerPath: "dosAndDontApi",
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
    getdosAndDontApi: builder.query({
      query: () => `${API_END_POINT.DO_DONT}`,
    }),
    getNoticeBoard: builder.query({
        query: () => `${API_END_POINT.NOTICES}`, 
      }),
      
  }),
});

export const {useGetdosAndDontApiQuery,  useGetNoticeBoardQuery } = dosaAndDontApi;
export default dosaAndDontApi;
