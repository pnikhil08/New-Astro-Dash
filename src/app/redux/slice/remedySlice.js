import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_BASE_URL from "../apiConfig";
import { LOCAL_STORAGE_KEY } from "@/constant";

export const remedyApi = createApi({
  reducerPath: "remedyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      console.log("Preparing Headers...");
      const token = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getRemedyApi: builder.query({
      query: (page = 1) => {
        return `get-suggestion?astro_id=1723?&page=${page}`;
      },
    }),
  }),
});

export const { useGetRemedyApiQuery } = remedyApi;
export default remedyApi;
