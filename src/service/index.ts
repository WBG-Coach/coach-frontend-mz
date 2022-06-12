import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Application,
  Question,
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
      { questions: Question[]; questionnaire: Questionnaire },
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
  }),
});

export const {
  useLoginMutation,
  useGetCoachesMutation,
  useGetSchoolsMutation,
  useGetTeachersMutation,
  useGetQuestionsMutation,
  useGetTeacherByIdMutation,
  useGetApplicationMutation,
  useGetApplicationsMutation,
} = api;
