import { useForm } from 'react-hook-form';
import { useSignupMutation } from './authApi';
import { useDispatch } from 'react-redux';  
import { setCredentials } from './authSlice';
import { useNavigate, Link } from 'react-router-dom';
import type { SignupRequest } from '../../types/user.types';
import styles from './Auth.module.scss';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';



const Signup = () => {
const { register, handleSubmit, setError, formState: { errors } } = useForm<SignupRequest>();  const [signup, { isLoading }] = useSignupMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
 const onSubmit = async (data: SignupRequest) => {
  try {
    const userData = await signup(data).unwrap();
    dispatch(setCredentials(userData));
    navigate('/');
  } catch (err) {
    const error = err as FetchBaseQueryError;

    if (error.status === 409) {
      setError('email', {
        type: 'manual',
        message: 'This email already exists in the system, try to connect'
      });
    } else {
      console.error('Registration failed:', error);
      alert('An unexpected error occurred, please try again later');
    }
  }
};

  return (
    <div className={styles.authContainer}>
      <h2>Sign Up</h2>
      <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)}>
        
        <div className={styles.formGroup}>
          <label>Username:</label>
          <input 
            {...register('name', { required: "Username is required" })} 
            placeholder="Username" 
          />
          {errors.name && <p className={styles.errorText}>{errors.name.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <label>Email:</label>
          <input 
            {...register('email', { 
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })} 
            type="email" 
            placeholder="Email" 
          />
          {errors.email && <p className={styles.errorText}>{errors.email.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <label>Password:</label>
          <input 
            {...register('password', { 
                required: "Password is required",
                pattern: {
                value: /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,20}$/,
                message: "Password must be 6-20 characters and include both letters and numbers"
            }
            })}
            type="password" 
            placeholder="Password" 
          />
          {errors.password && <p className={styles.errorText}>{errors.password.message}</p>}
        </div>
        
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>
        
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;