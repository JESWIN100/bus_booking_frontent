import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react'; // Import Lottie
import animationData from '../../assets/otp.json';
const OTPVerification = () => {
    const location = useLocation();
    const { email } = location.state || {}; // Extract email from state
    const navigate = useNavigate();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [countdown, setCountdown] = useState(60); // Countdown state
    const [loading, setLoading] = useState(false); // Loading state for spinner

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prevCountdown => {
                if (prevCountdown === 1) {
                    clearInterval(timer);
                    return 0; 
                }
                return prevCountdown - 1;
            });
        }, 1000); 

        return () => clearInterval(timer); 
    }, []);

    const handleChange = (index, value) => {
        if (value.length <= 1 && /^[0-9]*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Move to the next input field
            if (value && index < otp.length - 1) {
                document.getElementById(`otp-input-${index + 1}`).focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            // Move to the previous input field if current is empty and backspace is pressed
            document.getElementById(`otp-input-${index - 1}`).focus();
        }
    };

    const verifyOTP = async () => {
        const otpString = otp.join('');  // Convert OTP array into string
        setLoading(true);  // Set loading state to true
    
        try {
            const response = await axiosInstance.post('/user/verify-otp', { email, otp: otpString }, {
                withCredentials: true,  // Ensure cookies are sent
            });
    
            if (response.data.success) {
                toast.success("Verified successfully!");
                navigate('/user/home');  
            } else {
                toast.error("Verification failed. Please try again.");
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);  // Show specific error message
            } else {
                toast.error("An error occurred. Please try again later.");  // Show generic error message
            }
        } finally {
            setLoading(false);  // Reset loading state after completion
        }
    };
    

    const resendOTP = () => {
        navigate('/booking/login');
        console.log("OTP Resent");
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
            <div className="flex flex-col md:flex-row bg-white bg-opacity-90 p-8 md:p-12 rounded-lg shadow-lg backdrop-blur-lg border border-gray-300 max-w-4xl w-full">
            <div className="md:w-1/2 flex justify-center items-center hidden md:block mt-10 flex-1 overflow-hidde">
                    <Lottie animationData={animationData} className="w-full h-auto md:max-w-md" />
                </div>
                <div className="md:w-1/2 flex flex-col justify-center">
                    <h1 className="text-gray-800 text-2xl md:text-3xl font-semibold mb-4 md:mb-6">OTP Verification</h1>
                    <p className="text-gray-500 mb-6 md:mb-8 text-center">
                        Enter the OTP you received on <span className="text-indigo-500 font-medium">your email</span>
                    </p>

                    <div className="flex justify-center mb-6 space-x-2">
                        {otp.map((value, index) => (
                            <input
                                key={index}
                                id={`otp-input-${index}`}
                                required
                                value={value}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="w-10 h-10 md:w-12 md:h-12 text-center text-xl md:text-2xl border-2 border-indigo-500 rounded-lg text-gray-800 bg-white focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:outline-none"
                            />
                        ))}
                    </div>

                    <button 
                        onClick={verifyOTP} 
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-2 border-indigo-500 py-2 md:py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? "Verifying..." : "Verify"}
                    </button>

                    {loading && <span className="loading loading-spinner loading-xs mt-3"></span>} 

                    <div className="mt-4 text-center text-gray-500 text-sm">
                        {countdown > 0 ? `OTP expires in ${countdown} seconds` : "OTP expired. Please request a new one."}
                    </div>

                    {countdown === 0 && (
                        <p 
                            onClick={resendOTP} 
                            className="mt-4 text-center text-indigo-500 border-2 border-indigo-500 py-2 px-4 rounded-lg cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                        >
                            Resend OTP
                        </p>
                    )}
                </div>
               
            </div>
        </div>
    );
};

export default OTPVerification;
