// src/features/exercises/exerciseApi.ts
import { apiSlice } from '../../api/apiSlice';
import type { CodeExercise, TestCase} from '../../types/exercise.types';

export const exerciseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    getExercisesByCourse: builder.query<CodeExercise[], number>({
      query: (courseId) => `/api/CodeExercise/course/${courseId}`,
      providesTags: ['Exercises'],
    }),

    getTestCasesByExercise: builder.query<TestCase[], number>({
      query: (exerciseId) => `api/TestCase/exercise/${exerciseId}`,
      providesTags: (result, error, arg) => [{ type: 'TestCases', id: arg }],
    }),

    // 3. הוספת תרגיל חדש
    addExercise: builder.mutation<CodeExercise, Partial<CodeExercise>>({
      query: (newExercise) => ({
        url: '/api/CodeExercise',
        method: 'POST',
        body: newExercise,
      }),
      invalidatesTags: ['Exercises', 'CourseReport'],
    }),

    addTestCase: builder.mutation<TestCase, Partial<TestCase>>({
      query: (newTestCase) => ({
        url: `/api/TestCase`,
        method: 'POST',
        body: newTestCase,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'TestCases', id: arg.exerciseId }],
    }),

    deleteTestCase: builder.mutation<void, { id: number; exerciseId: number }>({
      query: ({ id }) => ({
        url: `api/TestCase/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'TestCases', id: arg.exerciseId }],
    }),

    
    updateTestCase: builder.mutation<TestCase, TestCase>({
      query: (testCase) => ({
        url: `api/TestCase/${testCase.id}`,
        method: 'PUT',
        body: testCase,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'TestCases', id: arg.exerciseId }],
    }),
      }),
    });

export const { 
  useGetExercisesByCourseQuery, 
  useLazyGetTestCasesByExerciseQuery, 
  useAddExerciseMutation,
  useAddTestCaseMutation,
  useDeleteTestCaseMutation,
    useUpdateTestCaseMutation
} = exerciseApi;