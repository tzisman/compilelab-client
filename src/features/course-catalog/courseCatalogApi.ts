
import { apiSlice } from '../../api/apiSlice';
import type { CourseCatalog } from '../../types/courseCatalog.types';


export const courseCatalogApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourseCatalog: builder.query<CourseCatalog[], void>({
      query: () => '/api/Course',
    }),
  }),
});

export const { useGetCourseCatalogQuery } = courseCatalogApi;