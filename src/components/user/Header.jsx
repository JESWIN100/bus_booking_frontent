import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <header className="bg-white p-4 shadow-lg h-32">
        <div className="container mx-auto flex justify-between items-center mt-5">
          {/* Left side - Bus Booking */}
          <h1 className="text-2xl font-bold text-black">Bus Booking</h1>

          {/* Right side - Contact Us and My Account */}
          <div className="flex items-center space-x-6">
            {/* Contact Us */}
            <div className=" text-gray-900 px-4 py-2 rounded-lg  cursor-pointer">
              <p>Contact Us</p>
            </div>

            {/* My Account Dropdown */}
            <div className="relative">
              <div
                tabIndex={0}
                role="button"
                onClick={toggleDropdown}
                className="bg-white px-4 py-2 text-black rounded-lg hover:bg-gray-200 cursor-pointer"
              >
                My Account
              </div>

              {isDropdownOpen && (
                <ul
                  className="dropdown-content menu absolute right-0 mt-2 bg-white text-black rounded-lg w-52 p-2 shadow z-[1]"
                >
                  <li>
                    <a href="#" className="hover:bg-gray-200 px-4 py-2 block rounded-lg">
                      Profile
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:bg-gray-200 px-4 py-2 block rounded-lg">
                      Show My Ticket
                    </a>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
