import React, { useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance';
import { useNavigate } from 'react-router-dom';

export default function TicketField() {
    const [passenger, setPassenger] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

  
    const [pnr, setPnr] = useState(""); 
  const navigate=useNavigate()
    const fetchPassengerData = async () => {
      setLoading(true);
      setError(""); 
      try {
        const response = await axiosInstance.get(`/passenger/passengers/${pnr}`,{withCredentials:true});
        setPassenger(response.data.data);
        console.log(response);
        navigate('/ticket-details', { state: { passenger: response.data.data } });
        setLoading(false);
      } catch (err) {
        console.log(err);
  
        setError("Passenger not found or an error occurred");
        setLoading(false);
        
      }
    };
  
  
  
  
  
    const handleInputChange = (e) => {
      setPnr(e.target.value); 
    };
  
    const handleButtonClick = () => {
      if (pnr) {
        fetchPassengerData(); 
      } else {
        setError("Please enter a valid PNR");
      }
    };
  
   


  return (
    <div>
         <div className="bg-gray-100 flex items-center justify-center min-h-screen ">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <div className="border-b-2 border-gray-300 pb-2 mb-4">
          <span className="text-purple-600 font-semibold border border-gray-300 px-2 py-1 rounded-t-md">
            View Booking
          </span>
        </div>
        <p className="text-gray-700 mb-4">
          Enter your reservation code (PNR) - (TicketNo) in the form below.{" "}
          <span className="font-semibold">For eg: 123456-87654</span>
        </p>
        <input
          type="text"
          placeholder="Enter PNR-TicketNo"
          className="w-full p-2 border border-gray-300 bg-white rounded mb-4"
          value={pnr} 
          onChange={handleInputChange} 
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
       
        <button className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        onClick={handleButtonClick}>
          VIEW BOOKING
        </button>

        
      </div>
    </div>
    </div>
  )
}
