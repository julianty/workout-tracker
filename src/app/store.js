import { configureStore } from "@reduxjs/toolkit";
import workoutsReducer from "../features/workouts/workoutsSlice";

export default configureStore({
  reducer: {
    workouts: workoutsReducer,
  },
});
