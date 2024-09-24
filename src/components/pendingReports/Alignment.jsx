import React, { useState, useEffect, useCallback } from "react";
import notification from "../../assets/icons/notifications_unread.png";
import search from "../../assets/icons/search@2x.png";
import axios from "axios";
import Loader from "../../components/common/Loader";
import { IoFilter } from "react-icons/io5";
import { PiExportBold } from "react-icons/pi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import PendingInspectionFilterSidebar from "../pendingInspection/PendingInspectionFilter";
// Import date formatting libraries (optional)
import { format } from 'date-fns';  // Use if you want an external library

const Alignment = () => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAlignmentFilter, setShowAlignmentFilter] = useState(false);
  const [filterData, setFilterData] = useState({});
  const [error, setError] = useState(null);

  const noData = (value) => value || "--";
  const url = "https://newstaging.regripindia.com/api";

  const handleFilterToggle = () => {
    setShowAlignmentFilter(!showAlignmentFilter);
  };

  // Utility function for date formatting
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // Custom date formatting (you can adjust this as needed)
    return format(date, 'dd/MM/yyyy HH:mm'); // Example using date-fns (optional)
    // Alternatively, without external library
    // return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  };

  const fetchAlignmentData = useCallback(
    async (filterData = {}) => {
      setLoading(true);
      try {
        const formData = new FormData();
        Object.keys(filterData).forEach((key) => {
          formData.append(key, filterData[key]);
        });
        formData.append("page", currentPage);
        formData.append("limit", itemsPerPage);

        const response = await axios.post(
          `${url}/pendingAlignmentReportData`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "google",
            },
          }
        );

        console.log(response)

        const responseData = response.data;

        setData(responseData.data || []);
        setTotalPages(responseData.pagination.total || 0);
        setTotalItems(responseData.pagination.total);
      } catch (error) {
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    },
    [currentPage]
  );

  useEffect(() => {
    fetchAlignmentData();
  }, [fetchAlignmentData, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSubmit = (data) => {
    setFilterData(data);
    handleFilterToggle();
    fetchAlignmentData(data);
  };

  return (
    <div className="p-6 bg-[#F7F7F7] rounded-[50px] overflow-x-auto relative">
      
      {showAlignmentFilter && (
        <PendingInspectionFilterSidebar
          isVisible={showAlignmentFilter}
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
                  <td className="text-left p-2">Last alignment date</td>
                  <td className="text-left p-3">Total alignment count</td>
                  <td className="text-left p-3">Total tyres</td>
                  <td className="text-left p-3">Aging(Days)</td>
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
                      <td className="p-3">{formatDate(vehicle.datetime_created)}</td> {/* Date formatted */}
                      <td className="p-3">{vehicle.total_alignment_count}</td>
                      <td className="p-3">{vehicle.wheels_count}</td>
                      <td className="p-3">{vehicle.last_alignment_days}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-between p-[11px_18px] border-t-[1px] border-gray-200">
          <p className="font-outfit text-[15px] text-[#333333]">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} entries
          </p>
          <div className="flex gap-3">
            <button
              className="flex items-center justify-center bg-[#E6E6E6] border-2 border-[#E6E6E6] rounded-full p-2"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <MdKeyboardArrowLeft />
            </button>
            <button
              className="flex items-center justify-center bg-[#E6E6E6] border-2 border-[#E6E6E6] rounded-full p-2"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <MdKeyboardArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alignment;
