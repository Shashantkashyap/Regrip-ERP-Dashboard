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
import TyreStatusFilter from "../components/tyreStatusReport/TyreStatusFilter";
import "../components/scrollBar.css";
import { useSelector } from "react-redux";

const TyreStatus = () => {

  const apiKey = useSelector((state)=> state.user.user.data.api_key);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [TyreId, setTyreId] = useState(null);
  const [showTyreStatusFilter, setTyreStatusFilter] = useState(false);
  const [filterData, setFilterData] = useState({});
  const [searchText, setSearchText] = useState(""); // State to store search input


  const noData = (value) => value || "--";

  const [totalRecords, setTotalRecords] = useState();

  const handleFilterToggle = () => {
    setTyreStatusFilter(!showTyreStatusFilter);
  };

  const fetchTyreStatusReportData = useCallback(
    async (filterData = {}) => {
      setLoading(true);
      setError(null);
      try {
        const formData = new FormData();
        if (searchText.trim()) {
          formData.append("global_filter", searchText);
        }
        
        // Append filter data to formData
        Object.keys(filterData).forEach((key) => {
          formData.append(key, filterData[key]);
        });
  
        // Append page to formData
        formData.append("page", currentPage);
  
        const response = await axios.post(
          "https://newstaging.regripindia.com/api/tyreStatusroute",
          formData,  // Send formData, not an object
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: apiKey,
            },
          }
        );
        
        const responseData = response.data;
        
          setData(responseData.data || []);
          setTotalPages(responseData.pagination.totalPages || 1);

        setTotalRecords(responseData.pagination.totalRecords || 0)
        
      } catch (error) {
        setError("Failed to fetch data. Please try again later.");
        
        setData( []);
        setTotalPages(1)
        setTotalRecords(0)
      } finally {
        setLoading(false);
      }
    },
    [currentPage , filterData, searchText]  // Ensure the hook is refreshed when currentPage or apiKey changes
  );
  useEffect(() => {
    fetchTyreStatusReportData();
  }, [fetchTyreStatusReportData, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const closeInspection = () => {
    setTyreId();
  };

  const handleSubmit = (data) => {
    setFilterData(data);
    handleFilterToggle();
    fetchTyreStatusReportData(data);
  };

  const setTyre = (id) => {
    setTyreId(id);
    console.log("Tyre ID set:", id);
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) return ''; // Return empty if date is invalid
  
    const options = { month: 'short', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year
  
    return `${formattedDate}, ${year}`; // Combine formatted date and year
  };
  


  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="p-6 bg-[#F7F7F7] rounded-[50px] overflow-x-auto relative">
      <div className="flex justify-between mb-6">
        <p className="font-inter font-semibold text-[30px] leading-[36.31px] text-[#65A143]">
          Tyre Status Report
        </p>
        <div className="flex items-center gap-[34px]">
          <div className="flex bg-[#EBEBEB] rounded-[37px] p-[9px_24px] items-center gap-[7px]">
            <img src={search} alt="search icon" className="w-6 h-6 bg-[#EBEBEB] text-[#949494]" />
            <input
              type="text"
              placeholder="Search Tyre"
              className="outline-none text-sm bg-[#EBEBEB] text-[#949494] font-outfit font-normal text-[19px] leading-[23.94px]"
              onChange={handleSearchChange}
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

        {showTyreStatusFilter && (
          <div className="z-30">
            <TyreStatusFilter
              isVisible={showTyreStatusFilter}
              onClose={handleFilterToggle}
              onSubmit={handleSubmit}
            />
          </div>
        )}

        {TyreId && (
          <>
            <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] z-30"></div>
            <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-40 min-w-[600px] overflow-x-auto">
              <div className="bg-white w-[80%] max-w-[1145px] h-auto rounded-[28px] shadow-lg min-w-[700px] overflow-x-auto">
                <InspectionCountDetails close={closeInspection} TyresId={TyreId} />
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
            <table className="min-w-[100%] w-[250%] font-outfit">
            <thead>
  <tr className="bg-[#F5F5F5] text-[#727272] font-normal text-[15px] leading-[21.42px]">
    <td className="text-left p-4">#</td>
    
    
    <td className="text-left p-4">Insp. Date</td>
    <td className="text-left p-4">Tyre Insp. Location</td>
    <td className="text-left p-4">Last Updated Type</td>
    <td className="text-left p-4">Invoice No.</td>
    <td className="text-left p-4">Tyre Number</td>
    <td className="text-left p-4">Make</td>
    <td className="text-left p-4">Model</td>
    <td className="text-left p-4">Size</td>
    <td className="text-left p-4">On Status</td>
    <td className="text-left p-4">Current Vehicle No.</td>
    <td className="text-left p-4">Reason</td>
    <td className="text-left p-4">Defect Type</td>
    <td className="text-left p-4">Fresh/Retread</td>
    <td className="text-left p-4">Material Type</td>
    <td className="text-left p-4">Position</td>
    <td className="text-left p-4">Standard Depth</td>
    <td className="text-left p-4">NSD1</td>
    <td className="text-left p-4">NSD2</td>
    <td className="text-left p-4">NSD3</td>
    <td className="text-left p-4">Minimum NSD</td>
    <td className="text-left p-4">Maximum NSD</td>
    <td className="text-left p-4">Tyre Price (exc. GST)</td>
    <td className="text-left p-4">Running KM</td>
  </tr>
</thead>

              <tbody>
                {data.length === 0  && !loading ? (
                  <tr>
                    <td colSpan="15" className="text-center p-3">
                      Data not found
                    </td>
                  </tr>
                ) : (
                  data.map((tyre, index) => (
                    <tr key={index} className="border-b border-[1px] font-normal text-[14px] leading-[21.42px] text-[#333333] border-gray-200">
                      <td className="text-left p-3">{noData(index + 1)}</td>
                      
                      
                      <td className="text-left p-1">{noData(formatDate(tyre.Last_Updated_time))}</td>
                      <td className="text-left p-3">{noData(tyre.tyre_inspection)}</td>
                      <td className="text-left p-3">{noData(tyre.current_status)}</td>
                      <td className="text-left p-3">{noData(tyre.invoice_no)}</td>
                      <td className="text-left p-3 cursor-pointer text-[#63A142]" onClick={() => setTyre(tyre.serial_no)}>
                        {noData(tyre.serial_no)}
                      </td>
                      <td className="text-left p-3">{noData(tyre.brand_name)}</td>
                      <td className="text-left p-3">{noData(tyre.model_name)}</td>
                      <td className="text-left p-3">{noData(tyre.tyre_size)}</td>
                      <td className="text-left p-3">{noData(tyre.current_status)}</td>
                      <td className="text-left p-3">{noData(tyre.vehicle_no)}</td>
                      <td className="text-left p-3">{noData(tyre.defect_type_name)}</td>
                      <td className="text-left p-3">{noData(tyre.defect_type)}</td>
                      <td className="text-left p-3">{noData(tyre.product_category)}</td>
                     <td className="text-left p-3">{noData(tyre.construction_type)}</td>
                      <td className="text-left p-3">{noData(tyre.position)}</td>
                      <td className="text-left p-3">{noData(tyre.standard_nsd)}</td>
                      <td className="text-left p-3">{noData(tyre.nsd1)}</td>
                      <td className="text-left p-3">{noData(tyre.nsd2)}</td>
                      <td className="text-left p-3">{noData(tyre.nsd3)}</td>
                      <td className="text-left p-3">{noData(tyre.minimum_nsd)}</td>
                      <td className="text-left p-3">{noData(tyre.maximum_nsd)}</td>
                      <td className="text-left p-3">{noData(tyre.tyre_price)}</td>
                      <td className="text-left p-3">{noData(tyre.tyre_km)}</td>
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
            {Math.min(currentPage * itemsPerPage, data.length)} of {totalRecords} items
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


export default TyreStatus;
