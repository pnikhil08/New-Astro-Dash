import { LOCAL_STORAGE_KEY } from "@/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const offerPriceApi = createApi({
  reducerPath: "offerPriceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://webdemo.dhwaniastro.co.in/api/", 
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "application/json");
      headers.set("X-Requested-With", "XMLHttpRequest");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    updateOfferPrice: builder.mutation({
      query: (data) => ({
        url: "expert-offerprice", 
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useUpdateOfferPriceMutation } = offerPriceApi;
