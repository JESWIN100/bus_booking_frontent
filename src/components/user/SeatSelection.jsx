import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../config/axiosInstance';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShipWheel } from 'lucide-react';

export default function SeatSelection({ onClose, onConfirm, busId, busDetail }) {
  const [selectedSeats, setSelectedSeats] = useState(new Set());
  const [limitReached, setLimitReached] = useState(false);
  const [seatData, setSeatData] = useState([]); // Update this to hold seat info
  const [reservedSeats, setReservedSeats] = useState([]);
  const [pickupStage, setPickupStage] = useState('');
const [dropoffStage, setDropoffStage] = useState('');

  const navigate = useNavigate();
  console.log("busDetail",busDetail);
  
  // Fetch reserved seat numbers
  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await axiosInstance.get(`/seat/getwishlist/${busId}`, { withCredentials: true });
        setSeatData(response?.data?.data);
        console.log("dffffffffffffffff",response);
        
        const fetchedSeatNumbers = response?.data?.data.map(item => item.seatNumbers).flat();
        setReservedSeats(fetchedSeatNumbers);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSeats();
  }, [busId]);

  const handleSeatClick = (seatIndex) => {
    setSelectedSeats((prev) => {
      const updatedSeats = new Set(prev);
      if (updatedSeats.has(seatIndex)) {
        updatedSeats.delete(seatIndex); // Deselect if already selected
        setLimitReached(false); // Allow adding more seats if one is deselected
      } else {
        if (updatedSeats.size < 5 && !reservedSeats.includes(seatIndex)) { // Prevent selecting reserved seats
          updatedSeats.add(seatIndex); // Select if not already selected
        } else {
          setLimitReached(true); // Limit reached
          toast.warning("Maximum 5 seats can be selected!");
        }
      }
      return updatedSeats;
    });
  };

  const handleConfirm = async (userId) => {
    if (!pickupStage || !dropoffStage) {
      toast.error("Please select both pickup and dropoff locations.");
      return;
    }
    try {
      
      const seatArray = Array.from(selectedSeats);
      const response = await axiosInstance.post('/seat/addWhislist', {
        user: userId.userId,
        busId,
        seatNumbers: seatArray,
      }, {
        withCredentials: true,
      });

      toast.success(`Seat Selected: ${seatArray.join(', ')}`);
      onConfirm(seatArray);
       navigate('/booking/bill', { state: { seatData: response.data, busDetail } });
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
        if (error.response.data.message === "User not authenticated") {
          navigate('/booking/login');
        }
      } else {
        toast.error("An error occurred while adding to wishlist. Please try again.");
      }
    }
  };

  const isButtonDisabled = selectedSeats.size === 0;

  return (
    <div>
  <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row space-x-0 md:space-x-8 ">
    <button
      onClick={onClose}
      className="absolute top-1 right-0 text-gray-900"
      aria-label="Close modal"
    >
      <FaTimes />
    </button>
    <div className="flex flex-col items-center  md:mb-0">
    <div className="hidden lg:block mb-4 text-center">
  <p className="bg-blue-100 text-blue-600 px-4 py-2 rounded">
    Click on an Available seat to proceed with your transaction.
  </p>
</div>

      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-full">
          <img className='absolute w-8 rotate-360' src="https://s.alicdn.com/@sc04/kf/Ha321851f480843e8ac831ab17d00b178s.jpg_720x720q50.jpg" alt="Steering Wheel" />
        </div>
        <div className="grid grid-cols-10 gap-2 ml-12">
          {Array.from({ length: 40 }, (_, index) => {
            const seatNumber = index + 1;
            const seatStatus = seatData.find(seat => seat.seatNumbers.includes(seatNumber))?.status;

            return (
              <div className="relative" key={index}>
                <img
                  src="https://static.thenounproject.com/png/661611-200.png"
                  alt="seat-icon"
                  className="absolute"
                />
                <div
                  onClick={() => handleSeatClick(seatNumber)}
                  className={`w-8 h-8 md:w-10 md:h-10 border text-sm border-gray-300 flex items-center justify-center cursor-pointer opacity-85 rounded-md transition duration-200 ease-in-out transform hover:scale-105 ${
                    seatStatus === 'pending'
                      ? 'bg-yellow-500 text-white'
                      : seatStatus === 'confirmed' || reservedSeats.includes(seatNumber)
                      ? 'bg-red-500 text-white'
                      : selectedSeats.has(seatNumber)
                      ? 'bg-green-500 text-white'
                      : 'bg-white text-gray-500'
                  }`}
                  role="button"
                  aria-label={`Seat ${seatNumber} - ${seatStatus || 'available'}`}
                >
                  {seatNumber}
                </div>
                {(seatNumber) % 20 === 0 && <div className="h-16" />}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex mt-4">
        <div className="flex items-center mr-4">
          <div className="h-5 w-5 bg-red-500"></div>
          <span className="ml-2">Booked</span>
        </div>
        <div className="flex items-center">
          <div className="h-5 w-5 bg-green-500"></div>
          <span className="ml-2">Selected</span>
        </div>
        <div className="flex items-center">
          <div className="h-5 w-5 bg-yellow-500"></div>
          <span className="ml-2">Pending</span>
        </div>
      </div>
    </div>

    {/* Right Side: Pickup and Dropoff Selection */}
    <div className="flex flex-col text-black">
      <h2 className="text-lg font-bold">Select Pickup and Dropoff Point</h2>

      {/* Pickup Location */}
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Pickup Location: {busDetail.pickupLocation}</label>
        <select className="w-full border border-gray-300 p-2 rounded bg-white text-black"
          value={dropoffStage}
          onChange={(e) => setDropoffStage(e.target.value)}>
          <option>Select pickupLocation</option>
          {/* Mapping through pickupStages */}
          {busDetail.pickupStages.map((stage, index) => (
            <option key={index} value={stage}>{stage}</option>
          ))}
        </select>
      </div>

      {/* Dropoff Location */}
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Dropoff Location: {busDetail.dropoffLocation}</label>
        <select className="w-full border border-gray-300 p-2 rounded bg-white text-black"
          value={pickupStage}
          onChange={(e) => setPickupStage(e.target.value)} >
          <option>Select dropoffLocation</option>
          {/* Mapping through dropoffStages */}
          {busDetail.dropoffStages.map((stage, index) => (
            <option key={index} value={stage}>{stage}</option>
          ))}
        </select>
      </div>

      {/* Selected Seats */}
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Selected Seats</label>
        <div className="p-2 border border-gray-300 rounded bg-gray-100">
          {selectedSeats.size > 0 ? (
            <ul className="flex list-inside text-black">
              {Array.from(selectedSeats).map((seat, index) => (
                <li key={seat} className="text-sm">
                  {seat}
                  {index < selectedSeats.size - 1 && ', '}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No seats selected</p>
          )}
        </div>
      </div>

      {/* Confirm Button */}
      <button
        onClick={handleConfirm}
        disabled={isButtonDisabled}
        className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition ${
          isButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : ''
        }`}
      >
        Confirm Selection
      </button>
    </div>
  </div>
</div>

    
  );
}
