import { createSlice } from "@reduxjs/toolkit";

export const workoutsSlice = createSlice({
  name: "workouts",
  initialState: {
    test: "test",
  },
  reducers: {
    addSession: (state) => {
      state.test = "test reduce";
    },
  },
});

export const { addSession } = workoutsSlice.actions;
export default workoutsSlice.reducer;
