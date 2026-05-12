
import { apiSlice } from '../../api/apiSlice';
import type { StudentCourseDisplay } from '../../types/studentCourse.types';


export const studentCourseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudentCourses: builder.query<StudentCourseDisplay[], void>({
      query: () => '/api/User/courses',
    }),
  }),
});

export const { useGetStudentCoursesQuery } = studentCourseApi;