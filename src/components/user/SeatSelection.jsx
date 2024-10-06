import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../config/axiosInstance';
import { useNavigate } from 'react-router-dom';

export default function SeatSelection({ onClose, onConfirm, busId,busDetail }) {
  const [selectedSeats, setSelectedSeats] = useState(new Set());
  const [limitReached, setLimitReached] = useState(false);
  const [seat, setSeat] = useState([]);
  const [reservedSeats, setReservedSeats] = useState([]);
  const navigate = useNavigate();
  // Fetch reserved seat numbers
  console.log("trtrtrtrtrtrtrtt",busDetail);
  
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axiosInstance.get(`/seat/getwishlist/${busId}`, { withCredentials: true });
        setSeat(response)
        const fetchedSeatNumbers = response?.data?.data.map(item => item.seatNumbers).flat();
        setReservedSeats(fetchedSeatNumbers); 
        console.log("Reserved Seats", fetchedSeatNumbers);
        
        
      } catch (err) {
        console.log(err);
      }
    };

    fetchWishlist();
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
      // navigate('/booking/bill', { state: { busDetail: response.data } });
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error(error.response.data.message);
    }
  };

  const isButtonDisabled = selectedSeats.size === 0;

  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-lg flex space-x-8 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500"
          aria-label="Close modal"
        >
          <FaTimes />
        </button>
        <div className="flex flex-col items-center">
          <div className="mb-4 text-center">
            <p className="bg-blue-100 text-blue-600 px-4 py-2 rounded">
              Click on an Available seat to proceed with your transaction.
            </p>
          </div>
          <div className="relative">
            <div className="grid grid-cols-10 gap-2 ml-6">
              {Array.from({ length: 40 }, (_, index) => (
                <div className="relative" key={index}>
                  <img
                    src="https://static.thenounproject.com/png/661611-200.png"
                    alt="seat-icon"
                    className="absolute"
                  />
                  <div
                    onClick={() => handleSeatClick(index + 1)}
                    className={`w-10 h-10 border text-sm border-gray-300 flex items-center justify-center cursor-pointer opacity-85 rounded-md ${
                      reservedSeats.includes(index + 1)
                        ? 'bg-red-500 text-white'
                        : selectedSeats.has(index + 1)
                        ? 'bg-green-500 text-white' 
                        : 'bg-white text-gray-500'
                    }`}
                    aria-label={`Seat ${index + 1}`}
                  >
                    {index + 1}
                  </div>
                  {(index + 1) % 20 === 0 && <div className="h-16" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Pickup and Dropoff Selection */}
        <div className="flex flex-col">
          <h2 className="text-lg font-bold">Select Pickup and Dropoff point</h2>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">
              Boarding At Bus Station in Trivandrum
            </label>
            <select className="w-full border border-gray-300 p-2 rounded bg-white text-black">
              <option>Select from</option>
              <option>Boarding At Bus Station in Trivandrum</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">
              Drop At Bus Station in Bangalore
            </label>
            <select className="w-full border border-gray-300 p-2 rounded bg-white text-black">
              <option>Select to</option>
              <option>Drop At Bus Station in Bangalore</option>
            </select>
          </div>
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
