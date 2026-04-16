import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { LoginRequest, SignupRequest, AuthResponse} from '../types/user.types.ts';
import type { Course, CreateCourseRequest } from '../types/teacherCourse.types.ts';
import type { RootState } from '../app/store.ts'; 

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:5035',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  
  tagTypes: ['Courses'],

  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({ 
      query: (credentials) => ({
        url: '/api/User/login', 
        method: 'POST',     
        body: credentials,  
      }),
    }),

    signup: builder.mutation<AuthResponse, SignupRequest>({
      query: (newUser) => ({
        url: '/api/User/register',
        method: 'POST',
        body: newUser,     
      }),
    }),


    getTeacherCourses: builder.query<Course[], void>({
      query: () => '/api/User/lecturers',
      providesTags: ['Courses'],
    }),

    addCourse: builder.mutation<Course, CreateCourseRequest>({
      query: (newCourse) => ({
        url: '/api/Course',
        method: 'POST',
        body: newCourse,     
      }),
      invalidatesTags: ['Courses'], 
    }),
  }),
});

export const { 
  useLoginMutation, 
  useSignupMutation, 
  useGetTeacherCoursesQuery, 
  useAddCourseMutation  
} = apiSlice;