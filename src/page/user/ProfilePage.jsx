import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { toast } from 'react-toastify';

export default function ProfilePage() {
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState(null); // To handle new image uploads

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstance.get('/user/profile', { withCredentials: true });
        const { data } = response.data;

        // Extract the date components from the birth date
        const birthDate = new Date(data.birth);
        const dobYear = birthDate.getFullYear();
        const dobMonth = birthDate.getMonth() + 1; // Months are zero-based in JavaScript
        const dobDay = birthDate.getDate();

        setFormData({ ...data, dobYear, dobMonth, dobDay });
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]); // Capture the image file when selected
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSubmit = { ...formData };
    const formDataObj = new FormData();
  
    // Ensure otpExpiry is set correctly or removed if null
    if (!formDataToSubmit.otpExpiry || formDataToSubmit.otpExpiry === "null") {
      delete formDataToSubmit.otpExpiry; 
    }
  
    // Append form data
    Object.keys(formDataToSubmit).forEach((key) => {
      formDataObj.append(key, formDataToSubmit[key]);
    });
  
    // Append image if any file is selected
    if (imageFile) {
      formDataObj.append('image', imageFile);
    }
  
    try {
      const response = await axiosInstance.put(`/user/updateUser/${formData._id}`, formDataObj, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response.data);
      // toast.success('Form Submitted');
    } catch (error) {
      console.log(error);
    }
  
    setIsEditing(false);
  };
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  return (
   <div className="bg-gray-100 font-roboto min-h-screen ">
  <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-800">
        {isEditing ? 'Edit Profile' : 'My Profile'}
      </h2>
    </div>

    <form onSubmit={handleSubmit}>
      <div className="flex">
        {/* Profile Image Section */}
        <div className="w-1/3 flex flex-col items-center">
          <img
            src={imageFile ? URL.createObjectURL(imageFile) : formData.image}
            alt="Profile"
            className="rounded-full mb-4 w-24 h-24 object-cover shadow-md"
          />
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            />
          )}
        </div>

        {/* Form Fields Section */}
        <div className="w-2/3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold">First Name</label>
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-white focus:ring focus:ring-green-300"
                disabled={!isEditing}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-white focus:ring focus:ring-green-300"
                disabled={!isEditing}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone || ''}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-white focus:ring focus:ring-green-300"
                disabled={!isEditing}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address || ''}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-white focus:ring focus:ring-green-300"
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-gray-700 font-semibold">Gender</label>
              <select
                name="gender"
                value={formData.gender || ''}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-white focus:ring focus:ring-green-300"
                disabled={!isEditing}
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Date of Birth</label>
              <div className="flex space-x-2">
                <select
                  name="dobMonth"
                  value={formData.dobMonth || ''}
                  onChange={handleChange}
                  className="w-1/3 mt-1 p-2 border border-gray-300 rounded-md bg-white focus:ring focus:ring-green-300"
                  disabled={!isEditing}
                >
                  <option value="">Month</option>
                  {months.map((month, index) => (
                    <option key={index} value={index + 1}>
                      {month}
                    </option>
                  ))}
                </select>

                <select
                  name="dobDay"
                  value={formData.dobDay || ''}
                  onChange={handleChange}
                  className="w-1/3 mt-1 p-2 border border-gray-300 rounded-md bg-white focus:ring focus:ring-green-300"
                  disabled={!isEditing}
                >
                  <option value="">Day</option>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>

                <select
                  name="dobYear"
                  value={formData.dobYear || ''}
                  onChange={handleChange}
                  className="w-1/3 mt-1 p-2 border border-gray-300 rounded-md bg-white focus:ring focus:ring-green-300"
                  disabled={!isEditing}
                >
                  <option value="">Year</option>
                  {Array.from({ length: 100 }, (_, i) => 2024 - i).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Buttons Section */}
          <div className="flex justify-end mt-6">
            <button
              type="button"
              className="bg-gray-500 text-white px-6 py-2 rounded-full mr-4 transition duration-200 hover:bg-gray-600"
              onClick={toggleEditMode}
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
            {isEditing && (
              <button
                type="submit"
                className="bg-green-500 text-white px-6 py-2 rounded-full transition duration-200 hover:bg-green-600"
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  </div>
</div>

  );
}
