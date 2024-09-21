import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import addMonths from 'date-fns/addMonths';
import isFuture from 'date-fns/isFuture';
import isBefore from 'date-fns/isBefore';
import differenceInMonths from 'date-fns/differenceInMonths';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import format from 'date-fns/format';
import addMonthsFn from 'date-fns/addMonths';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import './CustomCalendar.css'; // Import custom styles
import { useSelector } from 'react-redux';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Chart2 = () => {

  const apiKey = useSelector((state)=> state.user.user.data.api_key)

  const [dateRange, setDateRange] = useState({
    startDate: addMonths(new Date(), -2),
    endDate: new Date(),
  });
  const [customDateRange, setCustomDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const [selectedOption, setSelectedOption] = useState('Last 3 Months');
  const [showCalendar, setShowCalendar] = useState(false);
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'New Tyres',
        data: [],
        backgroundColor: '#A84790',
        borderRadius: 5,
        barPercentage: 0.6,
      },
      {
        label: 'Retreaded Tyres',
        data: [],
        backgroundColor: 'rgba(76, 175, 80, 0.5)',
        borderColor: '#47A8A6',
        borderWidth: 1,
        borderDash: [5, 5],
        borderRadius: 5,
        barPercentage: 0.6,
      },
      {
        label: 'Scrapped Tyres',
        data: [],
        backgroundColor: '#6947A8',
        borderRadius: 5,
        barPercentage: 0.6,
      },
    ],
  });

  useEffect(() => {
    fetchChartData();
  }, [dateRange]);

  const generateMonthRange = (start, end) => {
    let current = startOfMonth(start);
    const last = endOfMonth(end);
    const months = [];

    while (current <= last) {
      months.push(format(current, 'yyyy-MM')); // Format for ISO 8601
      current = addMonthsFn(current, 1);
    }

    return months;
  };

  const fetchChartData = async () => {
    try {
      const formData = new FormData();
      formData.append('startDate', dateRange.startDate.toISOString());
      formData.append('endDate', dateRange.endDate.toISOString());
  
      const response = await axios.post(
        'https://newstaging.regripindia.com/api/get-data-by-dates',
        formData,
        {
          headers: {
            Authorization: apiKey,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
  
      const { tyrePurchaseData, tyreScrapData } = response.data;
      
      const allMonths = generateMonthRange(dateRange.startDate, dateRange.endDate);
  
      const newTyresData = allMonths.map(month => {
        const [ year,monthName] = month.split('-');
        const monthIndex = new Date(`${monthName} 1, ${year}`).getMonth() + 1;
      
        const data = tyrePurchaseData.find(data => data.month === monthIndex && data.year === parseInt(year, 10));

        return data ? data.purchase_count : 0;
      });
      
  
      const scrappedTyresData = allMonths.map(month => {
        const [ year,monthName] = month.split('-');
        const monthIndex = new Date(`${monthName} 1, ${year}`).getMonth() + 1; // getMonth() is 0-indexed
        const data = tyreScrapData.find(data => data.month === monthIndex && data.year === parseInt(year, 10));
        return data ? data.scrap_count : 0;
      });
      
      setChartData({
        labels: allMonths,
        datasets: [
          {
            label: 'New Tyres',
            data: newTyresData,
            backgroundColor: '#A84790',
            borderRadius: 5,
            barPercentage: 0.6,
          },
          {
            label: 'Retreaded Tyres',
            data: newTyresData.map(() => 0), // Dummy data for retreaded tyres
            backgroundColor: 'rgba(76, 175, 80, 0.5)',
            borderColor: '#47A8A6',
            borderWidth: 1,
            borderDash: [5, 5],
            borderRadius: 5,
            barPercentage: 0.6,
          },
          {
            label: 'Scrapped Tyres',
            data: scrappedTyresData,
            backgroundColor: '#6947A8',
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

    if (option === 'Last 3 Months') {
      const endDate = new Date();
      const startDate = addMonths(endDate, -2);
      setDateRange({ startDate, endDate });
      setCustomDateRange({ startDate, endDate });
    } else if (option === 'Last 6 Months') {
      const endDate = new Date();
      const startDate = addMonths(endDate, -5);
      setDateRange({ startDate, endDate });
      setCustomDateRange({ startDate, endDate });
    } else if (option === 'Custom Date') {
      setShowCalendar(true);
    }
  };

  const handleStartDateChange = (date) => {
    if (isFuture(date)) {
      setPopupMessage('Start Date cannot be in the future.');
      return;
    }
    setCustomDateRange(prevState => ({ ...prevState, startDate: date }));
    setShowStartCalendar(false);
  };

  const handleEndDateChange = (date) => {
    if (isFuture(date)) {
      setPopupMessage('End Date cannot be in the future.');
      return;
    }
    setCustomDateRange(prevState => ({ ...prevState, endDate: date }));
    setShowEndCalendar(false);
  };

  const handleStartDateClick = () => {
    setShowStartCalendar(true);
    setShowEndCalendar(false);
  };

  const handleEndDateClick = () => {
    setShowStartCalendar(false);
    setShowEndCalendar(true);
  };

  const handleSubmit = () => {
    if (customDateRange.startDate && customDateRange.endDate) {
      const monthDifference = differenceInMonths(customDateRange.endDate, customDateRange.startDate);
      if (monthDifference > 6) {
        setPopupMessage('Date range cannot exceed 6 months.');
      } else {
        setDateRange(customDateRange);
        setShowCalendar(false);
        setPopupMessage('');
      }
    }
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
        borderColor: '#4CAF50',
        borderWidth: 1,
        callbacks: {
          label: function (context) {
            return `Count: ${context.raw}`;
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
          display: false,
          drawBorder: false,
          borderDash: [5, 5],
          color: '#ffffff',
        },
        ticks: {
          padding: 5,
          stepSize: 100,
        },
      },
    },
  };

  return (
    <div className="p-4 bg-white rounded-lg ">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-20">
          <h2 className="text-[18px] font-medium leading-[22.68px] text-[#696969]">Month Wise</h2>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <span className="w-[9.84px] h-[9.84px] rounded-full bg-[#A84790]"></span>
              <span className="text-[11px] font-normal leading-[15.14px]">New Tyres</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-[9.84px] h-[9.84px] rounded-full bg-[#47A8A6]"></span>
              <span className="text-[11px] font-normal leading-[15.14px]">Retreaded Tyres</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-[9.84px] h-[9.84px] rounded-full bg-[#6947A8]"></span>
              <span className="text-[11px] font-normal leading-[15.14px]">Scrapped Tyres</span>
            </div>
          </div>
        </div>
        <div className="relative flex items-center space-x-4">
          <select
            value={selectedOption}
            onChange={handleOptionChange}
            className="text-[12px] font-normal leading-[16.51px] text-[#666666] border rounded p-1 border-2px border-black"
          >
            <option>Last 3 Months</option>
            <option>Last 6 Months</option>
            <option>Custom Date</option>
          </select>
        </div>
      </div>

      {showCalendar && (
  <div className="calendar-wrapper flex flex-row items-center justify-center gap-10">
    <div className="calendar-inputs flex flex-row items-center gap-5">
      <div className="relative flex flex-col gap-1">
        <p className="text-sm text-gray-700 mb-1">Start Date:</p>
        <button
          onClick={handleStartDateClick}
          className="calendar-button py-2 px-4 border border-gray-300 rounded-md text-gray-700 bg-white shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {customDateRange.startDate ? customDateRange.startDate.toDateString() : ' Select Date'}
        </button>
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
      <div className="relative flex flex-col gap-1">
        <p className="text-sm text-gray-700 mb-1">End Date:</p>
        <button
          onClick={handleEndDateClick}
          className="calendar-button py-2 px-4 border border-gray-300 rounded-md text-gray-700 bg-white shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {customDateRange.endDate ? customDateRange.endDate.toDateString() : 'Select Date'}
        </button>
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
    <button
      onClick={handleSubmit}
      className="submit-button py-2 px-4 border border-transparent rounded-md text-white bg-[#47A8A6] hover:bg-[#3a8d8a] focus:outline-none focus:ring-2 focus:ring-[#47A8A6] mt-4"
    >
      Submit
    </button>
    {popupMessage && <p className="text-red-500 mt-2">{popupMessage}</p>}
  </div>
)}
      <div className="h-[330px]">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Chart2;
