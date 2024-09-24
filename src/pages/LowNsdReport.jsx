import { useState, useEffect, useCallback } from "react";
import notification from "../assets/icons/notifications_unread (1).png";
import search from "../assets/icons/search@2x.png";
import axios from "axios";
import Loader from "../components/common/Loader";
import { IoFilter } from "react-icons/io5";
import { PiExportBold } from "react-icons/pi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import LowNsdFilter from "../components/lowNSDcomponent/LowNsdFilter";

const LowNsdTyre = () => {
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showLowNsdFilter, setShowLowNsdFilter] = useState(false);
    const [filterData, setFilterData] = useState({});

    const fetchLowNsdData = useCallback(
        async (filterData = {}) => {
          setLoading(true);
          setError(null);
          
          try {
            const formData = new FormData();
      
            // Log the filterData to check its contents
            console.log("Filter Data:", filterData);
      
            // Append filter data only if they exist
            if (filterData.vehicle_num) {
              formData.append("vehicle_num", filterData.vehicle_num);
            }
      
            if (filterData.nsd) {
              formData.append("nsd", filterData.nsd);
            }
      
            // Always append the current page
            formData.append("page", currentPage);
      
            // Send the request
            const response = await axios.post(
              "https://newstaging.regripindia.com/api/tyre-low-nsd-report",
              formData, 
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: "google",  // Assuming this is your auth token
                },
              }
            );
      
            console.log("Response:", response);
      
            // Handle the response
            const responseData = response.data;
            setTotalPages(responseData.totalPages);
            setData(responseData.data || []);
      
          } catch (error) {
            console.error("Error fetching data:", error);
            setError("Failed to fetch data. Please try again later.");
          } finally {
            setLoading(false);
          }
        },
        [currentPage]  // Depend on currentPage
      );
      
      useEffect(() => {
        fetchLowNsdData(filterData);
      }, [fetchLowNsdData, currentPage, filterData]);
      
    const handleFilterToggle = () => {
        setShowLowNsdFilter(!showLowNsdFilter);
    };

    const handleSubmit = (data) => {
        setFilterData(data);
        handleFilterToggle();
        setCurrentPage(1); // Reset to page 1 when a new filter is applied
    };


   

    return (
        <div className="p-4 bg-[#F7F7F7] rounded-lg overflow-x-auto relative">
            <div className="flex justify-between mb-4">
                <p className="font-inter font-semibold text-[24px] leading-[30px] text-[#65A143]">
                    Low NSD Tyres
                </p>
                <div className="flex items-center gap-4">
                    <div className="flex bg-[#EBEBEB] rounded-md p-2 items-center gap-2">
                        <img src={search} alt="search icon" className="w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search Tyre"
                            className="outline-none text-xs bg-[#EBEBEB] text-[#949494] font-outfit"
                        />
                    </div>
                    <span className="p-2">
                        <img src={notification} alt="notification icon" className="w-5 h-5" />
                    </span>
                </div>
            </div>

            <div className="bg-white rounded-md p-4 shadow-md">
                <div className="flex gap-5 justify-end mb-2">
                    <button className="flex items-center gap-1" onClick={handleFilterToggle}>
                        <IoFilter fontSize={20} />
                        <p className="text-sm font-medium">Filter</p>
                    </button>
                    <button className="p-2 text-center rounded-md text-sm flex gap-1 items-center border">
                        <PiExportBold />
                        <p>Export</p>
                    </button>
                </div>

                {showLowNsdFilter && (
                    <LowNsdFilter
                        isVisible={showLowNsdFilter}
                        onClose={handleFilterToggle}
                        onSubmit={handleSubmit}
                    />
                )}

                {loading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full font-outfit text-sm">
                            <thead>
                                <tr className="bg-[#F5F5F5] text-[#727272] text-xs font-medium">
                                    <td className="text-left p-3">#</td>
                                    <td className="text-left p-3">Tyre No.</td>
                                    <td className="text-left p-3">Brand</td>
                                    <td className="text-left p-3">Model</td>
                                    <td className="text-left p-3">Last Insp. Date</td>
                                    <td className="text-left p-3">Vehicle No.</td>
                                    <td className="text-left p-3">Avg. NSD</td>
                                    <td className="text-left p-3">PSI</td>
                                    <td className="text-left p-3">Status</td>
                                </tr>
                            </thead>
                            <tbody>
                                {data.length === 0 ? (
                                    <tr>
                                        <td colSpan="10" className="text-center p-3">Data not found</td>
                                    </tr>
                                ) : (
                                    data.map((tyre, index) => (
                                        <tr key={index} className="border-b border-gray-200">
                                            <td className="p-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                            <td className="p-2">{tyre.serial_no}</td>
                                            <td className="p-2">{tyre.brand_name}</td>
                                            <td className="p-2">{tyre.model_name}</td>
                                            <td className="p-2">{tyre.inspection_date}</td>
                                            <td className="p-2">{tyre.vehicle_no}</td>
                                            <td className="p-2">{tyre.avg_nsd}</td>
                                            <td className="p-2">{tyre.psi}</td>
                                            <td className="p-2">
                                                {tyre.is_active === 1 ? "Done" : "Pending"}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination controls */}
                <div className="flex justify-between items-center mt-4 px-4 py-2 bg-[#F7F7F7] rounded-b-lg">
                    <p className="text-xs font-normal text-[#4E4F54]">
                        Showing {(currentPage - 1) * itemsPerPage + 1}-
                        {Math.min(currentPage * itemsPerPage, data.length)} of {totalPages * itemsPerPage} items
                    </p>
                    <div className="flex items-center gap-2">
                        <div>
                            <select
                                value={currentPage}
                                onChange={(e) => setCurrentPage(Number(e.target.value))}
                                className="px-2 py-1 rounded-md border-gray-300 text-xs"
                            >
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <option key={page} value={page}>Page {page}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="bg-gray-300 p-2 rounded-md cursor-pointer text-sm"
                            >
                                <MdKeyboardArrowLeft />
                            </button>
                            <button
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="bg-gray-300 p-2 rounded-md cursor-pointer text-sm"
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

export default LowNsdTyre;
