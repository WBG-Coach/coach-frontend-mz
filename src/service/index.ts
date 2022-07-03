import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { MaybePromise } from "@reduxjs/toolkit/dist/query/tsHelpers";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import {
  Answer,
  AnswerQuestionnaire,
  Application,
  Note,
  QuestionnaireQuestion,
  Questionnaire,
  School,
  User,
  Feedback,
  ContentGuide,
} from "../store/type";

type Prepare = {
  prepareHeaders?: (
    headers: Headers,
    api: Pick<BaseQueryApi, "getState" | "endpoint" | "type" | "forced">
  ) => MaybePromise<Headers>;
};

const prepareHeaders: Prepare["prepareHeaders"] = (headers, { getState }) => {
  const token = (getState() as RootState)?.auth?.api_token;
  headers.set("Content-Type", "application/json");
  if (token) {
    headers.set("authorization", `Bearer ${token}`);
  }
  return headers;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://173.255.230.140:81",
    prepareHeaders,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<User, { email: string; password: string }>({
      query: ({ email }) => ({
        method: "POST",
        url: "http://173.255.230.140:81/api/auth",
        body: {
          email,
        },
      }),
    }),
    getSchools: builder.mutation<School[], number>({
      query: (coach_id) => ({
        method: "POST",
        url: "/api/coaches/questionnaire-applications/schools",
        body: {
          coach_id,
        },
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
      { questions: QuestionnaireQuestion[]; questionnaire: Questionnaire },
      number
    >({
      query: (questionnaire_id) => ({
        method: "POST",
        url: "/api/questionnaire-questions/search",
        body: {
          questionnaire_id,
        },
      }),
    }),
    answerQuestionnaire: builder.mutation<any, AnswerQuestionnaire>({
      query: (body) => ({
        method: "POST",
        url: "/api/answers",
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
  }),
});

export const {
  useLoginMutation,
  useGetNoteMutation,
  useSaveNoteMutation,
  useGetAnswersMutation,
  useGetSchoolsMutation,
  useGetTeachersMutation,
  useGetQuestionsMutation,
  useGetTeacherByIdMutation,
  useGetApplicationMutation,
  useGetFeedbackMutation,
  useGetFeedbacksMutation,
  useGetApplicationsMutation,
  useGetLastAnswersMutation,
  useGetLastApplicationsMutation,
  useGetLastFeedbacksMutation,
  useAnswerQuestionnaireMutation,
  useAnswerFeedbackMutation,
  useGetContentGuideMutation,
} = api;
