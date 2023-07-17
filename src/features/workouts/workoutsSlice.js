import { createSlice, current } from "@reduxjs/toolkit";
import { firebaseApp } from "../../App";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";

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
    deleteExercise: (state, action) => {
      const sessionName = action.payload.sessionName;
      const exerciseIdx = action.payload.exerciseIdx;
      state.sessions[sessionName].exercises.splice(exerciseIdx, 1);
      updateUserData(current(state.sessions), action.payload.uid);
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
    updateExercises: (state, action) => {
      const sessionName = action.payload.sessionName;
      const exerciseIdx = action.payload.exerciseIdx;
      const exerciseData = action.payload.exerciseData;
      state.sessions[sessionName].exercises[exerciseIdx] = exerciseData;
      const updatedExercises = current(state.sessions[sessionName]);
      updateExercises(sessionName, updatedExercises, action.payload.uid);
    },
    addExerciseToCatalog: (state, action) => {
      const exerciseName = action.payload.exerciseName;
      const muscles = action.payload.muscles.split(",");
      state.catalog[exerciseName] = { name: exerciseName, muscles: muscles };
      const newExercise = {};
      newExercise[exerciseName] = {
        name: exerciseName,
        muscles: muscles,
      }; // might need to check that muscleGroups is an array
      addExerciseToFirebaseCatalog(newExercise);
    },
    updateExerciseInCatalog: (state, action) => {
      const exerciseName = action.payload.exerciseName;
      const muscles = action.payload.muscles.split(",");
      state.catalog[exerciseName] = { name: exerciseName, muscles: muscles };
      const updatedExercise = {};
      updatedExercise[exerciseName] = {
        name: exerciseName,
        muscles: muscles,
      };
    },
  },
});

async function addExerciseToFirebaseCatalog(newExercise) {
  // Update data
  const db = getFirestore(firebaseApp);
  updateDoc(doc(db, "exerciseCatalog", "exercises"), newExercise);
  console.log(newExercise);
}

async function updateExerciseInFirebaseCatalog(exerciseName, updatedExercise) {
  // Takes the existing exerciseName as in the firebase catalog and
  // the updatedExercise object to delete the existing entry on Firebase
  // and replace it with an updated one
  const db = getFirestore(firebaseApp);
  const docRef = doc(db, "exerciseCatalog", "exercises");

  // Delete field
  await updateDoc(docRef, { exerciseName }.deleteField());

  // Add updated field
  await addExerciseToFirebaseCatalog(updatedExercise);
}

async function updateUserData(workoutsData, uid) {
  const db = getFirestore(firebaseApp);
  if (uid === undefined) return;
  const docRef = doc(db, "testUserData", uid);
  updateDoc(docRef, workoutsData);
}

async function updateExercises(sessionName, updatedExercises, uid) {
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
