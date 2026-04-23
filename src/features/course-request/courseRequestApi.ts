import { apiSlice } from '../../api/apiSlice';
import type { CourseRequest } from '../../types/courseRequest.types';

export const lecturerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPendingRequests: builder.query<CourseRequest[], void>({
      query: () => 'api/User/requests',
      providesTags: ['Requests'],
    }),
    
    handleRequest: builder.mutation<void, { requestId: number; status: 'approved' | 'rejected' }>({
      query: ({ requestId, status }) => ({
        url: `api/UserInCourse/${requestId}`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: ['Requests'], 
    }),
  }),
});

export const { useGetPendingRequestsQuery, useHandleRequestMutation } = lecturerApi;