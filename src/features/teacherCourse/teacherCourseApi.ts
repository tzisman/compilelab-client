import { apiSlice } from '../../api/apiSlice';
import type { Course, CreateCourseRequest } from '../../types/teacherCourse.types';
import type { Exercise } from '../../types/exercise.types'; 

export const teacherCourseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeacherCourses: builder.query<Course[], void>({
      query: () => '/api/User/lecturers',
      providesTags: ['Courses'],
    }),

    getExercisesByCourse: builder.query<Exercise[], number>({
      query: (courseId) => `/api/CodeExercise/course/${courseId}`, 
      providesTags: ['Exercises'],
    }),

    addTeacherCourse: builder.mutation<Course, CreateCourseRequest>({
      query: (newCourse) => ({
        url: '/api/Course',
        method: 'POST',
        body: newCourse,     
      }),
      invalidatesTags: ['Courses'], 
    }),

    updateTeacherCourse: builder.mutation<Course, CreateCourseRequest>({
        query: (updatedCourse) => ({
          url: `/api/Course/${updatedCourse.id}`, 
          method: 'PUT',
          body: updatedCourse, 
        }),
      invalidatesTags: ['Courses'], 
    }),
    
  }),
});
 
export const {
  useGetTeacherCoursesQuery,
  useGetExercisesByCourseQuery,
  useAddTeacherCourseMutation,
  useUpdateTeacherCourseMutation 
} = teacherCourseApi;