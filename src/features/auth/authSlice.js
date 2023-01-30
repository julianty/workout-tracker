import { createSlice, current } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
  },
  reducers: {
    signIn: (state, action) => {
      state.user = action.payload.user;
    },
  },
});

export default authSlice.reducer;
