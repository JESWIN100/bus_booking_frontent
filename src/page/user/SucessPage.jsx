import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import { toast } from 'react-toastify';
import Lottie from 'lottie-react'
import sucess from '../../assets/Animation - 1729145149595.json'
export default function SuccessPage() {
  const navigate = useNavigate();


  const [bookings, setBookings] = useState([]);
  const [lastData, setLastData] = useState([]);
  const [passengerDetails, setPassengerDetails] = useState([]);

  const [error, setError] = useState('');
 

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axiosInstance.get("seat/user/seat-selection", { withCredentials: true });
        setBookings(response.data.bookings); 
  
        // Assuming bookings is an array, get the last booking
        const lastBooking = response.data.bookings[response.data.bookings.length - 1];
        setLastData(lastBooking)
     
  
      } catch (err) {
        setError(err.message);
      }
    };
  
    fetchBookings();
  }, []);
  

 const bookingId= lastData._id;



 const handleConfirmBooking = async () => {
    try {
      const response = await axiosInstance.post(`/seat/confirm/${bookingId}`);
      // toast(response.data.message);
      console.log(response.data.message)
      
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred while confirming the booking.');
      }
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleConfirmBooking();
      // handleSendEmail()
    }, 1000); // Adjust the timeout duration as needed

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, [bookingId]);
console.log("lastData",lastData);

useEffect(() => {
  handleSendEmail();
}, [passengerDetails]); 


useEffect(() => {
  const fetchPassengerDetails = async () => {
    try {
      const response = await axiosInstance.get('passenger/pass', { withCredentials: true });
      const lastPassenger = response.data.data[response.data.data.length - 1];
      setPassengerDetails(lastPassenger);
    } catch (err) {
      console.log(err);
    }
  };
  fetchPassengerDetails();
}, []);

console.log("setPassengerDetails",passengerDetails);















const handleSendEmail = async () => {
  try {
    // Check if passengerDetails exist before proceeding
    // if (!passengerDetails || !passengerDetails.name || !passengerDetails.bus) {
    //   console.error("Passenger details are incomplete.");
    //   return;
    // }

    const response = await axiosInstance.post('nodemailer/create', {
      to: passengerDetails.email,
      subject: "Journey Details with BookMe Bus Services",
      text: `Dear ${passengerDetails.name},

Your bus booking with BookMe has been confirmed!
Below are the details of your journey:

Booking Details:
Pnr Number: ${passengerDetails.pnr}
Bus: ${passengerDetails.bus.busName} (${passengerDetails.bus.typeofBus})
Bus Number: ${passengerDetails.bus.busNumber}
Seat Number: ${passengerDetails.seats}

Journey:
Departure Date & Time: ${passengerDetails.bus.date}, ${passengerDetails.bus.departureTime}
Arrival Date & Time: ${passengerDetails.bus.dropoffDate}, ${passengerDetails.bus.arrivalTime}

Departure Location:
${passengerDetails.bus.pickupLocation}

Payment Details:
Total Cost: ₹${passengerDetails.totalPrice}

Please arrive at the departure point 15 minutes before the scheduled time.

Regards,
BookMe Bus Services`,

      html: `
    <div style="max-width: 64rem; margin: 0 auto; background-color: white; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin-top: 2.5rem;">
    <div style="background-color: #1E3A8A; color: white; padding: 1rem;">
        <div style="padding: 0.5rem; text-align: center;"> 
            <h1 style="font-size: 1.125rem; font-weight: bold;">BookME Ticket Information</h1>
            <p style="text-align: " >${passengerDetails.bus.pickupLocation} - ${passengerDetails.bus.dropoffLocation} on ${passengerDetails.bus.day}, ${passengerDetails.bus.date}</p>
        </div>
    </div>
 
    <div style="background-color: #1E40AF; color: white; padding: 0.5rem; text-align: center">
        <p style="text-align: ">Ticket Number: TTAD${passengerDetails.pnr}0816 | PNR No: ${passengerDetails.pnr}</p>
    </div> 
</div>

        <div style="font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #0056b3; text-align: center;">Your Journey with <strong>BookMe Bus Services</strong> is Confirmed!</h2>
            
            <p style="font-size: 16px; color: #333;">Dear <strong>${passengerDetails.name}</strong>,</p>
            <p style="font-size: 16px; color: #333;">🚌 Your bus booking with <strong>BookMe</strong> has been successfully confirmed. Below are your booking details:</p>

            <h3 style="color: #555; border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 15px;">Booking Details 🎫</h3>
            <ul style="list-style-type: none; padding: 0; font-size: 16px; color: #333;">
              <li><strong>Booking Number:</strong> ${passengerDetails.pnr}</li>
              <li><strong>Bus:</strong> ${passengerDetails.bus.busName} (${passengerDetails.bus.typeofBus})</li>
              <li><strong>Bus Number:</strong> ${passengerDetails.bus.busNumber}</li>
              <li><strong>Seat Number:</strong> ${passengerDetails.seats}</li>
            </ul>

            <h3 style="color: #555; border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 15px;">Journey Details 📅</h3>
            <ul style="list-style-type: none; padding: 0; font-size: 16px; color: #333;">
              <li><strong>Departure Date & Time:</strong> ${passengerDetails.bus.date}, ${passengerDetails.bus.departureTime}</li>
              <li><strong>Arrival Date & Time:</strong> ${passengerDetails.bus.dropoffDate}, ${passengerDetails.bus.arrivalTime}</li>
            </ul>

            <h3 style="color: #555; border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 15px;">Departure Location 🗺</h3>
            <ul style="list-style-type: none; padding: 0; font-size: 16px; color: #333;">
              <li><strong>Location:</strong> ${passengerDetails.bus.pickupLocation}</li>
            </ul>

            <h3 style="color: #555; border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 15px;">Payment Details 💳</h3>
            <p style="font-size: 16px; color: #333;"><strong>Total Cost:</strong> ₹${passengerDetails.totalPrice}</p>
            <p style="font-size: 16px; color: #333;"><strong>Payment Status:</strong> Paid</p>

            <p style="font-size: 16px; color: #333;">Please arrive at the departure point 15 minutes before the scheduled time for a smooth check-in process.</p>
            <p style="font-size: 16px; color: #333;">Safe travels!<br /><strong>BookMe Bus Services</strong></p>
          </div>
        </div>
      </div>
      `,
    });

    toast.success("Email sent successfully! Please check your inbox for your ticket details. Have a great trip with BookMe Bus Services!");

  } catch (error) {
    console.log(error);
    
  }
};


  
 

const handleNavigation = () => {
  navigate('/'); 
};

useEffect(() => {
  const timeoutId = setTimeout(() => {
    handleNavigation();
  }, 5000);
  
  return () => clearTimeout(timeoutId); // Cleanup
}, []); 

  return (
    <div className="bg-white flex flex-col items-center justify-center min-h-screen text-center p-6 relative overflow-hidden">
    <div className="absolute inset-0 bg-opacity-20 backdrop-blur-md"></div>
    
    <div className="flex justify-center mb-4">
      <Lottie 
        loop={true} 
        animationData={sucess} 
        speed={0.5} 
        style={{ width: '300px', height: '300px' }} 
      />
    </div>
    
    <p className='text-pink-600 text-lg font-semibold shadow-md p-2 rounded-md bg-white bg-opacity-80 transition duration-300 ease-in-out transform hover:scale-105'>
      Redirecting the page...
    </p>
    
    <div className="mt-4 text-lg text-gray-700">
      <span className="animate-bounce text-pink-500">Please wait a moment...</span>
    </div>
  </div>
  

  );
}
