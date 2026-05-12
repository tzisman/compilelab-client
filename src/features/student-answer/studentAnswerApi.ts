import { apiSlice } from '../../api/apiSlice';
import type { AnswerMark, StudentAnswer } from '../../types/studentAnswer.types';
 


export const studentAnswerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    getStudentAnswerById: builder.query<StudentAnswer, number>({
      query: (id) => `/api/StudentAnswer/${id}`,
      providesTags: (result, error, id) => [{ type: 'StudentAnswer' as const, id }],
    }),
    

    addStudentAnswer: builder.mutation<StudentAnswer, Partial<StudentAnswer>>({
      query: (newAnswer) => ({
        url: '/api/StudentAnswer',
        method: 'POST',
        body: newAnswer,
      }),
      invalidatesTags: ['StudentExercises'],
    }),

    updateStudentAnswer: builder.mutation<StudentAnswer, { id: number; data: Partial<StudentAnswer> }>({
      query: ({ id, data }) => ({
        url: `/api/StudentAnswer/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'StudentAnswer' as const, id },
        'StudentExercises'
      ],
    }),

    getStudentMark: builder.mutation<AnswerMark, number>({
      query: (id) => ({
        url: `/api/StudentAnswer/mark/${id}`,
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { 
  useGetStudentAnswerByIdQuery, 
  useAddStudentAnswerMutation, 
  useUpdateStudentAnswerMutation,
  useGetStudentMarkMutation 
} = studentAnswerApi;