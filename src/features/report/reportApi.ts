import { apiSlice } from '../../api/apiSlice';
import type { CourseReport } from '../../types/report.types';

export const teacherCourseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourseGradesReport: builder.query<CourseReport[], number>({
      query: (courseId) => `/api/UserInCourse/GetReport/${courseId}`, 
      providesTags: (result) => 
        result 
          ? [...result.map(({ studentId }) => ({ type: 'CourseReport' as const, id: studentId })), 'CourseReport']
          : ['CourseReport'],
    }),
    
  }),
});

export const { useGetCourseGradesReportQuery } = teacherCourseApi;