import { configureStore } from "@reduxjs/toolkit";
import workoutsReducer from "../features/workouts/workoutsSlice";
import authReducer from "../features/auth/authSlice";
export default configureStore({
  reducer: {
    workouts: workoutsReducer,
    auth: authReducer,
  },
});
