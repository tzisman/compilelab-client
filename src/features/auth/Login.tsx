import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from './authApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';
import { useNavigate, Link } from 'react-router-dom'; 
import type { LoginRequest } from '../../types/user.types';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from 'lucide-react';

interface MyApiError {
  message?: string;
}

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginRequest>();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginRequest) => {
    try {
      const userData = await login(data).unwrap();
      dispatch(setCredentials(userData));
      navigate('/');
    } catch (err) {
      const error = err as FetchBaseQueryError;
      const errorMessage = (error.data as MyApiError)?.message || 'Login failed';
      alert('Error: ' + errorMessage);
    }
  };

  return (
    <div className="w-full h-screen bg-[#334148] flex items-start justify-center p-4 pt-20 sm:pt-24 font-sans select-none overflow-hidden sm:overflow-y-auto">
      <div className="w-full max-w-md bg-white rounded-[1.8rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] p-6 md:p-8 flex flex-col max-h-[80vh] overflow-y-auto">
        
        <div className="flex flex-col items-center mb-5 text-center shrink-0">
          <h2 className="text-2xl font-extrabold text-cyan-500 tracking-wide m-0 uppercase">
            Login
          </h2>
          <p className="text-[11px] text-gray-400 mt-0.5 font-sans">Welcome back! Please enter your details</p>
        </div>

        <form className="flex flex-col gap-3.5 w-full" onSubmit={handleSubmit(onSubmit)}>
          
          <div className="flex flex-col gap-1 text-left">
            <Label className="text-[10px] font-bold text-gray-400 tracking-wide uppercase ml-1">Email Address</Label>
            <Input 
              type="email" 
              placeholder="name@example.com"
              {...register("email", { required: "Email is required" })} 
              className="rounded-xl border-gray-200 focus-visible:ring-cyan-500 text-sm h-10"
            />
            {errors.email && <p className="text-[11px] text-red-500 m-0 ml-1 font-medium">{errors.email.message}</p>}
          </div>

          <div className="flex flex-col gap-1 text-left">
            <Label className="text-[10px] font-bold text-gray-400 tracking-wide uppercase ml-1">Password</Label>
            <div className="relative w-full">
              <Input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••"
                {...register("password", { required: "Password is required" })} 
                className="rounded-xl border-gray-200 focus-visible:ring-cyan-500 text-sm h-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors bg-transparent border-none p-0 cursor-pointer flex items-center justify-center h-5 w-5"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="text-[11px] text-red-500 m-0 ml-1 font-medium">{errors.password.message}</p>}
          </div>

          <Button 
            type="submit" 
            disabled={isLoading}
            className="bg-[#f5b813] hover:bg-[#e0a610] text-[#334148] font-bold text-xs h-10 rounded-xl shadow-sm transition-all border-none mt-2 w-full cursor-pointer uppercase tracking-wider"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>

          <p className="text-[11px] text-center text-gray-400 mt-2 font-sans m-0">
            Don't have an account yet?{' '}
            <Link to="/signup" className="text-cyan-500 hover:text-cyan-600 font-bold underline transition-colors">
              Sign up
            </Link>
          </p>
        </form>

      </div>
    </div>
  );
};

export default Login;