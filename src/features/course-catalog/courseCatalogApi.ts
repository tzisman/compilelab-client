
import { apiSlice } from '../../api/apiSlice';
import type { CourseCatalog, JoinToCourseRequest } from '../../types/courseCatalog.types';


export const courseCatalogApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourseCatalog: builder.query<CourseCatalog[], void>({
      query: () => '/api/Course',
    }),
    joinToCourse: builder.mutation<void, JoinToCourseRequest>({
      query: (joinRequest) => ({
        url: '/api/UserInCourse',
        method: 'POST',
        body: joinRequest,
      }),
    }),

  }),
});

export const { useGetCourseCatalogQuery, useJoinToCourseMutation } = courseCatalogApi;