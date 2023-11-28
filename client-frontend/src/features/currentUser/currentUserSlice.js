import { createSlice } from "@reduxjs/toolkit";

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: {
    token: null,
  },
  reducers: {
    setUserIdToken: (state, action) => {
      state.token = action.payload.token;
    },
    clearUserIdToken: (state) => {
      state.token = null;
    },
  },
});

export const { setUserIdToken, clearUserIdToken } = currentUserSlice.actions;
export default currentUserSlice.reducer;
