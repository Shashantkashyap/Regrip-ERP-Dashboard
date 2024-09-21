import React, { useState, useEffect, useCallback } from "react";
import notification from "../assets/icons/notifications_unread (1).png";
import search from "../assets/icons/search@2x.png";
import axios from "axios";
import Loader from "../components/common/Loader";
import { IoFilter } from "react-icons/io5";
import { PiExportBold } from "react-icons/pi";
import { IoMdAdd } from "react-icons/io";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import HubMismatchFilter from "../components/hubMismatch/HubMismatchFilter"


function HubMismatch() {

    const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [showMismatchFilter, setShowMismatchFilter] = useState(false);
  const [filterData, setFilterData] = useState({});
  const [error, setError] = useState(null)

  const noData = (value) => value || "--";
  const url = "https://newstaging.regripindia.com/api";

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
          `${url}/hub-mismatch-report`,
          formData, // Send formData, not an object
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "google",
            },
          }
        );

        
        const responseData = response.data.mismatch_data;

       responseData.filter((value)=> value.mismatches.length != 0);
        // Update data
        setData(responseData || []);

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

  function formatDate(dateString) {
    const date = new Date(dateString);
    
    // Create an array of month names for formatting
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
    // Extract the day, month, and year
    const day = date.getDate();
    const month = monthNames[date.getMonth()];  // getMonth() returns 0-11
    const year = date.getFullYear();
  
    // Return the formatted date in "DD-MMM-YYYY" format
    return `${day}-${month}-${year}`;
  }
  

  const handleFilterToggle = () => {
    setShowPendingFilter(!showPendingFilter);
  };


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


  console.log(data)

  return (

    <div>
      Hub Mismatch Report
    </div>
//     <div className="p-6 bg-[#F7F7F7] rounded-[50px] overflow-x-auto relative">
//       <div className="flex justify-between mb-6">
//         <p className="font-inter font-semibold text-[30px] leading-[36.31px] text-[#65A143]">
//           Hub Mismatch
//         </p>
//         <div className="flex items-center gap-[34px]">
//           <div className="flex bg-[#EBEBEB] rounded-[37px] p-[9px_24px] items-center gap-[7px]">
//             <img src={search} alt="search icon" className="w-6 h-6 bg-[#EBEBEB] text-[#949494]" />
//             <input
//               type="text"
//               placeholder="Search Vehicle"
//               className="outline-none text-sm bg-[#EBEBEB] text-[#949494] font-outfit font-normal text-[19px] leading-[23.94px]"
//             />
//           </div>
//           <span className="p-[3px_4px]">
//             <img src={notification} alt="notification icon" className="w-6 h-6" />
//           </span>
//         </div>
//       </div>

//       {showMismatchFilter && (
//           <div className="z-30">
//             <HubMismatchFilter
//               isVisible={showMismatchFilter}
//               onClose={handleFilterToggle}
//               onSubmit={handleSubmit}
//             />
//           </div>
//         )}

//       <div className="bg-white rounded-[20px] pt-5 relative" style={{ boxShadow: "2px 2px 15px 0px rgba(0, 0, 0, 0.09)" }}>
//         <div className="flex justify-end mb-2">
//           <div className="flex gap-4 items-center mr-5 ">
//             <div className="flex items-center gap-1" onClick={handleFilterToggle}>
//               <span className="mr-2">
//                 <IoFilter fontSize={23} className="cursor-pointer" />
//               </span>
//               <p className="text-[15px] font-medium">Filter</p>
//             </div>
//             <button className="p-[5px_15px_10px_15px] text-center rounded-[10px] text-[16px] flex gap-1 items-center border-[1px]">
//               <span>
//                 <PiExportBold />
//               </span>
//               <p>Export</p>
//             </button>
//           </div>
//         </div>

//         {/* Loader */}
//         {loading ? (
//   <div className="absolute inset-0 flex items-center justify-center">
//     <Loader />
//   </div>
// ) : (
//   <div className="overflow-x-auto">
//     <table className="min-w-[100%] w-[100%] font-outfit">
//       <thead>
//         <tr className="bg-[#F5F5F5] text-[#727272] font-normal text-[15px] leading-[21.42px]">
//           <td className="text-left p-3">#</td>
//           <td className="text-left p-3">Insp. Date</td>
//           <td className="text-left p-2">Vehicle No.</td>
//           <td className="text-left p-3">Inner tyre Pos.</td>
//           <td className="text-left p-3">Inner tyre Brand</td>
//           <td className="text-left p-3">Inner tyre Model</td>
//           <td className="text-left p-3">Inner tyre Nsd</td>
//           <td className="text-left p-2">Inner tyre Material</td>
//           <td className="text-left p-3">Inner tyre Fresh/Retread</td>
//           <td className="text-left p-3">Outer tyre Pos.</td>
//           <td className="text-left p-3">Outer tyre Brand</td>
//           <td className="text-left p-3">Outer tyre Model</td>
//           <td className="text-left p-3">Outer tyre Nsd</td>
//           <td className="text-left p-2">Outer tyre Material</td>
//           <td className="text-left p-3">Outer tyre Fresh/Retread</td>
//         </tr>
//       </thead>
//       <tbody>
//         {data.length === 0 ? (
//           <tr>
//             <td colSpan="13" className="text-center p-3">
//               Data not found
//             </td>
//           </tr>
//         ) : (
//           data.map((vehicle, index) => (
//             <>
//               {/* Render Vehicle Info */}
//               <tr key={index} className="border-b border-[1px] font-normal text-[14px] leading-[21.42px] text-[#333333] border-gray-200">
//                 <td className="p-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
//                 <td className="p-3">{formatDate(vehicle.inspection_data)}</td>
//                 <td className="p-3">{vehicle.vehicle_no}</td>
//               </tr>

//               {/* Render Mismatches Info */}
//               {vehicle.mismatches.map((mismatch, mismatchIndex) => (
//                 <tr key={`${index}-${mismatchIndex}`} className="border-b border-[1px] font-normal text-[14px] leading-[21.42px] text-[#333333] border-gray-200">
//                   {/* Empty cells for alignment */}
//                   <td></td>
//                   <td></td>
//                   <td></td>

//                   {/* Mismatch data for Inner tyre */}
//                   <td className="p-3">{mismatch.tyre_1_details.position}</td>
//                   <td className="p-3">{mismatch.tyre_1_details.brand_name}</td>
//                   <td className="p-3">{mismatch.tyre_1_details.model_name}</td>
//                   <td className="p-3">{mismatch.tyre_1_details.avg_nsd}</td>
//                   <td className="p-3">{mismatch.tyre_1_details.construction_type}</td>
//                   <td className="p-3">{mismatch.tyre_1_details.tyre_condition === "New" ? "Fresh" : "Retread"}</td>

//                   {/* Mismatch data for Outer tyre */}
//                   <td className="p-3">{mismatch.tyre_2_details.position}</td>
//                   <td className="p-3">{mismatch.tyre_2_details.brand_name}</td>
//                   <td className="p-3">{mismatch.tyre_2_details.model_name}</td>
//                   <td className="p-3">{mismatch.tyre_2_details.avg_nsd}</td>
//                   <td className="p-3">{mismatch.tyre_2_details.construction_type}</td>
//                   <td className="p-3">{mismatch.tyre_2_details.tyre_condition === "New" ? "Fresh" : "Retread"}</td>
//                 </tr>
//               ))}
//             </>
//           ))
//         )}
//       </tbody>
//     </table>
//   </div>
// )}

//         {/* Pagination controls */}
//         <div className="flex justify-between items-center mt-4 px-4 py-2 bg-[#F7F7F7] rounded-b-lg">
//           <p className="text-[14px] font-outfit font-normal leading-[22.4px] text-[#4E4F54]">
//             Showing {(currentPage - 1) * itemsPerPage + 1}-
//             {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} items
//           </p>
//           <div className="flex items-center gap-4">
//             <div>
//               <select
//                 value={currentPage}
//                 onChange={(e) => handlePageChange(Number(e.target.value))}
//                 className="px-1 py-1 rounded-md border-[1px] border-gray-300"
//               >
//                 {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//                   <option key={page} value={page}>
//                     Page {page}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className={`p-2 rounded-md text-white ${
//                   currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-gray-300 hover:bg-green-600"
//                 }`}
//               >
//                 <MdKeyboardArrowLeft />
//               </button>
//               <button
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//                 className={`p-2 rounded-md text-white ${
//                   currentPage === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-gray-300 hover:bg-green-600"
//                 }`}
//               >
//                 <MdKeyboardArrowRight />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
  )
}

export default HubMismatch
