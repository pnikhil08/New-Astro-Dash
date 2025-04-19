import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_BASE_URL from "../apiConfig";
import { LOCAL_STORAGE_KEY } from "@/constant";

export const importantNumberApi = createApi({
  reducerPath: "importantNumberApi",
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
    getimportantNumberApi: builder.query({
      query: () => `import_astro_contact`, 
    }),
  }),
});

export const { useGetimportantNumberApiQuery} = importantNumberApi;
export default importantNumberApi;
