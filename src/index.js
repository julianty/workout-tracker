import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./app/store";
import Catalog from "./pages/Catalog";
import About from "./pages/About";
import Tool from "./pages/Tool";
import {
  fetchExerciseCatalog,
  fetchWorkouts,
} from "./features/workouts/workoutsSlice";

store.dispatch(fetchExerciseCatalog);
store.dispatch(fetchWorkouts);

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/tool",
        element: <Tool />,
      },
      {
        path: "/catalog",
        element: <Catalog />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
