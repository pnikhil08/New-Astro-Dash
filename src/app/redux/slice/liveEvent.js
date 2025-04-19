// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import API_BASE_URL from "../apiConfig";
// import { LOCAL_STORAGE_KEY } from "@/constant";

// export const liveEventApi = createApi({
//   reducerPath: "liveEventApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: API_BASE_URL,
//     prepareHeaders: (headers, { getState }) => {
//       const token =
//         getState().auth?.accessToken ||
//         localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);

//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//       }

//       return headers;
//     },
//   }),
//   tagTypes: ["LiveEvent"],
//   endpoints: (builder) => ({
//     getLiveEvent: builder.query({
//       query: (page = 1) => `get-webinar-session?page=${page}`,
//       serializeQueryArgs: ({ endpointName }) => endpointName,
//       merge: (currentCache, newItems) => {
//         return newItems;
//       },
//       forceRefetch({ currentArg, previousArg }) {
//         return currentArg !== previousArg;
//       },
//       providesTags: (result, error, page) =>
//         result
//           ? [{ type: "LiveEvent", id: `PAGE-${page}` }]
//           : [{ type: "LiveEvent", id: "LIST" }],
//       keepUnusedDataFor: 60, 
//       refetchOnMountOrArgChange: true,
//     }),
//   }),
// });

// export const { useGetLiveEventQuery, usePrefetch } = liveEventApi;
// export default liveEventApi;


import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_BASE_URL from "../apiConfig";
import { API_END_POINT, LOCAL_STORAGE_KEY } from "@/constant";

export const liveEventApi = createApi({
  reducerPath: "liveEventApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token =
        getState().auth?.accessToken ||
        localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["LiveEvent"],
  endpoints: (builder) => ({
    getLiveEvent: builder.query({
      query: (page = 1) => `${API_END_POINT.LIVE_EVENT}?page=${page}`,
      providesTags: (result, error, page) => [
        { type: "LiveEvent", id: `PAGE-${page}` },
      ],
      keepUnusedDataFor: 60,
    }),
  }),
});

export const { useGetLiveEventQuery } = liveEventApi;
export default liveEventApi;
