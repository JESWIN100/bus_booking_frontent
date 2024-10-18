import { useLocation } from "react-router-dom";
import image from "../../assets/WhatsApp Image 2024-10-02 at 15.10.51_536d82e5.jpg"
import qrcode from '../../assets/Untitled 1.png'
import { useEffect, useState } from "react";
import Qrcode from 'qrcode'
export default function MyTicket() {
  const [src, setSrc] = useState('');
  const location = useLocation();
  const passenger = location.state?.passenger;
  console.log("passenger", passenger);






  const generate = () => {
    try {
      const details = `
        PNR: ${passenger.pnr}, 
        Ticket No: 1390172, 
        Pickup: ${passenger.bus.pickupLocation} at ${passenger.bus.departureTime}, ${passenger.bus.date}, 
        Dropoff: ${passenger.bus.dropoffLocation} at ${passenger.bus.arrivalTime}, ${passenger.bus.dropoffDate}, 
        Seats: ${passenger.seats.join(", ")}, 
        Total Price: ₹${passenger.totalPrice}
      `;

      // Generate QR code from details
      Qrcode.toDataURL(details, { width: 150 }, (err, url) => {
        if (err) {
          console.error(err);
        } else {
          setSrc(url); // Set the generated QR code URL
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    generate()
  })
  return (
    <div>
      <div className="bg-gray-100 p-4 text-black">
        <div className="max-w-2xl mx-auto bg-white p-6 shadow-md">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            
            <img
              src={image}
              alt="Swift Logo"
              className="h-14 rounded-full"
            />
          </div>

          {/* Booking Confirmation */}
          <p className="text-lg font-bold">
            Dear BookMe Customer,
          </p>
          <p className="mt-2">
            Thank you for booking on {passenger.bus.departureTime}, {passenger.bus.date}. Your booking is confirmed and includes the trips below:
          </p>

          {/* Onward Journey Info */}
          <div className="bg-green-600 text-white p-2 mt-4">
            <p>Onward Journey PNR: {passenger.pnr}, Ticket No: 1390172</p>
          </div>

          {/* Pickup Information */}
          <div className="mt-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <i className="fas fa-circle text-blue-500"></i>
              </div>
              <div className="ml-2">
                <p className="font-bold">Pickup at {passenger.bus.pickupLocation} on {passenger.bus.departureTime}, {passenger.bus.day}, {passenger.bus.date}</p>
                <p>{passenger.bus.pickupLocation}</p>
                <p className="text-blue-500">
                  <i className="fas fa-phone-alt"></i> Pickup Contact No. 04842372033
                </p>
              </div>
              {/* <button className="ml-auto bg-blue-500 text-white px-2 py-1 rounded">Add to Calendar</button> */}
            </div>

            {/* Dropoff Information */}
            <div className="flex items-start mt-4">
              <div className="flex-shrink-0 mt-1">
                <i className="fas fa-circle text-orange-500"></i>
              </div>
              <div className="ml-2">
                <p className="font-bold">Dropoff at {passenger.bus.dropoffLocation} on est. {passenger.bus.arrivalTime}, day, {passenger.bus.dropoffDate}</p>
                <p>{passenger.bus.dropoffLocation}</p>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className="mt-4 text-center">
            <p className="font-bold">Boarding QR Code</p>
            <img
              src={src ||"https://storage.googleapis.com/a1aa/image/FG1ds9VdutL9DNp8V59YQnqzq0L5SRcIaLpLpKGEHQIvSP5E.jpg"}
              alt="QR Code"
              className="mx-auto mt-2"
              width="150"
              height="150"
            />
          </div>
          {/* Bus Information */}
          <div className="mt-4">
            <p>
              <i className="fas fa-bus"></i> Bus Type: {passenger.bus.typeofBus}
            </p>
            <p>
              <i className="fas fa-ticket-alt"></i> Bus Number: {passenger.bus.busNumber}
            </p>
            <p>
              <i className="fas fa-user"></i> Conductor Name - Syamkumar U S
            </p>
            <p>
              <i className="fas fa-phone-alt"></i> Conductor Contact No. 9747680722
            </p>
            <p>
              <i className="fas fa-phone-alt"></i> BookMe Contact No. 9448071001
            </p>
          </div>

          {/* Passenger Details */}
          <div className="mt-4">
            {/* <h2 className="font-bold">Passenger Details</h2> */}
            <div className="mt-4">
  <h2 className="font-bold">Passenger Details</h2>
  {passenger.seats.map((seat, index) => (
    <div className="flex items-center mt-2" key={index}>
      <div className="w-4 h-4 bg-blue-500 mr-2"></div>
      <p>Seat: {seat}</p>
      {/* <p className="ml-4">{passenger.name}, {passenger.age}, {passenger.gender}</p> */}
    </div>
  ))}
</div>

          </div>

          {/* Price Breakdown */}
          <div className="mt-4">
            <h2 className="font-bold">Onward Trip Price Breakup</h2>
            <div className="flex justify-between mt-2">
              <p>Onward Trip Fare ({passenger.seats.length} Berth)</p>
              <p>₹{passenger.totalPrice}</p>
            </div>
            {/* Additional Price Breakdown can be added here */}
          </div>

          {/* Cancellation Policy */}
          <div className="mt-4">
            <h2 className="font-bold">Cancellation Policy *</h2>
            <p>Trip Starts from: {passenger.bus.pickupLocation} on {passenger.bus.departureTime}, {passenger.bus.day}, {passenger.bus.date}</p>
            <table className="w-full mt-2 border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">Time Before Trip Start</th>
                  <th className="border border-gray-300 p-2">Cancellation Slab</th>
                  <th className="border border-gray-300 p-2">Refund Slab</th>
                </tr>
              </thead>
              <tbody>
                {/* Add more table rows here */}
              </tbody>
            </table>
            <p className="mt-2">* SRT and PG Charge are non-refundable in Passenger Cancellation</p>
          </div>

          {/* Passenger Guidelines */}
          <div className="mt-4">
            <h2 className="font-bold">Guidelines for Passenger</h2>
            <ul className="list-disc list-inside mt-2">
              <li>The seat(s) booked under this e-ticket is/are not transferable.</li>
              <li>This e-ticket is valid only for the seat number and bus service specified herein.</li>
              <li>
                This e-ticket has to be carried by the passenger during the journey along with an ID Card of the passenger whose name appears above.
              </li>
              {/* Add more guidelines here */}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="mt-4">
            <p className="font-bold">Call us for any Enquiries at:</p>
            <p>
              <i className="fas fa-phone-alt"></i> Phone: 9447871021 | <i className="fas fa-envelope"></i> Email: BookMe@Me.in
            </p>
          </div>

          {/* Footer */}
          <div className="mt-4 text-sm text-gray-600">
  <p>
    This email from BookMe, powered by Maventech Labs Platform, is intended for the booking done by: Beesexpress@bghmail.com.
  </p>
  <p>If you are not the intended recipient, please ignore this email.</p>
</div>

        </div>
      </div>
    </div>
  );
}
