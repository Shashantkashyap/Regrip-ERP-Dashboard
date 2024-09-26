import React, { useState, useEffect, useCallback } from "react";
import notification from "../assets/icons/notifications_unread (1).png";
import search from "../assets/icons/search@2x.png";
import axios from "axios";
import Loader from "../components/common/Loader";
import "../components/scrollBar.css";
import InspectionCountDetails from "../components/inspectionComponent/InspectionCountDetails";
import MechanicalDefectFilter from "../components/mechanicalDefectComponent/MechanicalDefectFilter";
import {
  DeleteOutlined,
  Add,
  EditOutlined,
  FilterList,
  IosShare,
  ChevronRight,
  ChevronLeft,
} from "@mui/icons-material";
import ImageModal from "../components/mechanicalDefectComponent/ImageModal";

const MechanicalDefectsReport = () => {

  const knowUser = JSON.parse(localStorage.getItem("userData"));
  const apiKey = knowUser.data.api_key

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [vehicleNumberId, setVehicleNumberId] = useState(null);
  const [showMechanicalFilter, setShowMechanicalFilter] = useState(false);
  const [filterData, setFilterData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null); // State to store selected image URL
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open/close state
  const [searchText, setSearchText] = useState(""); // State to store search input

  const noData = (value) => value || "--";

  const formatCustomDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear().toString().slice(-2);
    return `${day} ${month} ${year}`;
  };

  const handleFilterToggle = () => {
    setShowMechanicalFilter(!showMechanicalFilter);
  };

  const fetchMechanicalReportData = useCallback(
    async (filterData = {}) => {
      setLoading(true);
      setError(null);
      try {
        const formData = new FormData();
        if (searchText.trim()) {
          formData.append("text", searchText);
        }

        // Append filter data to formData
        Object.keys(filterData).forEach((key) => {
          formData.append(key, filterData[key]);
        });

        // Append page to formData
        formData.append("page", currentPage);

        const response = await axios.post(
          "https://newstaging.regripindia.com/api/mechanical-defects-data",
          formData, // Send formData, not an object
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: apiKey, // Assuming you have a valid auth token
            },
          }
        );

        const responseData = response.data;

        console.log(data);

        setTotalPages(responseData.totalPages);
        setData(responseData.data || []);
      } catch (error) {
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    },
    [currentPage, searchText] // Make sure this updates when currentPage changes
  );

  const getPriorityClasses = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-[#B83B3B] ";
      case "low":
        return "bg-blue-100 text-[#3B66B8]";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  useEffect(() => {
    fetchMechanicalReportData();
  }, [fetchMechanicalReportData, currentPage]);

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
    fetchMechanicalReportData(data);
  };

  const setVehicle = (id) => {
    setVehicleNumberId(id);
    console.log("Vehicle ID set:", id);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="p-6 bg-[#F7F7F7] rounded-[50px] overflow-x-auto relative">
       {isModalOpen && (
        <ImageModal
          imageUrl={selectedImage} // Pass the selected image URL to the modal
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <div className="flex justify-between mb-6">
        <p className="font-inter font-semibold text-[30px] leading-[36.31px] text-[#65A143]">
          Mechanical Defects Report
        </p>
        <div className="flex items-center gap-[34px]">
          <div className="flex bg-[#EBEBEB] rounded-[37px] p-[5px_24px] items-center gap-[7px]">
            <img
              src={search}
              alt="search icon"
              className="w-6 h-6 bg-[#EBEBEB] text-[#949494]"
            />
            <input
              type="text"
              placeholder="Search Vehicle"
              className="outline-none text-sm bg-[#EBEBEB] text-[#949494] font-outfit font-normal text-[19px] leading-[23.94px]"
              onChange={handleSearchChange}
            />
          </div>
          <span className="p-[3px_4px]">
            <img
              src={notification}
              alt="notification icon"
              className="w-6 h-6"
            />
          </span>
        </div>
      </div>

      <div className="flex flex-col w-full rounded-2xl font-outfit">
        <div className="flex justify-end items-center mb-4">
          <div className="flex">
            <button
              onClick={handleFilterToggle}
              className="mr-5 text-[#333333] rounded-lg flex items-center gap-2 hover:border-[#65A948] hover:text-[#65A948]"
            >
              <FilterList fontSize="small" />
              Filter
            </button>

            <div className="border-r mr-5 h-7 items-center self-center flex border-gray-300" />

            <button className="border border-[#333333] text-[#333333] px-4 py-[7px] rounded-lg flex items-center gap-2 hover:border-[#65A948] hover:text-[#65A948]">
              <IosShare fontSize="small" />
              Export
            </button>
          </div>
        </div>

        {showMechanicalFilter && (
          <div className="z-30">
            <MechanicalDefectFilter
              isVisible={showMechanicalFilter}
              onClose={handleFilterToggle}
              onSubmit={handleSubmit}
            />
          </div>
        )}

        {vehicleNumberId && (
          <>
            <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] z-30"></div>
            <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-40 min-w-[600px] overflow-x-auto">
              <div className="bg-white w-[80%] max-w-[1145px] rounded-[28px] shadow-lg min-w-[700px] overflow-x-auto">
                <InspectionCountDetails
                  close={closeInspection}
                  vehicleId={vehicleNumberId}
                />
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
          <div className="overflow-x-auto rounded-2xl h-[71vh] shadow-[0px_0px_10px_rgba(0,0,0,0.10)] scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300">
            <table className="min-w-full divide-y divide-[#ffffff]">
              <thead>
                <tr className="bg-[#F5F5F5] text-[#727272] font-normal text-[14px] leading-[21.42px]">
                  <td className="text-left whitespace-nowrap px-4 p-3">#</td>
                  <td className="text-left whitespace-nowrap px-4 p-3">
                    Vehicle No.
                  </td>
                  <td className="text-left whitespace-nowrap px-4 p-2">Date</td>
                  <td className="text-left whitespace-nowrap px-4 p-3">
                    Mechanical Defects
                  </td>
                  <td className="text-left whitespace-nowrap px-4 p-3">
                    Position
                  </td>
                  <td className="text-left whitespace-nowrap px-4 p-3">
                    Priority
                  </td>
                  <td className="text-left whitespace-nowrap px-4 p-3">
                    Image
                  </td>
                  <td className="text-left whitespace-nowrap px-4 p-3">
                    Mechanic Name
                  </td>
                  <td className="text-left whitespace-nowrap px-4 p-3">
                    Mechanic Assigned Date
                  </td>
                  <td className="text-left whitespace-nowrap px-4 p-3">
                    Pending Ageing(Days)
                  </td>
                  <td className="text-left whitespace-nowrap px-4 p-3">
                    Status
                  </td>
                  <td className="text-left whitespace-nowrap px-4 p-3">
                    Action date
                  </td>
                  <td className="text-left whitespace-nowrap px-4 p-3">
                    Delay Days.
                  </td>
                  
                  
                  
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#f4f4f4]">
                {data.length === 0 ? (
                  <tr>
                    <td colSpan="13" className="text-center p-3">
                      Data not found
                    </td>
                  </tr>
                ) : (
                  data.map((vehicle, index) => (
                    <tr
                      key={index}
                      className="font-normal text-[14px] leading-[21.42px] text-[#333333]  "
                    >
                      <td className="p-3 px-4">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td
                        className="p-3 px-4 whitespace-nowrap text-[#65A948] underline cursor-pointer"
                        onClick={() => setVehicle(vehicle.id)}
                      >
                        {noData(vehicle.vehicle_no)}
                      </td>
                      <td className="p-3 px-4 whitespace-nowrap">
                        {vehicle.inspection_date
                          ? formatCustomDate(vehicle.inspection_date)
                          : "No Date"}
                      </td>
                      <td className="p-3 px-4 whitespace-nowrap">
                        {noData(vehicle.defect_name)}
                      </td>

                      <td className="p-3 px-4 whitespace-nowrap">
                        {noData(vehicle.position)}
                      </td>
                      <td
                        className={`text-left whitespace-nowrap p-2 px-3 flex items-center justify-center rounded-md ${getPriorityClasses(
                          vehicle.priority
                        )} text-[14px] w-12 h-6 `}
                      >
                        {noData(vehicle.priority)}
                      </td>
                      <td
                        onClick={() => handleImageClick(vehicle.image_url)} // Pass image URL to handleImageClick
                        className="p-3 px-4 cursor-pointer whitespace-nowrap"
                      >
                        <img
                          className="rounded-full w-8 h-8"
                          src={vehicle.image_url}
                          alt="Vehicle"
                        />
                      </td>
                      <td className="p-3 px-4 whitespace-nowrap">
                        {noData(vehicle.mechanic_name)}
                      </td>
                      <td className="p-3 px-4 whitespace-nowrap">
                        {vehicle.mechanic_assigned_date
                          ? formatCustomDate(vehicle.mechanic_assigned_date)
                          : "No Date"}
                      </td>
                      <td className="p-3 px-4 whitespace-nowrap">
                        {noData(vehicle.pending_aging_days)}
                      </td>
                      <td className="p-3 px-4 whitespace-nowrap">
                        {noData(vehicle.status)}
                      </td>
                      <td className="p-3 px-4 whitespace-nowrap">
                        {noData(vehicle.action_days)}
                      </td>
                      <td className="p-3 px-4 whitespace-nowrap">
                        {noData(vehicle.delay_days)}
                      </td>
                     
                      

                      
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination controls */}
        <div className="flex justify-between items-center mt-2 bg-[#F7F7F7] rounded-b-lg">
          <p className="text-[14px] font-outfit font-normal leading-[22.4px] text-[#4E4F54]">
            Showing {(currentPage - 1) * itemsPerPage + 1}-
            {Math.min(currentPage * itemsPerPage, data.length)} of{" "}
            {totalPages * itemsPerPage} items
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 mr-5">
              <select
                value={currentPage}
                onChange={(e) => handlePageChange(Number(e.target.value))}
                className="px-1 py-1 rounded-md border-[1px] border-gray-300 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300"
              >
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <option key={page} value={page}>
                      {page}
                    </option>
                  )
                )}
              </select>
              <h1 className="text-[#4E4F54] text-sm">of {totalPages} pages</h1>
            </div>
            <div className="flex items-center gap-1">
              <button
                className={`mr-2 p-1 border rounded-full ${
                  currentPage === 1
                    ? "bg-gray-100 border-gray-300 text-gray-400"
                    : "bg-white border-[#E1E2E3] hover:bg-[#65A948] hover:border-[#508339] hover:text-white"
                }`}
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <ChevronLeft />
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className={`mr-2 p-1 border rounded-full ${
                  currentPage === totalPages
                    ? "bg-gray-100 border-gray-300 text-gray-400"
                    : "bg-white border-[#E1E2E3] hover:bg-[#65A948] hover:border-[#508339] hover:text-white"
                }`}
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MechanicalDefectsReport;
