import { apiSlice } from '../../api/apiSlice';
import type { LoginRequest, SignupRequest, AuthResponse } from '../../types/user.types';

export const authApi = apiSlice.injectEndpoints({
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

export const { useLoginMutation, useSignupMutation } = authApi;