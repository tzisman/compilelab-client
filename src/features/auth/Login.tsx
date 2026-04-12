import { useForm } from 'react-hook-form';
import { useLoginMutation } from '../../api/apiSlice';
import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';
import { useNavigate } from 'react-router-dom';
import type { LoginRequest } from '../../types/user.types';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';

interface MyApiError {
  message?: string;
}

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const [login, { isLoading }] = useLoginMutation();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginRequest>();

  const onSubmit = async (data: LoginRequest) => {
    try {
      const userData = await login(data).unwrap();
      
      dispatch(setCredentials(userData));
      
      navigate('/');
 } catch (err) {
  const error = err as FetchBaseQueryError;

  const errorMessage = 
    (error.data as MyApiError)?.message || 'התחברות נכשלה';

  alert('שגיאה: ' + errorMessage);
}
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            {...register("email", { required: "Email is required" })} 
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div>
          <label>Password:</label>
          <input 
            type="password" 
            {...register("password", { required: "Password is required" })} 
          />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;