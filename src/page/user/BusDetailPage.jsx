import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import BusCard from '../../components/user/BusCard'; // For Kerala buses
import OtherBusCard from '../../components/user/OtherBusCard'; // For non-Kerala buses

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
