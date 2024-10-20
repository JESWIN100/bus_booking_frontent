import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { axiosInstance } from '../../config/axiosInstance';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import loginAnimation from '../../assets/LoginPage.json'; 

export default function UserLoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); 

  const onSubmit = async (data) => {
    setLoading(true); 
    try {
      const response = await axiosInstance.post('/user/login', data, { withCredentials: true });
      console.log('Login successful:', response.data);
      toast.success('Login successful'); 
      navigate("/booking/otp", { state: { email: data.email } });
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center min-h-screen p-5">
      <div className="bg-white rounded-2xl shadow-lg max-w-4xl w-full flex flex-col md:flex-row">
        <div className=" hidden md:block mt-10 flex-1 overflow-hidden">
          <Lottie animationData={loginAnimation} loop={true} className=" ml-8 w-96 h-96" />
        </div>
        <div className="p-10 flex-1 relative">
          <h2 className="text-2xl font-bold text-gray-800 mb-5">Login</h2>
          <p className="text-gray-600 mb-5">
            Today is a new day. It’s your day. You shape it.
          </p>
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="font-medium mb-1 block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Example@email.com"
                className="w-full p-3 border bg-white border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="password" className="font-medium mb-1 block text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="At least 8 characters"
                className="w-full p-3 border border-gray-300 bg-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                {...register('password', { required: 'Password is required' })}
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>
            <button
              type="submit"
              className={`w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Login'} {/* Updated text */}
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{' '}
            <Link to="/booking/sign-up" className="text-blue-500 hover:underline"> {/* Ensure this path is correct */}
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
