import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BusCard from '../../components/user/BusCard'; // For Kerala buses
import OtherBusCard from '../../components/user/OtherBusCard'; // For non-Kerala buses
import { MoveLeft } from 'lucide-react';
import { X, ArrowLeftRight, Calendar, ChevronLeft, ChevronRight } from "lucide-react";

export default function BusDetailPage() {
  const location = useLocation();
  const busData = location.state?.bus || []; 
  console.log(busData);

  const [showKeralaBuses, setShowKeralaBuses] = useState(false); // State to toggle Kerala buses visibility

  const toggleKeralaBuses = () => {
    setShowKeralaBuses(!showKeralaBuses); // Toggle the state on button click
  };

  // Calculate the number of Kerala buses
  const keralaBuses = busData.filter(bus => bus.bus.toLowerCase().includes('kerala'));
  const keralaBusCount = keralaBuses.length;

  const lastBusData = busData.length > 0 ? busData[busData.length - 1] : null;
  const lastPrice = lastBusData ? lastBusData.StartsPrice : 'N/A';  // Handle missing price gracefully

  return (
    <>
   <div className="bg-green-300 flex  ">
  {/* Outer container with max-width */}
  <div className="bg-green-300 p-4 rounded-lg w-full max-w-8xl">
    {/* Travelling section */}
    <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4 bg-white p-4 rounded-lg">
      
      {/* Travelling From Input */}
      <div className="flex items-center space-x-2">
        <div>
          <label htmlFor="from" className="text-gray-500 text-sm block">Travelling From</label>
          <input id="from" type="text" value={busData.pickupLocation} className="border rounded-md p-1 w-40 bg-white text-gray-900" />
          <p className="text-black font-semibold">Trivandrum</p>
        </div>
        <button className="text-gray-500">
          <X />
        </button>
      </div>
      
      {/* Switch button */}
      <div className="flex items-center">
        <button className="text-green-700">
          <ArrowLeftRight className="text-xl" />
        </button>
      </div>

      {/* Going To Input */}
      <div className="flex items-center space-x-2">
        <div>
          <label htmlFor="to" className="text-gray-500 text-sm block">Going To</label>
          <input id="to" type="text" className="border rounded-md p-1 w-40  bg-white text-gray-900" />
          <p className="text-black font-semibold">Bangalore</p>
        </div>
        <button className="text-gray-500">
          <X />
        </button>
      </div>

      {/* Journey Date Input */}
      <div className="flex items-center space-x-2">
        <Calendar className="text-gray-500" />
        <label htmlFor="journeyDate" className="text-gray-500 text-sm">Journey Date</label>
        <input id="journeyDate" type="date" className="border rounded-md p-1  bg-white text-gray-900" />
        <p className="text-black font-semibold">Wed Sep 25 2024</p>
        <div className="flex space-x-2">
          <button className="text-gray-500">
            <ChevronLeft />
          </button>
          <button className="text-gray-500">
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* Return Date (Optional) */}
      <div className="flex items-center space-x-2">
        <Calendar className="text-gray-500" />
        <label htmlFor="returnDate" className="text-gray-500 text-sm">Return Date (Optional)</label>
        <input id="returnDate" type="date" className="border rounded-md p-1  bg-white text-gray-900" placeholder="Choose Date" />
        <div className="flex space-x-2">
          <button className="text-gray-500">
            <ChevronLeft />
          </button>
          <button className="text-gray-500">
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* Modify Button */}
      <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition duration-300">
        MODIFY
      </button>
    </div>
  </div>
</div>

    <div className="flex items-center  bg-gray-100">
      <Link to={'/user/home'}>
      <div className="bg-red-600 ml-20 gap-4 text-white text-center flex items-center font-bold py-2 px-4 h-16 rounded-full">
      <MoveLeft />
        Onward Trip: Trivandrum - Bangalore, 21 Oct
      </div>
      </Link>
      
    </div>
    <div className="bg-gray-100 p-4">
  <div className="mx-auto bg-white rounded-lg shadow-md max-w-screen-2xl">
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border-b">
      <div className="flex items-center">
        <img
          alt="KSRTC logo"
          className="w-16 h-16 rounded-full"
          src="https://imgak.mmtcdn.com/bus_cdn/pwa/assets/img/keralartc_logo.png"
        />
        <div className="ml-4">
          <h1 className="text-xl font-bold">KSRTC (കെ.എസ്.ആർ.ടി.സി)</h1>
          <p className="text-gray-600">Kerala State Road Transport Corporation</p>
          <p className="text-gray-600">{keralaBusCount} Buses</p>
        </div>
      </div>
      <div className="text-right mt-4 md:mt-0">
        <p className="text-xl font-bold text-red-600">₹ 327 - ₹{lastPrice}</p>
        <button onClick={toggleKeralaBuses} className="text-red-600">
          {showKeralaBuses ? 'HIDE KERALA BUSES' : 'SHOW KERALA BUSES'}
          <i className={`fas fa-chevron-${showKeralaBuses ? 'up' : 'down'} ml-2`}></i>
        </button>
      </div>
    </div>
    <div className='py-6'></div>
    <div>
      {showKeralaBuses &&
        keralaBuses.map(bus => (
          <BusCard key={bus.id} bus={bus} />
        ))}

      {busData
        .filter(bus => !bus.bus.toLowerCase().includes('kerala'))
        .map(bus => (
          <BusCard key={bus.id} bus={bus} />
        ))}
    </div>
  </div>
</div>

    <div className=' bg-white h-72'>

    </div>
    </>
  );
}
