import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { initializeApp } from "firebase/app";

import Navbar from "./components/navbar";
import { Outlet } from "react-router-dom";

import { uploadTestData, uploadExerciseCatalog } from "./data/uploadTestData";
// For some reason the .env file references were interfering with the firebase connection
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_apiKey,
//   authDomain: process.env.REACT_APP_authDomain,
//   projectId: process.env.REACT_APP_projectId,
//   storageBucket: process.env.REACT_APP_storageBucket,
//   messagingSenderId: process.env.REACT_APP_messagingSenderId,
//   appId: process.env.REACT_APP_appId,
// };

const firebaseConfig = {
  apiKey: "AIzaSyAllAim2pin7FeCp_v5GRFg4WQv1iboObI",
  authDomain: "workout-tracker-2d69d.firebaseapp.com",
  projectId: "workout-tracker-2d69d",
  storageBucket: "workout-tracker-2d69d.appspot.com",
  messagingSenderId: "781275830167",
  appId: "1:781275830167:web:be75eaac33474c22d656d2",
};

const app = initializeApp(firebaseConfig);

function App() {
  // uploadExerciseCatalog();
  uploadTestData();
  return (
    <div className="App">
      <Navbar></Navbar>
      <Outlet />
    </div>
  );
}

export const firebaseApp = app;
export default App;
