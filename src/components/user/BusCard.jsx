import React, { useState } from 'react';
import { Bus, Wifi, ShowerHead, Smartphone, PlusCircle } from 'lucide-react';
import SeatSelection from './SeatSelection';

export default function BusCard({ bus }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [showPoints, setShowPoints] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState(new Set());

  const togglePoints = () => {
    setShowPoints((prev) => !prev);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleConfirmSeats = (seats) => {
    setSelectedSeats(seats);
    console.log('Selected seats:', Array.from(seats));
  };
  console.log(selectedSeats,'selectedSeats');
 
  


  return (
    <div 
    className="mx-auto p-6 border border-gray-200 rounded-lg shadow-md bg-white mb-8" 
    style={{ backgroundImage: 'url(https://blog.redbus.id/wp-content/uploads/2021/05/shutterstock_1429891862.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
    
    <div className="flex flex-col items-center md:flex-row justify-between items-start md:items-center">
      {/* Bus Details Section */}
      <div className="mb-4 md:mb-0">
        <h1 className="text-2xl font-bold text-white">{bus.busName}</h1>
        <p className="text-white">{bus.typeofBus}</p>
        <div className="flex items-center mt-2">
          <span className="bg-red-400 text-white text-sm font-semibold px-2 py-1 rounded">
            {bus.rating || 3.2} ★
          </span>
          <span className="ml-2 text-gray-500">{bus.seatsAvailable} Ratings</span>
        </div>
      </div>
  
      {/* Departure Time Section */}
      <div className='flex gap-10 items-center md:flex-row justify-between items-start md:items-center'>
        <div className="text-center mb-4 md:mb-0">
          <p className="text-3xl font-bold text-yellow-300">{bus.departureTime}</p>
          <p className="text-white">{bus.pickupLocation}</p>
        </div>
  
        {/* Duration Section */}
        <div className="text-center mb-4 md:mb-0">
          <p className="text-teal-900 font-bold">{bus.duration}</p>
        </div>
  
        {/* Arrival Time Section */}
        <div className="text-center mb-4 md:mb-0">
          {/* <p className="text-white">{bus.date}</p> */}
          <p className="text-3xl font-bold text-yellow-300">{bus.arrivalTime}</p>
          <p className="text-white">{bus.dropoffLocation}</p>
        </div>
      </div>
  
      {/* Price Section */}
      <div className="text-center mb-4 md:mb-0">
        <p className="text-3xl font-bold text-white">₹ {bus.StartsPrice}</p>
        <p className="text-white">Total {bus.seatsAvailable} seats capacity</p>
      </div>
  
      {/* Seat Selection Button */}
      <div>
        <button 
          onClick={toggleModal} 
          className="bg-red-500 text-white font-bold py-2 px-6 rounded hover:bg-red-600 transition">
          SELECT SEAT
        </button>
      </div>
    </div>
  
    {/* Additional Information Section */}
    <div className="flex flex-col md:flex-row justify-between items-center mt-4">
      <div className="flex items-center text-white mb-2 md:mb-0">
        <i className="fas fa-bus-alt mr-2"></i>
        <span>Live Tracking</span>
      </div>
      <div className="flex space-x-4 text-white mb-2 md:mb-0">
        <div className="tooltip" data-tip={bus.route}>
          <a className="link">Boarding & Dropping Points</a>
        </div>
        <a href="" className="hover:text-blue-600 transition">Amenities, Policies & Bus Details</a>
      </div>
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <SeatSelection 
            onClose={toggleModal} 
            onConfirm={handleConfirmSeats} 
            busId={bus._id}
            busDetail={bus}
          />
        </div>
      )}
    </div>
  </div>
  
  

  );
}
