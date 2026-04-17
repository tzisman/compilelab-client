import { apiSlice } from '../../api/apiSlice';
import type { Course, CreateCourseRequest } from '../../types/teacherCourse.types';

export const teacherCourseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeacherCourses: builder.query<Course[], void>({
      query: () => '/api/User/lecturers',
      providesTags: ['Courses'],
    }),
    addTeacherCourse: builder.mutation<Course, CreateCourseRequest>({
      query: (newCourse) => ({
        url: '/api/Course',
        method: 'POST',
        body: newCourse,     
      }),
      invalidatesTags: ['Courses'], 
    }),
  }),
});

export const { useGetTeacherCoursesQuery, useAddTeacherCourseMutation } = teacherCourseApi;