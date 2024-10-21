import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Headset } from 'lucide-react';
import Lottie from 'lottie-react';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import loginAnimation from '../../assets/bus.json';
import { axiosInstance } from '../../config/axiosInstance';

export default function Header() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [profile, setProfile] = useState(null); // Holds user data

  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setDropdownOpen(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstance.get('/user/profile', { withCredentials: true });
        const { data } = response.data;
        setProfile(data);
      } catch (error) {
        console.log('Error fetching profile:', error);
      }
    };
    fetchUserProfile();
  }, []);

  return (
    <header className="bg-white p-4 shadow-md h-auto md:h-32">
      <div className="container mx-auto flex flex-row md:flex-row justify-between items-center h-full">
        <Link>
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
              onBlur={closeDropdown}
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
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
                {/* <li>
                  <Link to="/profile" className="hover:bg-gray-200 px-4 py-2 block rounded-lg text-sm md:text-base">
                    Profile
                  </Link>
                </li> */}
                <li>
                  <Link to="/my-ticket" className="hover:bg-gray-200 px-4 py-2 block rounded-lg text-sm md:text-base">
                    Manage Bookings
                  </Link>
                </li>
                <li className="block md:hidden">
  <Link to="/booking/sign-up" className="hover:bg-gray-200 px-4 py-2 block rounded-lg text-sm md:text-base">
    Create
  </Link>
</li>
<li className="block md:hidden">
  <Link to="/booking/login" className="hover:bg-gray-200 px-4 py-2 block rounded-lg text-sm md:text-base">
    Login
  </Link>
</li>

              </ul>
            )}
          </div>

          <div className="hidden md:flex space-x-2 md:space-x-4">
  <Link to="/booking/sign-up">
    <button className="btn btn-outline hover:text-white transition duration-300">Create</button>
  </Link>
  <Link to="/booking/login">
    <button className="btn btn-active btn-primary hover:text-white transition duration-300">Login</button>
  </Link>
</div>

        </div>
      </div>
    </header>
  );
}
