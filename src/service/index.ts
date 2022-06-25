import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Answer,
  AnswerQuestionnaire,
  Application,
  Note,
  QuestionnaireQuestion,
  Questionnaire,
  School,
  User,
} from "../store/type";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    getCoaches: builder.mutation<User[], void>({
      query: () => ({
        method: "POST",
        url: "/api/users/search",
        body: {
          profile_id: 2,
        },
      }),
    }),
    login: builder.mutation<User, number>({
      query: (id) => ({
        method: "POST",
        url: "/api/users/search",
        body: {
          id,
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
    getTeachers: builder.mutation<
      User[],
      { coach_id: number; school_id: number }
    >({
      query: (body) => ({
        method: "POST",
        url: "/api/coaches/questionnaire-applications/teachers",
        body,
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
  }),
});

export const {
  useLoginMutation,
  useGetNoteMutation,
  useSaveNoteMutation,
  useGetAnswersMutation,
  useGetCoachesMutation,
  useGetSchoolsMutation,
  useGetTeachersMutation,
  useGetQuestionsMutation,
  useGetTeacherByIdMutation,
  useGetApplicationMutation,
  useGetApplicationsMutation,
  useAnswerQuestionnaireMutation,
} = api;
