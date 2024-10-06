import React from 'react';
import { useForm } from 'react-hook-form';
import { axiosInstance } from '../../config/axiosInstance';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function UserLoginPage() {

  const { register, handleSubmit, formState: { errors } } = useForm();

const navigate=useNavigate()
  const onSubmit = async (data) => {
    try {
      
      const response = await axiosInstance.post('/user/login', data,{withCredentials:true});
      console.log('Login successful:', response.data);
      toast.success('Login successful');
navigate("/")
    }catch (error) {
  console.error('Login failed:', error);
  toast.error('Login failed. Please try again.');
}

  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
    <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center">Login</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Field */}
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 text-gray-600">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Enter a valid email address'
              }
            })}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>

        {/* Password Field */}
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1 text-gray-600">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="w-full px-3 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              }
            })}
          />
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Login
        </button>
      </form>
    </div>
  </div>
  );
}
