import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import { toast } from 'react-toastify';
import { Timer } from 'lucide-react';

export default function BillingSection() {
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [remainingTime, setRemainingTime] = useState(300); // 5 minutes in seconds
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const location = useLocation();
  const { seatData, busDetail } = location.state || {};

  // Check if data exists
  if (!seatData || !busDetail) {
    return <p>No data available</p>;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const baseFare = busDetail.StartsPrice*seatData.booking.seatNumbers.length;
  const onwardTripSRTValue = 10; 
  const pgCharges = 6; 

  const totalPrice = (busDetail.StartsPrice * seatData.booking.seatNumbers.length) + onwardTripSRTValue + pgCharges;
  console.log(totalPrice);


  const finalPrice = totalPrice - discount;

  const applyCoupon = () => {
    if (couponCode === 'SAVED10') {
      setDiscount(10);
    } else if (couponCode === 'TRAVELLED99') {
      setDiscount(50);
    } else {
      toast.error('Invalid coupon code');
      setDiscount(0);
    }
  };
  const onSubmit = async(data) => {
    try {
      // Send the data to your API
      const response = await axiosInstance.post('/passenger/add', {
        ...data,
        seats: seatData.booking.seatNumbers, 
        totalPrice,
        bus:busDetail._id
      }, { withCredentials: true });
      console.log(response.data);
      toast.success("added scuessfully!!")
    } catch (error) {
      console.error('Error submitting form', error);
      toast.error(error.response.data.message)
      
    }
  };

 
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsButtonDisabled(true); 
          toast.warning("Time runnout!")
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000); 

    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className=" mx-auto bg-white shadow-md mt-10 ">
        <div className="bg-red-900 text-white p-4 h-20 flex justify-between">
          <h1 className="text-xl font-bold mt-2">Complete your booking</h1>
          <div className="flex items-center">
        <Timer />
        <p className="text-lg  ml-2">
          {`${Math.floor(remainingTime / 60)}:${remainingTime % 60 < 10 ? '0' : ''}${remainingTime % 60}`}
        </p>
      </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {/* Booking Info */}
          <h2 className="text-lg font-bold text-gray-900 ">{busDetail.busName}</h2>
          <p className="text-sm text-black">{busDetail.typeofBus}</p>
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 mt-4">
            <div className="flex-1 mb-2 md:mb-0">
              <div className="mt-2">
                <p className="text-lg font-bold text-black">
                  {busDetail.departureTime} <span className="text-sm text-black">{busDetail.date}, {busDetail.day}</span>
                </p>
                <p className="text-sm text-black">{busDetail.pickupLocation}</p>
              </div>
            </div>
            <div className="text-center flex-1 mb-2 md:mb-0">
              <p className="text-sm text-black">{busDetail.duration}</p>
            </div>
            <div className="flex-1 mb-2 md:mb-0">
              <p className="text-lg font-bold text-black">
                {busDetail.arrivalTime} <span className="text-sm text-black">{busDetail.dropoffDate}</span>
              </p>
              <p className="text-sm text-black">Ernakulam</p>
            </div>
          </div>

          {/* Seat Info */}
          <div className="flex justify-between items-center mb-4">
          <div className="flex flex-wrap mb-4">
  <div className="font-bold text-black mr-2 mt-1">Seat No:</div>
  {seatData.booking.seatNumbers.map((seat, index) => (
    <span 
      key={index}
      className="bg-red-500 text-white rounded-full px-3 py-1 mr-2 mb-2 w-10  shadow-lg"
    >
      {seat}
    </span>
  ))}
</div>

          </div>

          {/* Traveller Details */}
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-2/3 pr-0 md:pr-4 mb-4">
              <div className="bg-gray-100 p-4 rounded mb-4">
                <h3 className="font-bold mb-2 text-black">Traveller Details</h3>
                <div className="flex flex-col md:flex-row items-center mb-2">
                  {/* <p className="text-sm text-black">Seat 8</p> */}
                </div>
                <div className="flex flex-col md:flex-row items-center mb-2">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="border p-2 rounded text-black bg-white w-full mr-2 mb-2 md:mb-0 md:mr-2"
                    {...register("name")}
                  />
                  <input
                    type="text"
                    placeholder="age"
                    className="border p-2 rounded text-black bg-white w-1/4 mr-2"
                    {...register("age")}
                  />
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      className="mr-1"
                      {...register("gender")}
                    />
                    <label htmlFor="male" className="mr-4">Male</label>
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      className="mr-1"
                      {...register("gender")}
                    />
                    <label htmlFor="female">Female</label>
                  </div>
                </div>
              </div>

              {/* Contact Details */}
              <div className="bg-gray-100 p-4 rounded mb-4">
                <h3 className="font-bold mb-2 text-black">Contact Details</h3>
                <p className="text-sm text-black mb-2">We'll send your ticket here</p>
                <div className="flex flex-col md:flex-row items-center mb-2">
                  <input
                    type="email"
                    placeholder="Email Id*"
                    className="border p-2 rounded text-black bg-white w-full mr-2 mb-2 md:mb-0"
                    {...register("email")}
                  />
                  <input
                    type="text"
                    placeholder="Mobile Number*"
                    className="border p-2 rounded text-black bg-white w-full"
                    {...register("phone")}
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="gst"
                    className="mr-2"
                    
                  />
                  <label htmlFor="gst" className="text-sm text-black">
                    Enter GST details (optional)
                  </label>
                </div>
              </div>

              {/* Pincode and State */}
              <div className="bg-gray-100 p-4 rounded mb-4">
                <h3 className="font-bold mb-2 text-black">Your state</h3>
                <p className="text-sm text-black mb-2">
                  (Required for GST purpose on your tax invoice. You can edit this anytime later in your profile section.)
                </p>
                <div className="flex items-center mb-2">
  <label htmlFor="state-select" className="mr-2">
    
  </label>
  <select
    id="state-select"
    className="border p-2 rounded w-full bg-white text-black"
    {...register("residency")}
    defaultValue=""
  >
    <option value="" disabled>
      Select the State
    </option>
    <option value="Kerala">Kerala</option>
    <option value="Tamil Nadu">Tamil Nadu</option>
    <option value="Karnataka">Karnataka</option>
    <option value="Andhra Pradesh">Andhra Pradesh</option>
    <option value="Telangana">Telangana</option>
    {/* Add more states as needed */}
  </select>
</div>

              </div>
            </div>

            {/* Offers and Price Details */}
            <div className="w-full md:w-1/3">
              <div className="bg-gray-100 p-4 rounded mb-4">
                <h3 className="font-bold mb-2 text-black">Offers</h3>
                <div className="bg-white p-2 rounded mb-2">
                  <p className="text-sm font-bold">BUSTRAINPASS</p>
                  <p className="text-sm text-black">
                    Travel Pass - Buy for Rs. 99 and get instant Rs. 50 off and 4 vouchers each worth Rs. 50 off on bus/Rs. 25 off on train bookings
                  </p>
                </div>
                <div className="flex flex-col mb-2">
                  <input
                    type="text"
                    placeholder="Enter Coupon Code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="border p-2 rounded w-full bg-white"
                  />
                  <button 
                  type="button"
                   onClick={applyCoupon} 
                   className="bg-red-900 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition duration-300 mt-2"
                   disabled={isButtonDisabled}
                   >
                    Apply
                  </button>
                </div>
              </div>

              <div className="bg-gray-100 p-4 rounded mb-4">
                <h3 className="font-bold mb-2 text-black">Price details</h3>
                <div className="flex justify-between mb-2">
                  <p className="text-sm text-black">Base Fare</p>
                  <p className="text-sm text-black">₹{baseFare}</p>
                </div>
                <div className="flex justify-between mb-2">
                  <p className="text-sm text-black font-bold">Onward Trip SRT Value </p>
                  <p className="text-sm text-black font-bold">₹{onwardTripSRTValue}</p>
                </div>
                <div className="flex justify-between mb-2">
                  <p className="text-sm text-black font-bold">PG Charges </p>
                  <p className="text-sm text-black font-bold">₹{pgCharges}</p>
                </div>
                <div className="flex justify-between mb-2">
                  <p className='text-sm text-black font-bold'>Discount:</p>
                  <p className='text-sm text-red-600 font-bold'>- ₹ {discount}</p>
                </div>
                <div className="flex justify-between mb-2">
                  <p className="text-sm text-black font-bold">Total</p>
                  <p className="text-sm text-black font-bold">₹ {finalPrice}</p>
                </div>
                



                <p className="text-sm text-black mb-4">
                  Final payable amount will be updated on the next page
                </p>
                <button
                 type="submit" 
                 className="btn btn-outline btn-error text-white w-full py-2 rounded"
                 disabled={isButtonDisabled}
                 >

                  CONTINUE
                </button>
                <p className="text-xs text-black mt-2">
                  By proceeding, I agree to BookMe's{" "}
                  <a href="#" className="text-red-600">User Agreement</a>,{" "}
                  <a href="#" className="text-red-600">Terms of Service</a> and{" "}
                  <a href="#" className="text-red-600">Privacy Policy</a>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
