import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import reportWebVitals from "./reportWebVitals";
import { ProtectedRoute } from "./components";
import ReactDOM from "react-dom/client";
import Profile from "./routes/Profile";
import { Provider } from "react-redux";
import { store } from "./store";
import { theme } from "./theme";
import App from "./app";
import "./i18n";

import ApplicationsList from "./routes/ApplicationsList";
import Questionnaire from "./routes/Questionnaire";
import TeachersList from "./routes/TeachersList";
import SchoolsList from "./routes/SchoolsList";
import Login from "./routes/Login";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Login />} />
            <Route
              path="choose-school"
              element={
                <ProtectedRoute>
                  <SchoolsList />
                </ProtectedRoute>
              }
            />
            <Route
              path="teachers"
              element={
                <ProtectedRoute>
                  <TeachersList />
                </ProtectedRoute>
              }
            />
            <Route
              path="applications/:teacherId"
              element={
                <ProtectedRoute>
                  <ApplicationsList />
                </ProtectedRoute>
              }
            />
            <Route
              path="questionnaire/:applicationId"
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
    </ThemeProvider>
  </Provider>
);

reportWebVitals();
