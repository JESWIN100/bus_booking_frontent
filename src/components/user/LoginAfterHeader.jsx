import React from 'react'
import  { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Headset } from 'lucide-react';
import Lottie from 'lottie-react';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import loginAnimation from '../../assets/bus.json';
import { axiosInstance } from '../../config/axiosInstance';
export default function LoginAfterHeader() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [profile, setProfile] = useState(null); // Holds user data
  const [isButtonDisabled, setButtonDisabled] = useState(false); // Disable button on logout click

  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setDropdownOpen(false);

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post('/user/logout', {}, { withCredentials: true });

      if (response.data) {
        console.log('Logout successful:', response.data.message);
        Cookies.remove('token');
        setProfile(null); 
        setButtonDisabled(false); 
       navigate('/')
      }
    } catch (error) {
      console.error('Logout error:', error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred during logout.");
      }
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstance.get('/user/profile', { withCredentials: true });
        const { data } = response.data;
        setProfile(data); // Set the profile data if available
      } catch (error) {
        console.log('Error fetching profile:', error);
      }
    };
    fetchUserProfile(); // Fetch user profile on component mount
  }, []);

  return (
    <header className="bg-white p-4 shadow-lg h-auto md:h-32">
    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center h-full">
      <Link to={'/'}>
        <Lottie animationData={loginAnimation} loop={true} className="w-24 h-24 md:w-32 md:h-32" />
      </Link>

      <div className="flex items-center space-x-4 md:space-x-6 mt-4 md:mt-0">
        <div className="text-gray-900 flex items-center hover:text-blue-600 transition duration-200 cursor-pointer hidden md:flex">
          <Link to="/contact" className="mr-2 text-sm md:text-base">Contact Us</Link>
          <Headset className="h-5 w-5 md:h-6 md:w-6" />
        </div>

        <div className="relative">
          <div
            tabIndex={0}
            role="button"
            onClick={toggleDropdown}
            className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-blue-600 cursor-pointer hover:shadow-lg transition duration-300"
          >
            <img
              src={profile?.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s"}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>

          {isDropdownOpen && (
            <ul
              className="dropdown-content menu absolute right-0 mt-2 bg-white text-black rounded-lg w-52 p-2 shadow-lg z-50"
              onBlur={closeDropdown}
            >
              <li>
                <Link to="/profile" className="hover:bg-gray-200 px-4 py-2 block rounded-lg text-sm md:text-base">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/my-ticket" className="hover:bg-gray-200 px-4 py-2 block rounded-lg text-sm md:text-base">
                  Manage Bookings
                </Link>
              </li>
            </ul>
          )}
        </div>

        <div>
          {/* {profile ? ( */}
            <button
              onClick={handleLogout}
              className={`btn btn-outline btn-error ${isButtonDisabled ? 'disabled' : ''}`}
              disabled={isButtonDisabled}
            >
              Logout
            </button>
          {/* ) : ( */}
            {/* <Link to="/booking/login">
              <button className="btn btn-outline">Login</button>
            </Link> */}
          {/* )} */}
        </div>
      </div>
    </div>
  </header>
  )
}
