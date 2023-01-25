import { createSlice } from "@reduxjs/toolkit";
import { firebaseApp } from "../../App";
import { doc, getDoc, getFirestore } from "firebase/firestore";

export const workoutsSlice = createSlice({
  name: "workouts",
  initialState: {
    test: "test",
    sessions: {},
  },
  reducers: {
    addSession: (state) => {
      state.test = "test reduce";
    },
    fetchWorkouts: (state, action) => {
      state.sessions = action.payload;
    },
  },
});

export const { addSession } = workoutsSlice.actions;

export async function fetchWorkouts(dispatch, getState) {
  const db = getFirestore(firebaseApp);
  const docRef = doc(db, "testUserData", "Workouts");
  const response = await getDoc(docRef);
  dispatch({ type: "workouts/fetchWorkouts", payload: response.data() });
}
export default workoutsSlice.reducer;
