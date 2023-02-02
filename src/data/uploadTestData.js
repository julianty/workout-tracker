import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import testUserData from "./testWorkouts.js";
import exercises from "./exercises.js";

const firebaseConfig = {
  apiKey: "AIzaSyAllAim2pin7FeCp_v5GRFg4WQv1iboObI",
  authDomain: "workout-tracker-2d69d.firebaseapp.com",
  projectId: "workout-tracker-2d69d",
  storageBucket: "workout-tracker-2d69d.appspot.com",
  messagingSenderId: "781275830167",
  appId: "1:781275830167:web:be75eaac33474c22d656d2",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function uploadTestData() {
  await setDoc(doc(db, "testUserData", "Workouts"), testUserData);
}

export async function uploadExerciseCatalog() {
  const formattedExercises = {};
  exercises.data.forEach((exercise) => {
    formattedExercises[exercise.name] = exercise;
  });
  await setDoc(doc(db, "exerciseCatalog", "exercises"), formattedExercises);
}

// export default uploadTestData;
