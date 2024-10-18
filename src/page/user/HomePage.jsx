import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { FaBus, FaExchangeAlt } from 'react-icons/fa';
import { CalendarDays } from 'lucide-react';
// import { axiosInstance } from '../../config/axiosInstance';
// import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import SearchForm from '../../components/user/SearchForm';

export default function HomePage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [selectedDate, setSelectedDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [buses, setBuses] = useState([]);
  const [locations] = useState(['New York', 'Los Angeles', 'Chicago', 'Houston']); // Predefined locations
  const [isCustomFrom, setIsCustomFrom] = useState(false);
  const [isCustomTo, setIsCustomTo] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    setIsLoading(false);
  };


  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

 
  const swapButton = () => {
    const input1 = document.getElementById("input1");
    const input2 = document.getElementById("input2");

    // Swap the values
    const temp = input1.value;
    input1.value = input2.value;
    input2.value = temp;
  };

  // const onSubmit = async (data) => {
  //   try {
  //     const response = await axiosInstance.get('/bus/search', {
  //       params: {
  //         pickupLocation: data.from,
  //         dropoffLocation: data.to,
  //         date: data.date,
  //       },
  //     });
  //     setBuses(response.data);
  //     setTimeout(() => {
  //       navigate("/bus/buses", { state: { buses: response.data } });
  //     }, 2000);
  //   } catch (error) {
  //     toast.error(error.response.data.message);
  //     console.log(error);
  //   } finally {
  //     setIsLoading(true);
  //   }
  // };

  return (
    <div>
    <section
      className="relative bg-cover bg-center text-white text-center py-14"
      style={{
        backgroundImage:
          'url("https://royalcruiser.com/Royal_Cruiser/slider/images/site/online_bus_ticket_booking_royal_cruiser_01.jpg")', // Replace with your image URL
        backgroundBlendMode: 'overlay',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        minHeight: "80vh",
      }}
    >
      <h1 className="text-4xl sm:text-5xl font-extrabold drop-shadow-lg flex items-center justify-center mt-10 sm:mt-32 max-w-4xl mx-auto">
        India's No. 1 Online Bus Ticket Booking Site
      </h1>
<div className='flex justify-center items-center'>
<SearchForm/>
</div>
    

      <p className="text-white mt-8 sm:mt-12 text-sm sm:text-base max-w-4xl mx-auto">
        Plan your journey with ease! Search buses across India and book your tickets with a few simple steps. Comfortable, safe, and hassle-free travel awaits.
      </p>
    </section>
  </div>
  );
}
