import logo from "./logo.svg";
import "./App.css";
import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { useEffect } from "react";

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
const db = getFirestore(app);

function App() {
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "test", "testDoc");
      const testDoc = await getDoc(docRef);
      if (testDoc.exists()) {
        console.log(testDoc.data());
      }
    };
    fetchData().catch(console.err);
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
