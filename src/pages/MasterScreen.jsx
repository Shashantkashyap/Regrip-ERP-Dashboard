import React, { useEffect, useState } from "react";
import notification from "../assets/icons/notifications_unread (1).png";
import search from "../assets/icons/search@2x.png";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { PiExportBold } from "react-icons/pi";
import { IoFilter } from "react-icons/io5";
import AddVehicle from "../components/masterComponent/AddVehicle";
import FilterSidebar from "../components/masterComponent/FilterSidebar";
import TyreFitment from "../components/masterComponent/TyreFitment";
import axios from "axios";
import Loader from "../components/common/Loader";
import { useDispatch, useSelector } from "react-redux";
import { resetFormData } from "../redux/Slices/masterFilterSlice";
import "../components/scrollBar.css";


function MasterScreen() {
  const formData = useSelector((state) => state.filter.formData);
  const apiKey = useSelector((state)=> state.user.user.data.api_key)

  const url = "https://newstaging.regripindia.com/api";

  const [vehicles, setVehicles] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [ isFilterVisible, setIsFilterVisible] = useState(false);
  const [vehicleTyre, setVehicleTyre] = useState();
  const [addVehicle, setAddVehicle] = useState(false);
  const [filterData, setFilterData] = useState({}); // Store filter data here
  const [vehicleId, setVehicleId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = (data) => {
    
    setFilterData(data); // Set filter data
    handleFilterToggle(); // Hide the filter sidebar

    fetchVehicleMasterData(data); // Fetch data with new filters
    console.log();
    // Reset form data after submission
    setFilterData({});
    dispatch(resetFormData());
  };

  const handleSidebarToggle = () => {
    setSidebarVisible(false);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleFilterToggle = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const closeAddComponent = () => {
    setAddVehicle(false);
  };

  const closeTyreComponent = () => {
    setVehicleId(null);
  };

  const fetchVehicleMasterData = async (filterData) => {
    setIsLoading(true); // Start loading
    try {
      const formData = new FormData();

      filterData !== undefined &&
        Object.keys(filterData).forEach((key) => {
          formData.append(key, filterData[key]);
        });

        formData.append("page", currentPage)

      const vehicleData = await axios.post(
        `${url}/vehicle-master-details`,
        formData,
        {
          headers: {
            Authorization: apiKey,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { data } = vehicleData.data;
      setVehicles(data);
      setCurrentPage(vehicleData.data.pagination.currentPage);
      setTotalPages(vehicleData.data.pagination.totalPages);
      setTotalRecords(vehicleData.data.pagination.totalRecords);
    } catch (error) {
      console.error("Error fetching vehicle data:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchVehicleMasterData();
  }, [currentPage]);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  console.log(vehicles)

  const setVehicle = (id)=>{
    setVehicleId(id)
  }

  return (
    <div className="p-6 bg-[#F7F7F7] rounded-[50px] overflow-x-auto relative">
      <div className="flex justify-between mb-6">
        <p className="font-inter font-semibold text-[30px] leading-[36.31px] text-[#65A143]">
          Vehicle Master ({totalRecords})
        </p>
        <div className="flex items-center gap-[34px]">
          <div className="flex bg-[#EBEBEB] rounded-[37px] p-[9px_24px] items-center gap-[7px]">
            <img
              src={search}
              alt="search icon"
              className="w-6 h-6 bg-[#EBEBEB] text-[#949494]"
            />
            <input
              type="text"
              placeholder="Search Vehicle"
              className="outline-none text-sm bg-[#EBEBEB] text-[#949494] font-outfit font-normal text-[19px] leading-[23.94px]"
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

      <div
        className="bg-white rounded-[20px] pt-5 relative"
        style={{ boxShadow: "2px 2px 15px 0px rgba(0, 0, 0, 0.09)" }}
      >
        <div className="flex justify-end">
          {/* <div className="flex w-[392px] max-lg:w-[30%] mx-[30px] mb-4 bg-[#F6F6F6] rounded-[37px] p-[9px_24px] items-center gap-[7px]">
            <img
              src={search}
              alt="search icon"
              className="w-6 h-6 bg-[#F6F6F6] text-[#949494]"
            />
            <input
              type="text"
              placeholder="Search"
              className="outline-none text-sm bg-[#F6F6F6] w-full text-[#949494] font-outfit font-normal text-[19px] leading-[23.94px]"
              onChange={(e)=> setVehicleNo(e.target.value)}
            />
          </div> */}

          <div className="flex gap-4 items-center mr-5 ">
            <span className="mr-2">
              <IoFilter
                fontSize={23}
                onClick={handleFilterToggle}
                className="cursor-pointer"
              />
            </span>
            <button className="p-[5px_15px_10px_15px] text-center rounded-[10px] text-[16px] flex gap-1 items-center border-[1px]">
              <span>
                <PiExportBold />
              </span>
              <p>Export</p>
            </button>
            <button
              className="p-[5px_15px_10px_15px] text-center rounded-[10px] text-[16px] text-white bg-[#333333] flex gap-1 items-center border-[1px]"
              onClick={() => setAddVehicle(!addVehicle)}
            >
              <span>
                <IoMdAdd />
              </span>
              <p>Add</p>
            </button>
          </div>
        </div>

        {/* Background Overlay */}
        {addVehicle && (
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] z-30"></div>
        )}

        {/* AddVehicle Component */}
        {addVehicle && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-40 min-w-[600px] overflow-x-auto">
            <div className="bg-white w-[80%] max-w-[1145px] h-auto rounded-[28px] shadow-lg min-w-[700px] overflow-x-auto">
              <AddVehicle close={closeAddComponent} />
            </div>
          </div>
        )}

      

{vehicleId !== null && (
  <>
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] z-30"></div>
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-40 min-w-[600px] overflow-x-auto">
      <div className="bg-white w-[80%] max-w-[1145px] max-h-[700px] rounded-[28px] shadow-lg min-w-[700px] overflow-x-auto">
        <TyreFitment close={closeTyreComponent} vehicle={vehicleId} />
      </div>
    </div>
  </>
)}

        {/* Loader */}
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300">
            <table className="min-w-full table-fixed font-outfit">
    <thead>
      <tr className="bg-[#F5F5F5] text-[#727272] font-normal text-[15px] leading-[21.42px]">
        <td className="w-1/12 text-left p-3">#</td>
        <td className="w-2/12 text-left p-3">Vehicle No.</td>
        <td className="w-1/12 text-left p-3">Tyre</td>
        <td className="w-2/12 text-left p-3">Make</td>
        <td className="w-2/12 text-left p-3">Model</td>
        <td className="w-1/12 text-left p-3">Make Year</td>
        <td className="w-2/12 text-left p-3">Created Date</td>
        <td className="w-1/12 text-left p-3">Branch</td>
      </tr>
    </thead>
    <tbody>
      {vehicles.length === 0 ? (
        <tr>
          <td colSpan="8" className="text-center p-3">Data not found</td>
        </tr>
      ) : (
        vehicles.map((vehicle, index) => (
          <tr key={index} className="border-b border-[1px] font-normal text-[14px] leading-[21.42px] text-[#333333] border-gray-200">
            <td className="p-3">{vehicle.sr_no}</td>
            <td className="p-3 text-[#65A948] underline cursor-pointer" onClick={() => setVehicle(vehicle.vehicle_id)}>
              {vehicle.vehicle_no}
            </td>
            <td className="p-3">{vehicle.wheels_count}</td>
            <td className="p-3">{vehicle.manufacturer_name}</td>
            <td className="p-3">{vehicle.model_name}</td>
            <td className="p-3">{vehicle.manufacturer_year}</td>
            <td className="p-3">{vehicle.date}</td>
            <td className="p-3">{vehicle.city}</td>
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
            Showing {(currentPage - 1) * 10 + 1}-
            {Math.min(currentPage * 10, totalRecords)} of {totalRecords} items
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
                onClick={() => handlePageChange(++currentPage)}
                disabled={currentPage === totalPages}
                className="bg-gray-300 p-2 rounded-md text-white hover:bg-green-600 cursor-pointer"
              >
                <MdKeyboardArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="z-30">
        <FilterSidebar
          isVisible={isFilterVisible}
          onClose={handleFilterToggle}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default MasterScreen;
