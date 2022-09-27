import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { MaybePromise } from "@reduxjs/toolkit/dist/query/tsHelpers";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { format } from "date-fns";
import { RootState } from "../store";
import {
  Answer,
  AnswerQuestionnaire,
  Application,
  Note,
  QuestionnaireQuestion,
  School,
  User,
  Feedback,
  ContentGuide,
  Count,
  Project,
} from "../store/type";

type Prepare = {
  prepareHeaders?: (
    headers: Headers,
    api: Pick<BaseQueryApi, "getState" | "endpoint" | "type" | "forced">
  ) => MaybePromise<Headers>;
};

const prepareHeaders: Prepare["prepareHeaders"] = (headers, { getState }) => {
  const token = (getState() as RootState)?.auth?.api_token;
  if (token) {
    headers.set("accept", `application/json`);
    headers.set("authorization", `Bearer ${token}`);
  }
  return headers;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<
      User,
      { email: string; password: string; project_id: number }
    >({
      query: (body) => ({
        method: "POST",
        url: "/api/auth",
        body,
      }),
    }),
    getProjects: builder.mutation<Project[], void>({
      query: () => ({
        method: "POST",
        url: "/api/projects/search",
        body: {},
      }),
    }),
    createCoach: builder.mutation<void, User & { project_id: number }>({
      query: (body) => ({
        method: "POST",
        url: "/api/createCoach",
        body,
      }),
    }),
    getSchools: builder.mutation<School[], number>({
      query: (coach_id) => ({
        method: "POST",
        url: "/api/schools/search",
        body: {
          coach_id,
        },
      }),
    }),
    createSchools: builder.mutation<void, School & { project_id: number }>({
      query: (body) => ({
        method: "POST",
        url: "/api/schools",
        body,
      }),
    }),
    getTeachers: builder.mutation<School, number>({
      query: (id) => ({
        method: "POST",
        url: "/api/schools/search",
        body: { id },
      }),
    }),
    getTeacherById: builder.mutation<User, number>({
      query: (id) => ({
        method: "POST",
        url: "/api/users/search",
        body: {
          id,
        },
      }),
    }),
    createTeacher: builder.mutation<
      void,
      User & { school_id: number } & { project_id: number }
    >({
      query: (body) => ({
        method: "POST",
        url: "/api/createTeacher",
        body: { ...body },
      }),
    }),
    getApplications: builder.mutation<
      Application[],
      { coach_id: number; school_id: number; teacher_id: number }
    >({
      query: (body) => ({
        method: "POST",
        url: "/api/questionnaire-applications/search",
        body,
      }),
    }),
    getApplication: builder.mutation<Application, { id: number }>({
      query: (body) => ({
        method: "POST",
        url: "/api/questionnaire-applications/search",
        body,
      }),
    }),
    getQuestions: builder.mutation<
      { questions: QuestionnaireQuestion[] },
      { questionnaire_id: number; teacher_id?: number; feedback?: boolean }
    >({
      query: (body) => ({
        method: "POST",
        url: "/api/questionnaire-questions/search",
        body,
      }),
    }),
    answerQuestionnaire: builder.mutation<Application, AnswerQuestionnaire>({
      query: (body) => ({
        method: "POST",
        url: "/api/answers",
        body,
      }),
    }),
    answerDocQuestionnaire: builder.mutation<Application, AnswerQuestionnaire>({
      query: (body) => ({
        method: "POST",
        url: "/api/document-questionnaire",
        body,
      }),
    }),
    getAnswers: builder.mutation<Answer[], number>({
      query: (questionnaire_application_id) => ({
        method: "POST",
        url: "/api/answers/search",
        body: { questionnaire_application_id },
      }),
    }),
    getLastAnswers: builder.mutation<Answer[], number>({
      query: (teacher_id) => ({
        method: "POST",
        url: "/api/users/lastAnswers",
        body: { teacher_id },
      }),
    }),
    saveNote: builder.mutation<
      void,
      { questionnaire_application_id: number; text: string }
    >({
      query: (body) => ({
        method: "POST",
        url: "/api/notes",
        body,
      }),
    }),
    getNote: builder.mutation<Note, number>({
      query: (id) => ({
        method: "POST",
        url: "/api/notes/search",
        body: { id },
      }),
    }),
    getFeedbacks: builder.mutation<Feedback[], number>({
      query: (id) => ({
        method: "POST",
        url: "/api/feedbacks/search",
        body: {
          questionnaire_application_id: id,
        },
      }),
    }),
    getFeedback: builder.mutation<Feedback, number>({
      query: (id) => ({
        method: "POST",
        url: "/api/feedbacks/search",
        body: {
          id,
        },
      }),
    }),
    answerFeedback: builder.mutation<Note, Feedback>({
      query: (body) => ({
        method: "POST",
        url: "/api/feedbacks",
        body,
      }),
    }),
    createApplication: builder.mutation<void, Partial<Application>>({
      query: (body) => ({
        method: "POST",
        url: "/api/questionnaire-applications",
        body: {
          ...body,
          application_date: format(
            body.application_date || new Date(),
            "yyyy-MM-dd"
          ),
        },
      }),
    }),
    updateApplication: builder.mutation<void, Partial<Application>>({
      query: (body) => ({
        method: "PUT",
        url: "/api/questionnaire-applications",
        body,
      }),
    }),
    getLastFeedbacks: builder.mutation<Feedback[], number>({
      query: (teacher_id) => ({
        method: "POST",
        url: "/api/users/lastFeedbacks",
        body: { teacher_id },
      }),
    }),
    getLastApplications: builder.mutation<
      { data: Application[] },
      { coach_id: number; school_id: number }
    >({
      query: (body) => ({
        method: "POST",
        url: "/api/questionnaire-applications/search",
        body: { ...body, pagination: 5 },
      }),
    }),
    getContentGuide: builder.mutation<ContentGuide, number>({
      query: (id) => ({
        method: "POST",
        url: "/api/content-guides/search",
        body: { id },
      }),
    }),
    updateUser: builder.mutation<void, User>({
      query: (body) => ({
        method: "PUT",
        url: "/api/users",
        body,
      }),
    }),
    updatePassword: builder.mutation<
      void,
      { old_password: string; new_password: string }
    >({
      query: (body) => ({
        method: "POST",
        url: "/api/changePassword",
        body,
      }),
    }),
    countCompetenceFeedbacks: builder.mutation<
      Count,
      {
        teacher_id: number;
        competence_id: number;
      }
    >({
      query: (body) => ({
        method: "POST",
        url: "/api/feedbacks/search",
        body: {
          ...body,
          count: true,
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetNoteMutation,
  useSaveNoteMutation,
  useGetAnswersMutation,
  useUpdateUserMutation,
  useGetSchoolsMutation,
  useGetProjectsMutation,
  useCreateCoachMutation,
  useGetTeachersMutation,
  useGetFeedbackMutation,
  useGetFeedbacksMutation,
  useGetQuestionsMutation,
  useCreateSchoolsMutation,
  useCreateTeacherMutation,
  useUpdatePasswordMutation,
  useGetLastAnswersMutation,
  useGetTeacherByIdMutation,
  useGetApplicationMutation,
  useAnswerFeedbackMutation,
  useGetApplicationsMutation,
  useGetContentGuideMutation,
  useGetLastFeedbacksMutation,
  useUpdateApplicationMutation,
  useCreateApplicationMutation,
  useGetLastApplicationsMutation,
  useAnswerQuestionnaireMutation,
  useCountCompetenceFeedbacksMutation,
  useAnswerDocQuestionnaireMutation,
} = api;
