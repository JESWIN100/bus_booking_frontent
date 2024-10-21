import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import SearchForm from '../../components/user/SearchForm';
import { CheckCircle, Star } from 'lucide-react';
import qrcode from '../../assets/playstore.png';

export default function HomePage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showCalendar, setShowCalendar] = useState(false);
  const navigate = useNavigate();

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const data = [
    { title: "BEKAL", imgSrc: "https://storage.googleapis.com/a1aa/image/nJjCunyF9VZfc6Ky80fCarXOnM6prkRaU64PTYI5PcOfcuRnA.jpg" },
    { title: "KOCHI", imgSrc: "https://storage.googleapis.com/a1aa/image/OW9odYhN4wYHAF5FlMjpF7pxlwFNDERfmWbYH9rqnE7Qnb0JA.jpg" },
    { title: "ALLEPPEY", imgSrc: "https://storage.googleapis.com/a1aa/image/dUYf3Gx2gQUIU6ltb5GaOxURirP7fCE3Gfq9CRakUMtEduRnA.jpg" },
    { title: "THRISSUR", imgSrc: "https://storage.googleapis.com/a1aa/image/4BFbxipKUnIHIpJtS4ay9XTsSm2fRg0S0eBpD1WMnwAkO3oTA.jpg" },
    { title: "MUNNAR", imgSrc: "https://storage.googleapis.com/a1aa/image/LTyaS9tS03rVD588zD77rUxisKeiCQ4avWGvuj6JA6ULvb0JA.jpg" },
    { title: "KUMARAKOM", imgSrc: "https://storage.googleapis.com/a1aa/image/5Gsni9JeNIxlc64ntfyVG90UWUrqNc0mHynPzGWF5jf74uRnA.jpg" },
    { title: "THEKKADY", imgSrc: "https://storage.googleapis.com/a1aa/image/HmeTqTWkukRiG6e8pCgE8e4fby7RKEs8KjRXOcOyuXXQ0djOB.jpg" },
    { title: "KOVALAM", imgSrc: "https://storage.googleapis.com/a1aa/image/JcPz836GRN6NCFNtvRD23TJxTFAYZi66P2I8fD3q36Awub0JA.jpg" },
    { title: "WAYANAD", imgSrc: "https://storage.googleapis.com/a1aa/image/fFezXSvt7bjIV0PedDF8kbP0HLDYLJSR5GgkoKLsk6a37uRnA.jpg" },
    { title: "VARKALA", imgSrc: "https://storage.googleapis.com/a1aa/image/JDawXdtmzn7QE9zTmTr6ULwb0HUtA0vCD0g4ApctAPTO4N6E.jpg" },
    { title: "ATHIRAPPILLY", imgSrc: "https://s7ap1.scene7.com/is/image/incredibleindia/athirappilly-waterfalls-thrissur-kerala-2-attr-hero?qlt=82&ts=1726672842971" },
    { title: "PEERMEDE", imgSrc: "https://media-cdn.tripadvisor.com/media/photo-s/12/ac/02/94/munnar-is-a-beautiful.jpg" },
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // This adds a smooth scrolling effect
    });
  };
  return (
    <div>
      <section
        className="relative bg-cover bg-center text-white text-center py-14"
        style={{
          backgroundImage: 'url("https://royalcruiser.com/Royal_Cruiser/slider/images/site/online_bus_ticket_booking_royal_cruiser_01.jpg")',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          minHeight: "80vh",
        }}
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold drop-shadow-lg flex items-center justify-center mt-10 sm:mt-32 max-w-4xl mx-auto">
          India's No. 1 Online Bus Ticket Booking Site
        </h1>
        <div className='flex justify-center items-center'>
          <SearchForm />
        </div>
        <p className="text-white mt-8 sm:mt-12 text-sm sm:text-base max-w-4xl mx-auto">
          Plan your journey with ease! Search buses across India and book your tickets with a few simple steps. Comfortable, safe, and hassle-free travel awaits.
        </p>
      </section>

      <section className="max-w-8xl">
        <div className="bg-gray-100 min-h-screen px-6 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h2 className="text-4xl font-extrabold text-gray-800">Top Destinations</h2>
              <p className="mt-4 text-lg text-gray-600">
                Kerala, a state on India's tropical Malabar Coast, has nearly 600km of Arabian Sea shoreline. It's known for its palm-lined beaches and backwaters, a network of canals.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data.map((destination, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                  <img
                    src={destination.imgSrc}
                    alt={`${destination.title} image`}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-orange-600">{destination.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
  <div className="text-center">
    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Exclusive Bus Booking Deals on BookMe</h1>
    <p className="text-base sm:text-lg text-gray-600 mb-8">
      Don't miss out on these incredible offers, book your bus tickets now and travel with convenience and affordability.
      <br />
      Hurry, grab the best bus booking deals before they're gone!
    </p>
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between max-w-4xl mx-auto">
      <div className="flex items-center mb-4 sm:mb-0">
        <img
          alt="redBus logo depicting travel"
          className="mr-4 rounded object-cover"
          height="100"
          src="https://img.freepik.com/premium-photo/travel-by-bus-train-night-weather-conditions-fog-double-exposure-abstract-background-digital-illustration_124507-104208.jpg"
          width="100"
        />
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            Unlock Unbeatable Exclusive Book Deals!
            <span className="text-red-500"> 20% OFF</span>
          </h2>
          <div className="text-gray-600 mt-2 flex flex-wrap">
            <span className="mr-4"><span className="text-red-500">3966</span> Deals</span>
            <span className="mr-4"><span className="text-red-500">1785</span> Bus Operators</span>
            <span><span className="text-red-500">405025</span> Routes</span>
          </div>
        </div>
      </div>
      
      <button
        onClick={scrollToTop}
        className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg transition duration-300 ease-in-out hover:bg-red-600"
      >
        Book Now
      </button>
    </div>
  </div>
</section>

      <section>
        <div className=" flex justify-center items-center min-h-screen bg-gray-100">
          <div
            className="rounded-lg p-6 text-center bg-white shadow-lg"
            style={{ maxWidth: '400px' }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Join Our Community of Travellers
            </h2>
            <p className="text-gray-600 mb-4">
              Connect with like-minded travellers, share experiences, and get tips for your next journey.
            </p>
            <button
              className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg transition duration-300 hover:bg-green-600"
              onClick={toggleCalendar}
            >
              {showCalendar ? 'Hide Calendar' : 'Show Calendar'}
            </button>
            {showCalendar && (
              <div className="mt-4">
                <p className="text-gray-600">Calendar feature coming soon!</p>
              </div>
            )}
          </div>
        </div>
      </section>



 {/* Footer Section */}
 <footer className="bg-white text-gray-900 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between px-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">About Us</h3>
            <p className="text-gray-900">
              We are dedicated to providing the best travel experiences across Kerala.
            </p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul>
              <li><a href="/about" className="text-gray-900 hover:underline">About Us</a></li>
              <li><a href="/contact" className="text-gray-900 hover:underline">Contact</a></li>
              <li><a href="/privacy" className="text-gray-900 hover:underline">Privacy Policy</a></li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-900 hover:text-white"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-gray-900 hover:text-white"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-gray-900 hover:text-white"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className="text-gray-900 text-sm">&copy; 2024 Your Company. All Rights Reserved.</p>
        </div>
      </footer>


    </div>
  );
}
