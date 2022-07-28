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
          <Route index element={<SelectProject />} />
          <Route path="login/:projectId" element={<Login />} />
          <Route path="sign-up/:projectId" element={<SignUp />} />
          <Route
            path="select-school"
            element={
              <React.Suspense fallback={<>...</>}>
                <ProtectedRoute>
                  <SchoolsList />
                </ProtectedRoute>
              </React.Suspense>
            }
          />
          <Route
            path="school-form"
            element={
              <React.Suspense fallback={<>...</>}>
                <ProtectedRoute>
                  <SchoolForm />
                </ProtectedRoute>
              </React.Suspense>
            }
          />

          <Route
            path="teachers"
            element={
              <React.Suspense fallback={<>...</>}>
                <ProtectedRoute>
                  <TeachersList />
                </ProtectedRoute>
              </React.Suspense>
            }
          />
          <Route
            path="teacher-form"
            element={
              <React.Suspense fallback={<>...</>}>
                <ProtectedRoute>
                  <TeacherForm />
                </ProtectedRoute>
              </React.Suspense>
            }
          />
          <Route
            path="teacher/:teacherId"
            element={
              <React.Suspense fallback={<>...</>}>
                <ProtectedRoute>
                  <TeacherDetails />
                </ProtectedRoute>
              </React.Suspense>
            }
          />
          <Route
            path="application-form/:teacherId"
            element={
              <React.Suspense fallback={<>...</>}>
                <ProtectedRoute>
                  <ApplicationForm />
                </ProtectedRoute>
              </React.Suspense>
            }
          />
          <Route
            path="application-details/:applicationId/:questionnaireId"
            element={
              <React.Suspense fallback={<>...</>}>
                <ProtectedRoute>
                  <ApplicationDetails />
                </ProtectedRoute>
              </React.Suspense>
            }
          />
          <Route
            path="questionnaire/:applicationId"
            element={
              <React.Suspense fallback={<>...</>}>
                <ProtectedRoute>
                  <ObservationQuestionnaire />
                </ProtectedRoute>
              </React.Suspense>
            }
          />
          <Route
            path="questionnaire-observation-review/:applicationId"
            element={
              <React.Suspense fallback={<>...</>}>
                <ProtectedRoute>
                  <ObservationDetails />
                </ProtectedRoute>
              </React.Suspense>
            }
          />
          <Route
            path="feedback-list/:applicationId"
            element={
              <React.Suspense fallback={<>...</>}>
                <ProtectedRoute>
                  <FeedbackList />
                </ProtectedRoute>
              </React.Suspense>
            }
          />
          <Route
            path="feedback-details/:feedbackId"
            element={
              <React.Suspense fallback={<>...</>}>
                <ProtectedRoute>
                  <FeedbackDetails />
                </ProtectedRoute>
              </React.Suspense>
            }
          />
          <Route
            path="questionnaire-feedback/:applicationId/:questionnaireId"
            element={
              <React.Suspense fallback={<>...</>}>
                <ProtectedRoute>
                  <FeedbackQuestionnaire />
                </ProtectedRoute>
              </React.Suspense>
            }
          />
          <Route
            path="questionnaire-review/:applicationId"
            element={
              <React.Suspense fallback={<>...</>}>
                <ProtectedRoute>
                  <ApplicationNotes />
                </ProtectedRoute>
              </React.Suspense>
            }
          />
          <Route
            path="questionnaire-review-details/:id"
            element={
              <React.Suspense fallback={<>...</>}>
                <ProtectedRoute>
                  <ApplicationNotes />
                </ProtectedRoute>
              </React.Suspense>
            }
          />
          <Route
            path="profile"
            element={
              <React.Suspense fallback={<>...</>}>
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              </React.Suspense>
            }
          />
          <Route
            path="profile-form"
            element={
              <React.Suspense fallback={<>...</>}>
                <ProtectedRoute>
                  <ProfileForm />
                </ProtectedRoute>
              </React.Suspense>
            }
          />
          <Route
            path="update-password"
            element={
              <React.Suspense fallback={<>...</>}>
                <ProtectedRoute>
                  <UpdatePassword />
                </ProtectedRoute>
              </React.Suspense>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
