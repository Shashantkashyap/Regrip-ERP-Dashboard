import React, { useState, useEffect, useCallback } from "react";
import notification from "../assets/icons/notifications_unread (1).png";
import search from "../assets/icons/search@2x.png";
import axios from "axios";
import Loader from "../components/common/Loader";
import { IoFilter } from "react-icons/io5";
import { PiExportBold } from "react-icons/pi";
import { IoMdAdd } from "react-icons/io";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import InspectionCountDetails from "../components/inspectionComponent/InspectionCountDetails";
import InspectionFilter from "../components/inspectionComponent/InspectionFilter";
import PendingInspectionFilterSidebar from "../components/pendingInspection/PendingInspectionFilter";
import { useSelector } from "react-redux";

const PendingInspectionReport = () => {

  const apiKey = useSelector((state)=> state.user.user.data.api_key)


  const itemsPerPage = 10;  // Set the number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [showPendingFilter, setShowPendingFilter] = useState(false);
  const [filterData, setFilterData] = useState({});
  const [error, setError] = useState(null)
  
  const noData = (value) => value || "--";
  const url = "https://newstaging.regripindia.com/api";

  const handleFilterToggle = () => {
    setShowPendingFilter(!showPendingFilter);
  };

  const fetchPendingInspectionData = useCallback(
    async (filterData = {}) => {
      setLoading(true);
      
      try {
        const formData = new FormData();

        // Append filter data to formData
        Object.keys(filterData).forEach((key) => {
          formData.append(key, filterData[key]);
        });

        // Append page and limit to formData
        formData.append("page", currentPage);
        formData.append("limit", itemsPerPage);  // Set the items per page

        const response = await axios.post(
          `${url}/pending-inspection-report`,
          formData, // Send formData, not an object
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: apiKey,
            },
          }
        );

        const responseData = response.data;

        console.log(responseData);

        // Update data
        setData(responseData.data || []);

        // Update pagination state
        setTotalPages(responseData.pagination.total || 0);  // Set total items
        setTotalItems(responseData.pagination.total);
        
      } catch (error) {
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    },
    [currentPage] // Make sure this updates when currentPage changes
  );

  useEffect(() => {
    fetchPendingInspectionData();
  }, [fetchPendingInspectionData, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSubmit = (data) => {
    
    setFilterData(data);
    handleFilterToggle();
    fetchPendingInspectionData(data);
  };

  return (
    <div className="p-6 bg-[#F7F7F7] rounded-[50px] overflow-x-auto relative">
      <div className="flex justify-between mb-6">
        <p className="font-inter font-semibold text-[30px] leading-[36.31px] text-[#65A143]">
          Pending Inspection
        </p>
        <div className="flex items-center gap-[34px]">
          <div className="flex bg-[#EBEBEB] rounded-[37px] p-[9px_24px] items-center gap-[7px]">
            <img src={search} alt="search icon" className="w-6 h-6 bg-[#EBEBEB] text-[#949494]" />
            <input
              type="text"
              placeholder="Search Vehicle"
              className="outline-none text-sm bg-[#EBEBEB] text-[#949494] font-outfit font-normal text-[19px] leading-[23.94px]"
            />
          </div>
          <span className="p-[3px_4px]">
            <img src={notification} alt="notification icon" className="w-6 h-6" />
          </span>
        </div>
      </div>

      {showPendingFilter && (
          <div className="z-30">
            <PendingInspectionFilterSidebar
              isVisible={showPendingFilter}
              onClose={handleFilterToggle}
              onSubmit={handleSubmit}
            />
          </div>
        )}

      <div className="bg-white rounded-[20px] pt-5 relative" style={{ boxShadow: "2px 2px 15px 0px rgba(0, 0, 0, 0.09)" }}>
        <div className="flex justify-end mb-2">
          <div className="flex gap-4 items-center mr-5 ">
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

        {/* Loader */}
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
                  <td className="text-left p-2">Last insp. date</td>
                  <td className="text-left p-3">Total insp. count</td>
                  <td className="text-left p-3">Total tyres</td>
                  <td className="text-left p-3">Aeging(Days)</td>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan="13" className="text-center p-3">
                      Data not found
                    </td>
                  </tr>
                ) : (
                  data.map((vehicle, index) => (
                    <tr key={index} className="border-b border-[1px] font-normal text-[14px] leading-[21.42px] text-[#333333] border-gray-200">
                      <td className="p-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td
                        className="p-3 text-[#65A948] underline cursor-pointer"
                        
                      >
                        {noData(vehicle.vehicle_no)}
                      </td>

                      <td className="p-3">{(vehicle.last_inspection)}</td>
                      <td className="p-3">{(vehicle.total_inspection_count)}</td>
                      <td className="p-3">{(vehicle.total_tyres)}</td>
                      <td className="p-3">{(vehicle.last_inspection_days)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination controls */}
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
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <option key={page} value={page}>
                    Page {page}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-md text-white ${
                  currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-gray-300 hover:bg-green-600"
                }`}
              >
                <MdKeyboardArrowLeft />
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-md text-white ${
                  currentPage === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-gray-300 hover:bg-green-600"
                }`}
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

export default PendingInspectionReport;
