import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Headset } from 'lucide-react';
import logo from '../../assets/Handdrawn Circle Logo.png';
import { axiosInstance } from '../../config/axiosInstance';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import Lottie from 'lottie-react';
import loginAnimation from '../../assets/bus.json'; 
export default function Header() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [isButtonDisabled, setButtonDisabled] = useState(false); // State for button toggle

  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post('/user/logout', {}, { withCredentials: true });
        window.location.reload()
      if (response.data) {
        console.log(response.data.message);
      
      }

      
      Cookies.remove('token');
      setButtonDisabled(false); // Reset button state after logout
      return response.data; 
    } catch (error) {
      console.error('Logout failed:', error.response?.data?.message || 'An error occurred');
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
        if (error.response.data.message === "User not authenticated") {
          // navigate('/booking/login');
          setButtonDisabled(true); // Disable button on specific error
        }
      } else {
        toast.error("An error occurred while adding to wishlist. Please try again.");
      }
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstance.get('/user/profile', { withCredentials: true });
        const { data } = response.data; // Ensure your response structure is correct
        setProfile(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      } 
    };

    fetchUserProfile();
  }, []);

  return (
    <div>

      <header className="bg-white p-4 shadow-lg h-32">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center h-full">
          <Link to={'/'}>
             <Lottie animationData={loginAnimation} loop={true} className=" w-32 h-32" />
          </Link>
          <div className="flex items-center space-x-6 mt-2 md:mt-0">
            <div className="text-gray-900 flex items-center hover:text-blue-600 transition duration-200 cursor-pointer">
              <Link to="/contact" className="mr-2">Contact Us</Link>
              <Headset />
            </div>

            <div className="relative">
              <div
                tabIndex={0}
                role="button"
                onClick={toggleDropdown}
                className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-blue-600 cursor-pointer hover:shadow-lg transition duration-300"
              >
                <img
                  src={ profile?.image ||"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s"}
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
                    <Link to="/profile" className="hover:bg-gray-200 px-4 py-2 block rounded-lg">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/my-ticket" className="hover:bg-gray-200 px-4 py-2 block rounded-lg">
                      Manage Bookings
                    </Link>
                  </li>
                
                </ul>
              )}
            </div>

            <div>
              {profile ? (
                <button onClick={handleLogout} className={`btn btn-outline btn-error ${isButtonDisabled ? 'disabled' : ''}`} disabled={isButtonDisabled}>
                  Logout
                </button>
              ) : (
                <Link to="/booking/login">
                  <button className='btn btn-outline'>Login</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
