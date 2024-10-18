import React, { useState } from 'react'; 
import { useForm } from 'react-hook-form'; 
import { Container } from 'react-bootstrap';
import { FaExchangeAlt } from 'react-icons/fa'; 
import { CalendarDays } from 'lucide-react';
import { axiosInstance } from '../../config/axiosInstance';
import { useNavigate } from 'react-router-dom';

const locations = [
    { value: 'Manathavady', label: 'Manathavady' },
    { value: 'Bangalore', label: 'Bangalore' },
    // Add more locations as needed
];

export default function SearchForm() {
    const getDefaultDate = () => {
        let date = new Date();
        return date.toISOString().split('T')[0];
    };

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [selectedDate, setSelectedDate] = useState(getDefaultDate());
    const [showCalendar, setShowCalendar] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [bus, setBus] = useState([]);
    const [pickupLocation, setPickupLocation] = useState(''); // State for pickup location
    const [dropoffLocation, setDropoffLocation] = useState(''); // State for drop-off location
    const navigate = useNavigate();

    const toggleCalendar = () => {
        
        setShowCalendar(!showCalendar);
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleExchange = () => {
        const temp = pickupLocation;
        setPickupLocation(dropoffLocation);
        setDropoffLocation(temp);
    };

    const onSubmit = async (data) => {
        setIsLoading(true); 
        try {
            const response = await axiosInstance.get(`/bus/search`, {
                params: {
                    pickupLocation: data.pickupLocation,
                    dropoffLocation: data.dropoffLocation,
                    date: data.date,
                }
            });
            setTimeout(() => {
                navigate('/bus', { state: { bus: response.data } });
            }, 3000);
            setBus(response.data); 
            console.log(response.data); 
        } catch (error) {
            console.error('Error during form submission:', error);
            // Optionally set an error state to display to the user
        } finally {
            setIsLoading(false); 
        }
    };

    return (
        <div>
            <Container>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col md:flex-row justify-center shadow-xl items-center mt-10 sm:mt-16 w-full">
                        <div className="bg-white rounded-3xl flex flex-col md:flex-row items-center shadow-lg p-4 md:p-0 w-full md:w-auto">
                            
                            {/* From Section */}
                            <div className="flex items-center px-4 py-2">
                                <img src="https://img.icons8.com/ios/500w/get-on-bus.png" alt="get in icon" className="text-gray-500 mr-2 w-8" />
                                <div>
                                    <div className="text-gray-500 text-sm">From</div>
                                    <select
                                        className="text-gray-700 font-semibold outline-none bg-white w-40 md:w-56"
                                        {...register("pickupLocation", { required: "Departure location is required" })}
                                        onChange={(e) => setPickupLocation(e.target.value)} // Update state on change
                                    >
                                        <option value="" disabled selected>
                                            Departure
                                        </option>
                                        {locations.map((location) => (
                                            <option key={location.value} value={location.value}>
                                                {location.label}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.pickupLocation && <p className="text-red-500 text-sm">{errors.pickupLocation.message}</p>}
                                </div>
                            </div>

                            {/* Exchange Icon */}
                            <div className="flex items-center px-2 py-2">
                                <button type="button" onClick={handleExchange}>
                                    <FaExchangeAlt className="text-gray-500 text-xl" />
                                </button>
                            </div>

                            {/* To Section */}
                            <div className="flex items-center px-4 py-2">
                                <img src="https://img.icons8.com/ios/500w/get-off-bus.png" alt="get off icon" className="text-gray-500 mr-2 w-8" />
                                <div>
                                    <div className="text-gray-500 text-sm">To</div>
                                    <select
                                        className="text-gray-700 font-semibold outline-none bg-white w-40 md:w-56"
                                        {...register("dropoffLocation", { required: "Arrival location is required" })}
                                        onChange={(e) => setPickupLocation(e.target.value)} // Update state on change
                                    >
                                        <option value="" disabled selected>
                                            Arrival
                                        </option>
                                        {locations.map((location) => (
                                            <option key={location.value} value={location.value}>
                                                {location.label}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.dropoffLocation && <p className="text-red-500 text-sm">{errors.dropoffLocation.message}</p>}
                                </div>
                            </div>

                            {/* Date Section */}
                            <div className="flex items-center px-4 py-2">
                                <CalendarDays onClick={toggleCalendar} className="text-gray-500 mr-2" />
                                <div>
                                    <div className="text-gray-500 text-sm">Date</div>
                                    <input
                                        type="date"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        {...register('date', { required: true })}
                                        className={`form-control w-full p-3 rounded-md border bg-white ${errors.date ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-indigo-500 bg-gray-50 text-gray-800`}
                                        min={getDefaultDate()} // Minimum date to today
                                    />
                                    {errors.date && <span className="text-red-500 text-sm">Date is required.</span>}
                                </div>
                            </div>

                            {/* Search Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`bg-red-600 h-24 hover:bg-red-700 transition-all duration-300 text-white font-semibold  rounded-r-3xl px-8 py-4 mt-4 md:mt-0 md:ml-4 md:py-2 md:px-6 w-full md:w-auto ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                        </svg>
                                        LOADING...
                                    </div>
                                ) : (
                                    'SEARCH BUSES'
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </Container>
        </div>
    );
}
