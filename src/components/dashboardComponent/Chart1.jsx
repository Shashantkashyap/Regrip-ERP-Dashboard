import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import addMonths from 'date-fns/addMonths';
import isFuture from 'date-fns/isFuture';
import axios from 'axios'; // Import axios
import 'react-calendar/dist/Calendar.css';
import './CustomCalendar.css'; // Import custom styles
import { useSelector } from 'react-redux';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Chart1 = () => {

  //const apiKey = useSelector((state)=> state.user.user.data.api_key)

  const knowUser = JSON.parse(localStorage.getItem("userData"));
  const apiKey = knowUser.data.api_key

  const [dateRange, setDateRange] = useState({ startDate: addMonths(new Date(), -3), endDate: new Date() });
  const [customDateRange, setCustomDateRange] = useState({ startDate: null, endDate: null });
  const [selectedOption, setSelectedOption] = useState('Last 3 Months');
  const [showCalendar, setShowCalendar] = useState(false);
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Tyre Data',
        data: [],
        backgroundColor: '#4CAF50',
        borderRadius: 5,
        barPercentage: 0.6,
      },
    ],
  });

  useEffect(() => {
    fetchChartData();
  }, [dateRange, selectedOption]); // Fetch data whenever dateRange or selectedOption changes

  const fetchChartData = async () => {
    try {
      const formData = new FormData();
      formData.append('startDate', dateRange.startDate.toISOString());
      formData.append('endDate', dateRange.endDate.toISOString());

      const response = await axios.post(
        'https://newstaging.regripindia.com/api/get-brand-wise-data',
        formData,
        {
          headers: {
            Authorization: apiKey,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      const { data } = response.data;
      const labels = data.map(item => item.brand_name);
      const values = data.map(item => item.tyre_count);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Tyre Data',
            data: values,
            backgroundColor: '#4CAF50',
            borderRadius: 5,
            barPercentage: 0.6,
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleOptionChange = (e) => {
    const option = e.target.value;
    setSelectedOption(option);

    let startDate, endDate;
    if (option === 'Last 3 Months') {
      endDate = new Date();
      startDate = addMonths(endDate, -3);
    } else if (option === 'Last 6 Months') {
      endDate = new Date();
      startDate = addMonths(endDate, -6);
    } else if (option === 'Custom Date') {
      setShowCalendar(true);
      return; // Exit early to prevent setting the date range immediately
    }

    setDateRange({ startDate, endDate });
    setCustomDateRange({ startDate: startDate, endDate: endDate });
  };

  const handleStartDateChange = (date) => {
    if (isFuture(date)) {
      setPopupMessage('Start Date cannot be in the future.');
      return;
    }
    setCustomDateRange((prevState) => ({ ...prevState, startDate: date }));
    setDateRange((prevState) => ({ ...prevState, startDate: date })); // Update dateRange
    setShowStartCalendar(false);
    setPopupMessage('');
  };

  const handleEndDateChange = (date) => {
    if (isFuture(date)) {
      setPopupMessage('End Date cannot be in the future.');
      return;
    }
    setCustomDateRange((prevState) => ({ ...prevState, endDate: date }));
    setDateRange((prevState) => ({ ...prevState, endDate: date })); // Update dateRange
    setShowEndCalendar(false);
    setPopupMessage('');
  };

  const handleStartDateClick = () => {
    setShowStartCalendar(true);
    setShowEndCalendar(false);
  };

  const handleEndDateClick = () => {
    setShowStartCalendar(false);
    setShowEndCalendar(true);
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#333',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#65A143',
        borderWidth: 1,
        callbacks: {
          label: function (context) {
            return `Tyres: ${context.raw}`;
          },
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
          borderDash: [5, 5],
          color: '#ffffff',
        },
        ticks: {
          padding: 5,
          stepSize: 200,
        },
      },
    },
  };

  return (
    <div className="relative p-5">
      {/* Title and Controls */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-44 max-lg:space-x-22">
          <h2 className="text-[18px] font-medium leading-[22.68px] text-[#696969]">Brand Wise</h2>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <span className="w-[9.84px] h-[9.84px] rounded-full bg-[#4CAF50]"></span>
              <span className="text-[11px] font-normal leading-[15.14px]">Tyre Data</span>
            </div>
            <div>
              <select
                
                value={selectedOption}
                onChange={handleOptionChange}
                className="text-[12px] font-normal leading-[16.51px] text-[#666666] border rounded p-1 border-2px border-black"
              >
                <option value="Last 3 Months">Last 3 Months</option>
                <option value="Last 6 Months">Last 6 Months</option>
                <option value="Custom Date">Custom Date</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Message */}
      {popupMessage && (
        <div className="popup-message">
          {popupMessage}
        </div>
      )}

{showCalendar && (
  <div className="calendar-wrapper mb-4">
    <div className="calendar-inputs flex flex-row items-center gap-5">
      <div className="calendar-input relative flex flex-col gap-1">
        <label className="block mb-1 text-sm text-gray-700">Start Date:</label>
        <input
          type="text"
          value={customDateRange.startDate ? customDateRange.startDate.toDateString() : 'Select Date'}
          onClick={handleStartDateClick}
          readOnly
          className="py-2 px-4 border border-gray-300 rounded-md text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {showStartCalendar && (
          <div className="calendar-container absolute top-full left-0 mt-2 z-10">
            <Calendar
              onChange={handleStartDateChange}
              value={customDateRange.startDate}
              className="animated-calendar"
            />
          </div>
        )}
      </div>
      <div className="calendar-input relative flex flex-col gap-1">
        <label className="block mb-1 text-sm text-gray-700">End Date:</label>
        <input
          type="text"
          value={customDateRange.endDate ? customDateRange.endDate.toDateString() : 'Select Date'}
          onClick={handleEndDateClick}
          readOnly
          className="py-2 px-4 border border-gray-300 rounded-md text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {showEndCalendar && (
          <div className="calendar-container absolute top-full left-0 mt-2 z-10">
            <Calendar
              onChange={handleEndDateChange}
              value={customDateRange.endDate}
              className="animated-calendar"
            />
          </div>


           
        )}
      </div>
    </div>
  </div>
)}

      <div className="h-[300px] p-1">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Chart1;
