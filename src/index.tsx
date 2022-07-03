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

import TeacherDetails from "./routes/TeacherDetails";
import ObservationQuestionnaire from "./routes/ObservationQuestionnaire";
import TeachersList from "./routes/TeacherList";
import SchoolsList from "./routes/SchoolList";
import Login from "./routes/Login";
import ApplicationDetails from "./routes/ApplicationDetails";
import ApplicationNotes from "./routes/ApplicationNotes";
import FeedbackQuestionnaire from "./routes/FeedbackQuestionnaire";
import FeedbackList from "./routes/FeedbackList";
import FeedbackDetails from "./routes/FeedbackDetails";
import ObservationDetails from "./routes/ObservationDetails";
import GuideContent from "./routes/GuideContent";
import SignUp from "./routes/SignUp";

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
            <Route path="sign-up" element={<SignUp />} />
            <Route
              path="select-school"
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
              path="teacher/:teacherId"
              element={
                <ProtectedRoute>
                  <TeacherDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="application-details/:applicationId/:questionnaireId"
              element={
                <ProtectedRoute>
                  <ApplicationDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="questionnaire/:applicationId/:questionnaireId"
              element={
                <ProtectedRoute>
                  <ObservationQuestionnaire />
                </ProtectedRoute>
              }
            />
            <Route
              path="questionnaire-observation-review/:applicationId"
              element={
                <ProtectedRoute>
                  <ObservationDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="feedback-list/:applicationId"
              element={
                <ProtectedRoute>
                  <FeedbackList />
                </ProtectedRoute>
              }
            />
            <Route
              path="feedback-details/:feedbackId"
              element={
                <ProtectedRoute>
                  <FeedbackDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="guide-content/:id"
              element={
                <ProtectedRoute>
                  <GuideContent />
                </ProtectedRoute>
              }
            />
            <Route
              path="questionnaire-feedback/:applicationId/:questionnaireId"
              element={
                <ProtectedRoute>
                  <FeedbackQuestionnaire />
                </ProtectedRoute>
              }
            />
            <Route
              path="questionnaire-review/:applicationId"
              element={
                <ProtectedRoute>
                  <ApplicationNotes />
                </ProtectedRoute>
              }
            />
            <Route
              path="questionnaire-review-details/:id"
              element={
                <ProtectedRoute>
                  <ApplicationNotes />
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
