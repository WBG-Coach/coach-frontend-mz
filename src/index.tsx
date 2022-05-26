import React from "react";
import App from "./app";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./routes/Login";
import SchoolsList from "./routes/SchoolsList";
import TeachersList from "./routes/TeachersList";
import ApplicationsList from "./routes/ApplicationsList";
import Questionnaire from "./routes/Questionnaire";
import { ProtectedRoute } from "./components";
import Profile from "./routes/Profile";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Login />} />
        <Route
          path="applications"
          element={
            <ProtectedRoute>
              <SchoolsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="applications/:schoolId"
          element={
            <ProtectedRoute>
              <TeachersList />
            </ProtectedRoute>
          }
        />
        <Route
          path="applications/:schoolId/:teacherId"
          element={
            <ProtectedRoute>
              <ApplicationsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="questionnaire"
          element={
            <ProtectedRoute>
              <Questionnaire />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
