
import { apiSlice } from '../../api/apiSlice';
import type { CourseCatalog, JoinToCourseRequest } from '../../types/courseCatalog.types';


export const courseCatalogApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourseCatalog: builder.query<CourseCatalog[], { page?: number; size?: number; search?: string }>({
      query: (params) => ({
        url: '/api/Course',
        params: { 
          page: params.page ?? 1,
          size: params.size ?? 10,
          search: params.search
        },
      }),
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