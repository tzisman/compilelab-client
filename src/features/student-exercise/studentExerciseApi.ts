// src/features/exercises/studentExerciseApi.ts
import { apiSlice } from '../../api/apiSlice';
import type { StudentExercise } from '../../types/studentExercise.types';

export const studentExerciseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudentExercises: builder.query<StudentExercise[], number>({
      query: (courseId) => `/api/CodeExercise/studentExercises/${courseId}`,
      providesTags: (result) => 
        result 
          ? [...result.map(({ id }) => ({ type: 'StudentExercises' as const, id })), 'StudentExercises']
          : ['StudentExercises'],
    }),
     getStudentExerciseById: builder.query<StudentExercise, number>({
      query: (exerciseId) => `/api/CodeExercise/${exerciseId}/student/`,
      providesTags: (result, error, id) => [{ type: 'StudentExercises', id }],
    }),
  }),
});


export const { useGetStudentExercisesQuery, useGetStudentExerciseByIdQuery } = studentExerciseApi;