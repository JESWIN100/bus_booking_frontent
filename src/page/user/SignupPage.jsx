import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Lottie from 'lottie-react';
import loginAnimation from '../../assets/signup.json'; // Adjust the path as necessary
import { Link } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is imported
import { toast } from 'react-toastify'; // Import toast for notifications
import { useNavigate } from 'react-router-dom'; // For navigation
import { axiosInstance } from '../../config/axiosInstance';

export default function SignupPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();


  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/user/create', data, { withCredentials: true });
      console.log('Login successful:', response.data);
      toast.success('Login successful');
      navigate("/");
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
        <div className="  hidden md:block mt-10 flex-1 overflow-hidden">
          <Lottie animationData={loginAnimation} loop={true} className="w-96 h-96" />
        </div>
        <div className="p-10 flex-1 relative">
          <h2 className="text-2xl font-bold text-gray-800 mb-5">Sign-Up</h2>
          <p className="text-gray-600 mb-5">
  Embrace new beginnings! Your journey starts here, and every step counts.
</p>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="name" className="font-medium mb-1 block text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your name"
                className="w-full p-3 border bg-white border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>
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
                placeholder="Password"
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
              {loading ? 'Loading...' : isLogin ? 'Log in' : 'Sign up'}
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?
            <Link to={'/booking/login'}>
            <button className="text-blue-500 hover:underline">
               Sign-Up
            </button>
            </Link>
           
          </p>
        </div>
      </div>
    </div>
  );
}
