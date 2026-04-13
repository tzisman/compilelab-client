import { useForm } from 'react-hook-form';
import { useLoginMutation } from '../../api/apiSlice';
import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';
import { useNavigate, Link } from 'react-router-dom'; 
import type { LoginRequest } from '../../types/user.types';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import styles from './Auth.module.scss'; 

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
    (error.data as MyApiError)?.message || 'Login failed';

  alert('Error: ' + errorMessage);
}
  };

 return (
    <div className={styles.authContainer}> 
      <h2>Login</h2>
      <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <label>Email:</label>
          <input 
            type="email" 
            {...register("email", { required: "Email is required" })} 
          />
          {errors.email && <p className={styles.errorText}>{errors.email.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <label>Password:</label>
          <input 
            type="password" 
            {...register("password", { required: "Password is required" })} 
          />
          {errors.password && <p className={styles.errorText}>{errors.password.message}</p>}
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        <p>Don't have an account yet? <Link to="/signup">sign up</Link></p>
      </form>
    </div>
  );
};

export default Login;