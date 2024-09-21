import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useDispatch } from 'react-redux';
import { setUser } from "../redux/Slices/userSlice"
import photo from '../assets/Anna.png';
import photo2 from '../assets/Anna2.png';
import logo from '../assets/logo.png';

function Signin() {
  const url = "https://staging.regripindia.com/api/login";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    mobile: '',
    password: ''
  });

  const isSmallScreen = useMediaQuery({ query: '(max-width: 1000px)' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append('contact', formData.mobile);
    formDataToSend.append('password', formData.password);

    try {
      const response = await axios.post(url, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Dispatch user data to Redux store
      dispatch(setUser(response.data));
      localStorage.setItem("isLoggedIn",true)
      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <img
        src={isSmallScreen ? photo2 : photo}
        alt="Background"
        className="absolute top-0 left-0 w-full h-auto max-lg:h-screen object-cover z-0"
      />
      <div
        className="bg-white absolute top-[50%] max-sm:top-[32%] left-[5%] rounded-[29px] p-8 sm:p-10 md:p-14 lg:p-[58px_72px_67px_72px] flex flex-col gap-6 sm:gap-8 lg:gap-10 z-10 max-w-[400px] sm:max-w-[500px] md:max-w-[600px] transform sm:-translate-y-1/2"
        style={{
          boxShadow: '20px 0px 50px -20px rgba(0, 0, 0, 0.6)', 
        }}
      >
        <div className="flex justify-start">
          <img src={logo} alt="Logo" className="w-[100px] h-[60px] md:w-[126px] md:h-[79px]" />
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-6">
          <div className="flex flex-col gap-1 sm:gap-2 text-center">
            <div className="text-xl sm:text-2xl font-bold">Sign In</div>
            <p className="text-gray-600 text-sm sm:text-base">Enter your credentials to access your content</p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium" htmlFor="mobileNumber">Mobile Number</label>
              <input
                type="text"
                id="mobileNumber"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                className="border border-gray-300 p-3 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-blue-500 font-normal text-sm sm:text-base"
                placeholder="Enter your mobile number"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="border border-gray-300 p-3 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-blue-500 font-normal text-sm sm:text-base"
                placeholder="Enter your password"
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe" className="font-normal text-xs sm:text-sm">Remember me</label>
            </div>
            <div className="font-normal text-xs sm:text-sm text-blue-600 cursor-pointer">
              Forgot Password?
            </div>
          </div>
          <div className="flex justify-center">
            <button type="submit" className="bg-[#65A143] text-white py-2 px-6 rounded-[9px] w-full sm:w-auto h-[48px] md:h-[55px]">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;
