import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { ProtectedRoute } from "./components";
import ReactDOM from "react-dom/client";
import Profile from "./routes/Profile";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./app";
import "./i18n";

const TeacherDetails = React.lazy(() => import("./routes/TeacherDetails"));
const ObservationQuestionnaire = React.lazy(
  () => import("./routes/ObservationQuestionnaire")
);
const TeachersList = React.lazy(() => import("./routes/TeacherList"));
const SchoolsList = React.lazy(() => import("./routes/SchoolList"));
const Login = React.lazy(() => import("./routes/Login"));
const ApplicationDetails = React.lazy(
  () => import("./routes/ApplicationDetails")
);
const ApplicationNotes = React.lazy(() => import("./routes/ApplicationNotes"));
const FeedbackQuestionnaire = React.lazy(
  () => import("./routes/FeedbackQuestionnaire")
);
const FeedbackList = React.lazy(() => import("./routes/FeedbackList"));
const FeedbackDetails = React.lazy(() => import("./routes/FeedbackDetails"));
const ObservationDetails = React.lazy(
  () => import("./routes/ObservationDetails")
);
const SignUp = React.lazy(() => import("./routes/SignUp"));
const SchoolForm = React.lazy(() => import("./routes/SchoolForm"));
const TeacherForm = React.lazy(() => import("./routes/TeacherForm"));
const ApplicationForm = React.lazy(() => import("./routes/ApplicationForm"));
const SelectProject = React.lazy(() => import("./routes/SelectProject"));
const ProfileForm = React.lazy(() => import("./routes/ProfileForm"));
const UpdatePassword = React.lazy(() => import("./routes/UpdatePassword"));

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route
            index
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <SelectProject />
              </React.Suspense>
            }
          />
          <Route
            path="login/:projectId"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <Login />
              </React.Suspense>
            }
          />
          <Route
            path="sign-up/:projectId"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <SignUp />
              </React.Suspense>
            }
          />
          <Route
            path="select-school"
            element={
              <ProtectedRoute>
                <React.Suspense fallback={<div>Loading...</div>}>
                  <SchoolsList />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="school-form"
            element={
              <ProtectedRoute>
                <React.Suspense fallback={<div>Loading...</div>}>
                  <SchoolForm />
                </React.Suspense>
              </ProtectedRoute>
            }
          />

          <Route
            path="teachers"
            element={
              <ProtectedRoute>
                <React.Suspense fallback={<div>Loading...</div>}>
                  <TeachersList />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="teacher-form"
            element={
              <ProtectedRoute>
                <React.Suspense fallback={<div>Loading...</div>}>
                  <TeacherForm />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="teacher/:teacherId"
            element={
              <ProtectedRoute>
                <React.Suspense fallback={<div>Loading...</div>}>
                  <TeacherDetails />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="application-form/:teacherId"
            element={
              <ProtectedRoute>
                <React.Suspense fallback={<div>Loading...</div>}>
                  <ApplicationForm />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="application-details/:applicationId/:questionnaireId"
            element={
              <ProtectedRoute>
                <React.Suspense fallback={<div>Loading...</div>}>
                  <ApplicationDetails />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="questionnaire/:applicationId"
            element={
              <ProtectedRoute>
                <React.Suspense fallback={<div>Loading...</div>}>
                  <ObservationQuestionnaire />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="questionnaire-observation-review/:applicationId"
            element={
              <ProtectedRoute>
                <React.Suspense fallback={<div>Loading...</div>}>
                  <ObservationDetails />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="feedback-list/:applicationId"
            element={
              <ProtectedRoute>
                <React.Suspense fallback={<div>Loading...</div>}>
                  <FeedbackList />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="feedback-details/:feedbackId"
            element={
              <ProtectedRoute>
                <React.Suspense fallback={<div>Loading...</div>}>
                  <FeedbackDetails />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="questionnaire-feedback/:applicationId/:questionnaireId"
            element={
              <ProtectedRoute>
                <React.Suspense fallback={<div>Loading...</div>}>
                  <FeedbackQuestionnaire />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="questionnaire-review/:applicationId"
            element={
              <ProtectedRoute>
                <React.Suspense fallback={<div>Loading...</div>}>
                  <ApplicationNotes />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="questionnaire-review-details/:id"
            element={
              <ProtectedRoute>
                <React.Suspense fallback={<div>Loading...</div>}>
                  <ApplicationNotes />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <React.Suspense fallback={<div>Loading...</div>}>
                  <Profile />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="profile-form"
            element={
              <ProtectedRoute>
                <React.Suspense fallback={<div>Loading...</div>}>
                  <ProfileForm />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="update-password"
            element={
              <ProtectedRoute>
                <React.Suspense fallback={<div>Loading...</div>}>
                  <UpdatePassword />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
