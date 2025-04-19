"use client";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice"; 
import { expertChatApi } from "./slice/chatHi2"; 
import { expertCallApi } from "./slice/callHistorySlice"; 
import {profileApi} from "./slice/profileApi";
import {remedyApi} from "./slice/remedySlice";
import {storeApi} from "./slice/storeSlice";
import {priceRequestApi} from "./slice/priceRequestSlice";
import {getReviewApi} from "./slice/getReviewSlice";
import {walletApi} from "./slice/walletSlice";
import {myFollowerApi} from "./slice/myFollower";
import {liveEventApi} from "./slice/liveEvent";
import { offerPriceApi } from "./slice/offerPrice";
import {dosaAndDontApi} from "./slice/doesDont";
import {notesApi} from "./slice/notesApi";
import {importantNumberApi} from "./slice/importantNumber";

const store = configureStore({
  reducer: {
    auth: authReducer, 
    [expertChatApi.reducerPath]: expertChatApi.reducer,
    [expertCallApi.reducerPath]:expertCallApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [remedyApi.reducerPath]: remedyApi.reducer,
    [storeApi.reducerPath]: storeApi.reducer,
    [priceRequestApi.reducerPath]: priceRequestApi.reducer,
    [getReviewApi.reducerPath]: getReviewApi.reducer,
    [walletApi.reducerPath]: walletApi.reducer,
    [myFollowerApi.reducerPath]: myFollowerApi.reducer,
    [liveEventApi.reducerPath]: liveEventApi.reducer,
    [offerPriceApi.reducerPath]: offerPriceApi.reducer,
    [dosaAndDontApi.reducerPath]: dosaAndDontApi.reducer,
    [notesApi.reducerPath] : notesApi.reducer,
    [importantNumberApi.reducerPath]: importantNumberApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      expertChatApi.middleware,
    expertCallApi.middleware,
    profileApi.middleware,
    remedyApi.middleware,
    storeApi.middleware,
    priceRequestApi.middleware,
    getReviewApi.middleware,
    walletApi.middleware,
    myFollowerApi.middleware,
    liveEventApi.middleware,
    offerPriceApi.middleware,
    dosaAndDontApi.middleware,
    notesApi.middleware,
    importantNumberApi.middleware,
    ),
});

export default store;
