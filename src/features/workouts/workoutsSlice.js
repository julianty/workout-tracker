import { createSlice, current } from "@reduxjs/toolkit";
import { firebaseApp } from "../../App";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";

export const workoutsSlice = createSlice({
  name: "workouts",
  initialState: {
    test: "test",
    sessions: {},
    catalog: {},
  },
  reducers: {
    addSession: (state) => {
      state.test = "test reduce";
    },
    fetchWorkouts: (state, action) => {
      state.sessions = action.payload;
    },
    fetchExerciseCatalog: (state, action) => {
      state.catalog = action.payload;
    },
    addExercise: (state, action) => {
      const sessionName = action.payload.name;
      const newIdx = Object.keys(state.sessions[sessionName].exercises).length;
      state.sessions[sessionName].exercises[newIdx] = {
        exercise: "Click to edit",
        reps: "0",
        sets: "0",
        weight: "0",
      };
    },
    addWorkout: (state) => {
      const sessionName = `testSession${
        Object.values(current(state.sessions)).length + 1
      }`;
      state.sessions[sessionName] = {
        timestamp: new Date(Date.now()).toISOString(),
        exercises: [],
      };
    },
    updateWorkouts: (state, action) => {
      const sessionName = action.payload.sessionName;
      const exerciseIdx = action.payload.exerciseIdx;
      const exerciseData = action.payload.exerciseData;
      state.sessions[sessionName].exercises[exerciseIdx] = exerciseData;
      const updatedExercises = current(state.sessions[sessionName]);
      updateWorkouts(sessionName, updatedExercises, action.payload.uid);
    },
  },
});

async function updateWorkouts(sessionName, updatedExercises, uid) {
  const db = getFirestore(firebaseApp);
  let docRef;
  if (uid === undefined) {
    docRef = doc(db, "testUserData", "Workouts");
  } else {
    docRef = doc(db, "testUserData", uid);
  }
  const updatedSession = {};
  updatedSession[sessionName] = updatedExercises;
  updateDoc(docRef, updatedSession);
}

export const { addSession } = workoutsSlice.actions;

export async function fetchWorkouts(dispatch, getState) {
  const db = getFirestore(firebaseApp);
  const user = getState().auth.user;
  let docRef;
  if (Object.values(user).length === 0) {
    docRef = doc(db, "testUserData", "Workouts");
  } else {
    docRef = doc(db, "testUserData", user.uid);
  }
  const response = await getDoc(docRef);
  dispatch({ type: "workouts/fetchWorkouts", payload: response.data() });
}

export async function fetchExerciseCatalog(dispatch, getState) {
  const db = getFirestore(firebaseApp);
  const exerciseCatalog = await getDoc(doc(db, "exerciseCatalog", "exercises"));
  dispatch({
    type: "workouts/fetchExerciseCatalog",
    payload: exerciseCatalog.data(),
  });
}

export default workoutsSlice.reducer;
