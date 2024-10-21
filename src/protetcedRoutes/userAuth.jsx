import { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosInstance";
import { Link } from "react-router-dom";

export const UserAuth = ({ children }) => {
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axiosInstance.get('user/check-user', {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error checking user:", error);
        setUser(null); // Ensure user is set to null on error
      }
    };

    checkUser();
  }, []);



  return user ? children :
  <div className="bg-white text-black min-h-screen flex items-center justify-center">
  <div className="text-center">
    <div>User not authenticated</div>
    <h3>Please Login</h3>
    <Link to={'/booking/login'}>
    <button className="mt-4 p-2   rounded">Click here</button>

    </Link>
  </div>
</div>

   ; 
};
