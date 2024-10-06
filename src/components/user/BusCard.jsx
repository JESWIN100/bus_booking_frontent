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
    // You can add additional logic here, e.g., notifying the user of their selection.
    console.log('Selected seats:', Array.from(seats));
  };



  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
      <div className="p-6 border-b">
        <div className="flex justify-between items-start">
          {/* Bus Details Section */}
          <div>
            <h2 className="text-xl font-bold text-gray-800">{bus.busName} - {bus._id}</h2>
            <p className="text-gray-500">{bus.typeofBus}</p>
            <div className="flex items-center mt-2 space-x-2">
              <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-lg">{bus.rating || 3.2} ★</span>
              <span className="text-sm text-gray-500">{bus.seatsAvailable} Seats Left</span>
              <span className="text-sm text-gray-500">{bus.windowSeats} Window Seats</span>
            </div>
          </div>
          {/* Price Section */}
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-600">₹ {bus.StartsPrice}</p>
            <button className="bg-blue-50 text-blue-600 mt-3 px-3 py-1 rounded-lg shadow-md hover:bg-blue-100 transition">Live Tracking</button>
          </div>
        </div>

        {/* Amenities Section */}
        <div className="flex justify-between items-center mt-4">
          <div>
            {bus.bus === "kerala" ? (
              <div>
                {/* Render something else or nothing when bus.bus is "kerala" */}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Bus className="text-gray-500" />
                <Wifi className="text-gray-500" />
                <ShowerHead className="text-gray-500" />
                <Smartphone className="text-gray-500" />
                <PlusCircle className="text-gray-500" />
              </div>
            )}
          </div>
        </div>

        {/* Time and Duration Section */}
        <div className="flex justify-between items-center mt-3">
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-800">{bus.departureTime}</p>
            <p className="text-gray-500">{bus.pickupLocation}</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-800">{bus.duration}</p>
            <p className="text-gray-400">Duration</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-800">{bus.arrivalTime}</p>
            <p className="text-red-500">{bus.date}</p>
            <p className="text-gray-500">{bus.dropoffLocation}</p>
          </div>
          <button 
            onClick={toggleModal} 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition">Select Seats</button>
        </div>
      </div>

      {/* Links Section */}
      <div className="p-4 bg-gray-50 flex justify-between items-center">
        <div className="flex space-x-6 text-sm text-gray-600">
          <a href="#" className="hover:text-blue-600 transition">Amenities</a>
          <a href="#" className="hover:text-blue-600 transition">Bus Photos</a>
          <a onClick={togglePoints} className="hover:text-blue-600 transition cursor-pointer">Boarding & Dropping Points</a>
          <a href="#" className="hover:text-blue-600 transition">Reviews</a>
          <a href="#" className="hover:text-blue-600 transition">Booking Policies</a>
        </div>

        {/* Boarding & Dropping Points Section */}
        {showPoints && (
          <div id="points">
            <ul>
              <li>Point 1: Description</li>
              <li>Point 2: Description</li>
              {/* Add more points as needed */}
            </ul>
          </div>
        )}

        <p className="text-sm text-gray-500">{bus.availableSeats} Seats Available</p>
      </div>

      {/* Modal for Seat Selection */}
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
  );
}
