import React, { useState, useEffect, useCallback } from "react";
import notification from "../../assets/icons/notifications_unread (1).png";
import search from "../../assets/icons/search@2x.png";
import axios from "axios";
import Loader from "../../components/common/Loader";
import { IoFilter } from "react-icons/io5";
import { PiExportBold } from "react-icons/pi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import PendingInspectionFilterSidebar from "../../components/pendingInspection/PendingInspectionFilter";
import { useSelector } from "react-redux";

const Rotation = () => {
 // const apiKey = useSelector((state)=> state.user.user.data.api_key)
 const knowUser = JSON.parse(localStorage.getItem("userData"));
  const apiKey = knowUser.data.api_key

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPendingFilter, setShowPendingFilter] = useState(false);
  const [filterData, setFilterData] = useState({});
  const [error, setError] = useState(null);

  const noData = (value) => value || "--";
  const url = "https://newstaging.regripindia.com/api";

  const handleFilterToggle = () => {
    setShowPendingFilter(!showPendingFilter);
  };

  const fetchRotationData = useCallback(
    async (filterData = {}) => {
      setLoading(true);
      try {
        const formData = new FormData();
        Object.keys(filterData).forEach((key) => {
          formData.append(key, filterData[key]);
        });
        formData.append("page", currentPage);
        

        const response = await axios.post(
          `${url}/pendingRotationdata`, 
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: apiKey ,
            },
          }
        );
        console.log(response)
        const responseData = response.data;

        setData(responseData.data || []);
        setTotalItems(responseData.totalItems || 0); // Fetch the total items
        setTotalPages(responseData.totalPages); // Calculate total pages
      } catch (error) {
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    },
    [currentPage]
  );

  useEffect(() => {
    fetchRotationData();
  }, [fetchRotationData, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSubmit = (data) => {
    setFilterData(data);
    handleFilterToggle();
    fetchRotationData(data);
  };

  const formatDate = (isoDate) => {
    // Create a new Date object from the ISO date string
    const date = new Date(isoDate);
  
    // Options for formatting
    const options = { month: 'short', day: 'numeric', year: '2-digit' };
  
    // Use toLocaleDateString to format the date
    return date.toLocaleDateString('en-US', options);
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);


  return (
    <div className="p-6 bg-[#F7F7F7] rounded-[50px] overflow-x-auto relative">
      

      {showPendingFilter && (
        <PendingInspectionFilterSidebar
          isVisible={showPendingFilter}
          onClose={handleFilterToggle}
          onSubmit={handleSubmit}
        />
      )}

      <div className="bg-white rounded-[20px] pt-5 relative" style={{ boxShadow: "2px 2px 15px 0px rgba(0, 0, 0, 0.09)" }}>
        <div className="flex justify-end mb-2">
          <div className="flex gap-4 items-center mr-5">
            <div className="flex items-center gap-1" onClick={handleFilterToggle}>
              <span className="mr-2">
                <IoFilter fontSize={23} className="cursor-pointer" />
              </span>
              <p className="text-[15px] font-medium">Filter</p>
            </div>
            <button className="p-[5px_15px_10px_15px] text-center rounded-[10px] text-[16px] flex gap-1 items-center border-[1px]">
              <span>
                <PiExportBold />
              </span>
              <p>Export</p>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[100%] w-[100%] font-outfit">
              <thead>
                <tr className="bg-[#F5F5F5] text-[#727272] font-normal text-[15px] leading-[21.42px]">
                  <td className="text-left p-3">#</td>
                  <td className="text-left p-3">Vehicle No.</td>
                  <td className="text-left p-2">Last Rotation date</td>
                  <td className="text-left p-2">Last Rotation(km)</td>
                  <td className="text-left p-2">Last Inspection date</td>
                  <td className="text-left p-3">Running since last rotation</td>
                  
                  
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center p-3">
                      Data not found
                    </td>
                  </tr>
                ) : (
                  data.map((vehicle, index) => (
                    <tr key={index} className="border-b border-[1px] font-normal text-[14px] leading-[21.42px] text-[#333333] border-gray-200">
                      <td className="p-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td className="p-3 text-[#65A948] underline cursor-pointer">{noData(vehicle.vehicle_no)}</td>
                      <td className="p-3">{formatDate(vehicle.datetime_created)}</td>
                      <td className="p-3">{vehicle.total_rotation_count}</td>
                      <td className="p-3">{vehicle.wheels_count}</td>
                      <td className="p-3">{vehicle.last_rotation_days}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

<div className="flex justify-between items-center mt-4 px-4 py-2 bg-[#F7F7F7] rounded-b-lg">
          <p className="text-[14px] font-outfit font-normal leading-[22.4px] text-[#4E4F54]">
            Showing {(currentPage - 1) * itemsPerPage + 1}-
            {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} items
          </p>
          <div className="flex items-center gap-4">
            <div>
              <select
                value={currentPage}
                onChange={(e) => handlePageChange(Number(e.target.value))}
                className="px-1 py-1 rounded-md border-[1px] border-gray-300"
              >
                {pageNumbers.map((page) => (
                  <option key={page} value={page}>
                    Page {page}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-3 ">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-gray-300 p-2 rounded-md text-white hover:bg-green-600 cursor-pointer"
              >
                <MdKeyboardArrowLeft />
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="bg-gray-300 p-2 rounded-md text-white hover:bg-green-600 cursor-pointer"
              >
                <MdKeyboardArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rotation;
