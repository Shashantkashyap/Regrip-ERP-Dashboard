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
import "../components/scrollBar.css";
import { useSelector } from "react-redux";

const InspectionReport = () => {

  const apiKey = useSelector((state)=> state.user.user.data.api_key)

  


  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [vehicleNumberId, setVehicleNumberId] = useState(null);
  const [showInspectionFilter, setShowInspectionFilter] = useState(false);
  const [filterData, setFilterData] = useState({});

  const noData = (value) => value || "--";

  const handleFilterToggle = () => {
    setShowInspectionFilter(!showInspectionFilter);
  };

  const fetchInspectionReportData = useCallback(
    async (filterData = {}) => {
      setLoading(true);
      setError(null);
      try {
        const formData = new FormData();
        
        // Append filter data to formData
        Object.keys(filterData).forEach((key) => {
          formData.append(key, filterData[key]);
        });
  
        // Append page to formData
        formData.append("page", currentPage);
  
        const response = await axios.post(
          "https://newstaging.regripindia.com/api/inspection-report-data",
          formData,  // Send formData, not an object
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: apiKey,  // Assuming you have a valid auth token
            },
          }
        );
        
        const responseData = response.data;
        
        setTotalPages(responseData.totalPages);
        setData(responseData.data || []);
      } catch (error) {
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    },
    [currentPage]  // Make sure this updates when currentPage changes
  );

  useEffect(() => {
    fetchInspectionReportData();
  }, [fetchInspectionReportData, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const closeInspection = () => {
    setVehicleNumberId();
  };

  

  const handleSubmit = (data) => {
    
    setFilterData(data);
    handleFilterToggle();
    fetchInspectionReportData(data);
  };

  

  const setVehicle = (id) => {
    setVehicleNumberId(id);
    console.log("Vehicle ID set:", id);
  };



  
  return (
    <div className="p-6 bg-[#F7F7F7] rounded-[50px] overflow-x-auto relative">
      <div className="flex justify-between mb-6">
        <p className="font-inter font-semibold text-[30px] leading-[36.31px] text-[#65A143]">
          Inspection Report
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

        {showInspectionFilter && (
          <div className="z-30">
            <InspectionFilter
              isVisible={showInspectionFilter}
              onClose={handleFilterToggle}
              onSubmit={handleSubmit}
            />
          </div>
        )}

{vehicleNumberId && (
  <>
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] z-30"></div>
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-40 min-w-[600px] overflow-x-auto">
      <div className="bg-white w-[80%] max-w-[1145px] h-auto rounded-[28px] shadow-lg min-w-[700px] overflow-x-auto">
        <InspectionCountDetails close={closeInspection} vehicleId={vehicleNumberId} />
      </div>
    </div>
  </>
)}

        {/* Loader */}
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300">
            <table className="min-w-[100%] w-[120%] font-outfit">
              <thead>
                <tr className="bg-[#F5F5F5] text-[#727272] font-normal text-[15px] leading-[21.42px]">
                  <td className="text-left p-3">#</td>
                  <td className="text-left p-2">Vehicle No.</td>
                  {/* <td className="text-left p-2">Trailer No.</td> */}
                  <td className="text-left p-1">Inspection Date</td>
                  <td className="text-left p-1">Branch</td>
                  
                  <td className="text-left p-3">Prev km</td>
                  <td className="text-left p-3">Curr. km</td>
                  <td className="text-left p-3">Total Insp.</td>
                  <td className="text-left p-3">Tyre Insp.</td>
                  <td className="text-left p-3">Driver</td>
                  <td className="text-left p-3">Mobile No.</td>
                  <td className="text-left p-3">Inspected By</td>
                  <td className="text-left p-3">Vehicle Status</td>
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
  onClick={() => setVehicle(vehicle.id)}
>
  {noData(vehicle.vehicle_no)}
</td>
                      {/* <td className="p-3">{noData(vehicle.trailer_no)}</td> */}
                      <td className="p-3">{noData(vehicle.last_inspection)}</td>
                      <td className="p-3">{noData(vehicle.city)}</td>
                      
                      <td className="p-3">{noData(vehicle.prev_km)}</td>
                      <td className="p-3">{noData(vehicle.curr_km)}</td>
                      <td className="p-3">{noData(vehicle.inspection_count)}</td>
                      <td className="p-3">{noData(vehicle.inspection_tyre_count)}</td>
                      <td className="p-3">{noData(vehicle.driver_name)}</td>
                      <td className="p-3">{noData(vehicle.driver_contact)}</td>
                      <td className="p-3">{noData(vehicle.service_er)}</td>
                      <td className="p-3">{vehicle.is_active === 1 ? "Live" : "Not Live"}</td>
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
            {Math.min(currentPage * itemsPerPage, data.length)} of {totalPages * itemsPerPage} items
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

export default InspectionReport;
