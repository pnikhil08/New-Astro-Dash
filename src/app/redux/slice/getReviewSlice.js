import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_BASE_URL from "../apiConfig";
import { API_END_POINT, LOCAL_STORAGE_KEY } from "@/constant";

export const getReviewApi = createApi({
  reducerPath: "getReviewApi",
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
    getReviewApi: builder.query({
      query: (page = 1) => `${API_END_POINT.GET_REVIEW}&page=${page}`,
    }),
    postReply: builder.mutation({
      query: ({ review_id, astroreply }) => ({
        url: "reply",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN)}`,
        },
        body: { review_id, astroreply },
      }),
    }),
  }),
});

export const { useGetReviewApiQuery, usePostReplyMutation } = getReviewApi;
export default getReviewApi;
