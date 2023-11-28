import { configureStore } from "@reduxjs/toolkit";
import currentUserSlice from "../features/currentUser/currentUserSlice";

const store = configureStore({
  reducer: {
    currentUser: currentUserSlice,
  },
});

export default store;
