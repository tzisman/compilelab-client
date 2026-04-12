import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { LoginRequest, SignupRequest, AuthResponse} from '../types/user.types.ts';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5035' }), 
  
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
  }),
});


export const { useLoginMutation, useSignupMutation } = apiSlice;