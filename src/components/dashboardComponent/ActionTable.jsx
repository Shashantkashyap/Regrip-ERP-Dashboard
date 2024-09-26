import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VehicleTable from './VehicleTableComponent'; // Adjust import paths based on your folder structure
import TyreTable from './TyreTableComponent';
import Loader from '../common/Loader';
import { toast } from 'react-hot-toast';

const ActionTable = () => {

  //const apiKey = useSelector((state)=> state.user.user.data.api_key)
  const knowUser = JSON.parse(localStorage.getItem("userData"));
  const apiKey = knowUser.data.api_key


  const url = "https://newstaging.regripindia.com/api";
  const [activeTab, setActiveTab] = useState('Pending Actions');
  const [selectedFilter, setSelectedFilter] = useState('vehicle'); // Default to vehicle
  const [showFilterInput, setShowFilterInput] = useState(false);
  const [filterInput, setFilterInput] = useState('');
  const [inspectionData, setInspectionData] = useState([]);
  const [alignmentData, setAlignmentData] = useState([]);
  const [rotationData, setRotationData] = useState([]);
  const [vehicleDefectData, setVehicleDefectData] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [tyreRemovalData, setTyreRemovalData] = useState([]);
  const [tyreDefectData, setTyreDefectData] = useState([]);
  const [tyreCombine, setTyreCombine] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [sortOrder, setSortOrder] = useState('asc');
  const [dateRangeOption, setDateRangeOption] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);

  const formatDate = (datetime) => {

    
    const date = new Date(datetime);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' });
    const year = String(date.getUTCFullYear()).slice(2);
    return `${day} ${month} ${year}`;
  };

  const calculateTimeDifference = (datetimeCreated) => {
    const createdDate = new Date(datetimeCreated);
    const now = Date.now();
    const differenceInMilliseconds = now - createdDate.getTime();
    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    return differenceInDays;
  };

  const handleFilterTypeChange = (filterType) => {
    if (selectedFilter === filterType) {
      setShowFilterInput(!showFilterInput);
    } else {
      setSelectedFilter(filterType);
      setShowFilterInput(true);
    }
  };

  const handleFilterChange = (event) => {
    setFilterInput(event.target.value);
  };

  const handleDateRangeChange = (event) => {
    const value = event.target.value;
    setDateRangeOption(value);

    const today = new Date();
    let start, end;

    switch (value) {
      case 'Last week':
        start = new Date(today);
        end = new Date(today);
        start.setDate(today.getDate() - 7);
        break;
      case 'Last Month':
        start = new Date(today);
        end = new Date(today);
        start.setMonth(today.getMonth() - 1);
        break;
      case 'Custom Date':
        start = '';
        end = '';
        break;
      default:
        start = '';
        end = '';
        break;
    }

    setStartDate(start ? formatISODate(start) : '');
    setEndDate(end ? formatISODate(end) : '');
  };

  const handleDateChange = (event) => {
    const { name, value } = event.target;
    if (name === 'startDate') {
      setStartDate(value);
    } else {
      setEndDate(value);
    }
  };

  const filterByDateRange = (data) => {
    if (!startDate || !endDate) return data;

    const start = new Date(startDate);
    const end = new Date(endDate);

    return data.filter(item => {
      const itemDate = new Date(item.datetime_created); // Adjust this based on the date key in your data
      return itemDate >= start && itemDate <= end;
    });
  };

  const formatISODate = (date) => {
    return date.toISOString().split('T')[0]; // Format date as 'YYYY-MM-DD'
  };

  const handleSearch = () => {
    const searchTerm = filterInput.toLowerCase();
    const dataToFilter = selectedFilter === 'vehicle' ? combinedData : tyreCombine;

    const filteredData = dataToFilter.filter(item =>
      item.vehicle_no.toLowerCase().includes(searchTerm) ||
      item.action.toLowerCase().includes(searchTerm) ||
      (selectedFilter === 'vehicle'
        ? item.manufacturer_name.toLowerCase().includes(searchTerm) || item.model_name.toLowerCase().includes(searchTerm)
        : item.brand_name.toLowerCase().includes(searchTerm) || item.serial_no.toLowerCase().includes(searchTerm))
    );

    return filterByDateRange(filteredData);
  };

  const fetchVehicleData = async () => {
    setLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append("filter", activeTab === "Pending Actions" ? "pending" : "upcoming");

    try {
      const inspectionResponse = await axios.post(
        `${url}/get-dashboard-vehicle-inspection-pending-data`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': apiKey,
          },
        }
      );
      setInspectionData(inspectionResponse.data.data);

      const alignmentResponse = await axios.post(
        `${url}/get-dashboard-vehicle-alignment-pending-data`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': apiKey,
          },
        }
      );
      setAlignmentData(alignmentResponse.data.data);

      const rotationResponse = await axios.post(
        `${url}/get-dashboard-vehicle-rotation-pending-data`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': apiKey,
          },
        }
      );
      setRotationData(rotationResponse.data.data);

      const vehicleDefectResponse = await axios.post(
        `${url}/get-dashboard-vehicle-defect-pending-data`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': apiKey,
          },
        }
      );
      setVehicleDefectData(vehicleDefectResponse.data.data);
    } catch (error) {
      toast.error("Error fetching vehicle data");
      console.error("Error fetching vehicle data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTyreData = async () => {
    setLoading(true);
    try {
      const removalResponse = await axios.post(
        `${url}/get-dashboard-tyre-removal`,
        {},
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': apiKey,
          },
        }
      );
      setTyreRemovalData(removalResponse.data.data);

      const defectResponse = await axios.post(
        `${url}/get-dashboard-tyre-defect-data`,
        {},
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': apiKey,
          },
        }
      );
      setTyreDefectData(defectResponse.data.data);
    } catch (error) {
      toast.error("Error fetching tyre data");
      console.error("Error fetching tyre data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedFilter === 'vehicle') {
      fetchVehicleData();
    } else if (selectedFilter === 'tyre') {
      fetchTyreData();
    }
  }, [selectedFilter, activeTab]);

  useEffect(() => {
    const combined = [
      ...inspectionData.map(item => ({ ...item, type: 'Inspection' })),
      ...alignmentData.map(item => ({ ...item, type: 'Alignment' })),
      ...rotationData.map(item => ({ ...item, type: 'Rotation' })),
      ...vehicleDefectData.map(item => ({ ...item, type: 'Defect' })),
    ];
    setCombinedData(combined);
  }, [inspectionData, alignmentData, rotationData, vehicleDefectData]);

  useEffect(() => {
    const combined = [
      ...tyreRemovalData.map(item => ({ ...item, type: 'Removal' })),
      ...tyreDefectData.map(item => ({ ...item, type: 'Defect' })),
    ];
    setTyreCombine(combined);
  }, [tyreRemovalData, tyreDefectData]);

  const handleSort = (key) => {
    const dataToSort = selectedFilter === 'vehicle' ? combinedData : tyreCombine;
    const sortedData = [...dataToSort].sort((a, b) => {
      const valueA = a[key];
      const valueB = b[key];
      if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    if (selectedFilter === 'vehicle') {
      setCombinedData(sortedData);
    } else {
      setTyreCombine(sortedData);
    }
  };

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const currentItems = handleSearch().slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="min-w-[900px] max-h-[500px] mx-auto bg-white font-outfit p-5 rounded-2xl">
      {loading && <Loader />} {/* Show loader while data is being fetched */}

      <div className="flex justify-between items-center mb-7">
        <div className="flex lg:gap-[28px] gap-[18px] mb-0 px-5 max-lg:px-2 font-semibold text-[16px] max-lg:text-[15px] leading-[20.16px] text-[#5B5B5B]">
          <p
            onClick={() => setActiveTab('Pending Actions')}
            className={`cursor-pointer ${activeTab === 'Pending Actions' ? 'text-green-600 underline' : ''}`}
          >
            Pending Actions
          </p>
          <p
            onClick={() => setActiveTab('Completed Actions')}
            className={`cursor-pointer ${activeTab === 'Completed Actions' ? 'text-green-600 underline' : ''}`}
          >
            Completed Actions
          </p>
          {/* <p
            onClick={() => setActiveTab('Summary')}
            className={`cursor-pointer ${activeTab === 'Summary' ? 'text-green-600 underline' : ''}`}
          >
            Summary
          </p> */}
        </div>

        <div className="flex gap-5 max-lg:text-[15px] max-lg:gap-2 items-center">
          <div>
            <select name="dateRange" value={dateRangeOption} onChange={handleDateRangeChange}>
              <option value="">Select Date Range</option>
              <option value="Last week">Last week</option>
              <option value="Last Month">Last Month</option>
              <option value="Custom Date">Custom Date</option>
            </select>
          </div>
          <div className="flex gap-2 ">
            <input
              type="radio"
              name="filter"
              id="vehicle"
              value="vehicle"
              checked={selectedFilter === 'vehicle'}
              onChange={() => setSelectedFilter('vehicle')}
            />
            <label htmlFor="vehicle">Vehicle</label>
          </div>

          <div className="flex gap-2">
            <input
              type="radio"
              name="filter"
              id="tyre"
              value="tyre"
              checked={selectedFilter === 'tyre'}
              onChange={() => setSelectedFilter('tyre')}
            />
            <label htmlFor="tyre">Tyre</label>
          </div>
        </div>
      </div>

      {selectedFilter === 'vehicle' && activeTab !== 'Summary' && (
        <>
          <div className="flex mb-4 gap-6 max-lg:text-[15px] max-lg:gap-2 mt-2 justify-end">
            <input
              type="text"
              value={filterInput}
              onChange={handleFilterChange}
              placeholder="Search vehicle..."
              className=" px-2 rounded bg-gray-100 "
            />

            {dateRangeOption === 'Custom Date' && (
              <div className="flex gap-4 max-lg:text-[14px] max-lg:gap-2">
                <div className='flex gap-3 items-center'>
                  <p >Start Date :</p>
                  <input
                    type="date"
                    name="startDate"
                    value={startDate}
                    onChange={handleDateChange}
                    className="border px-2 rounded"
                  />
                </div>
                <div className='flex gap-2 items-center'>
                  <p>End Date :</p>
                  <input
                    type="date"
                    name="endDate"
                    value={endDate}
                    onChange={handleDateChange}
                    className="border px-2 rounded"
                  />
                </div>
              </div>
            )}
          </div>
          <VehicleTable
            currentItems={currentItems}
            formatDate={formatDate}
            calculateTimeDifference={calculateTimeDifference}
            handleFilterTypeChange={handleFilterTypeChange}
            handleSort={handleSort}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={handleSearch().length}
            handlePageChange={handlePageChange}
          />
        </>
      )}

      {selectedFilter === 'tyre' && activeTab !== 'Summary' && (
        <div>
          <div className="flex mb-4 gap-6 mt-2 justify-end">
            <input
              type="text"
              value={filterInput}
              onChange={handleFilterChange}
              placeholder="Search..."
              className=" px-2 rounded bg-gray-100 "
            />

            {dateRangeOption === 'Custom Date' && (
              <div className="flex gap-4">
                <div className='flex gap-3 items-center'>
                  <p>Start Date :</p>
                  <input
                    type="date"
                    name="startDate"
                    value={startDate}
                    onChange={handleDateChange}
                    className="border px-2 rounded"
                  />
                </div>
                <div className='flex gap-2 items-center'>
                  <p>End Date :</p>
                  <input
                    type="date"
                    name="endDate"
                    value={endDate}
                    onChange={handleDateChange}
                    className="border px-2 rounded"
                  />
                </div>
              </div>
            )}
          </div>
          <TyreTable
            currentItems={currentItems}
            formatDate={formatDate}
            calculateTimeDifference={calculateTimeDifference}
            handleFilterChange={handleFilterChange}
            handleSort={handleSort}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={handleSearch().length}
            handlePageChange={handlePageChange}
          />
        </div>
      )}

      {activeTab === 'Summary' && (
        <div className='px-4'>
          <p>Summary content here...</p>
        </div>
      )}
    </div>
  );
};

export default ActionTable;
