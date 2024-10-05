import React, { useCallback, useEffect, useState } from "react";
import search from "../assets/icons/search@2x.png";
import notification from "../assets/icons/notifications_unread (1).png";
import { IoFilter } from "react-icons/io5";
import { PiExportBold } from "react-icons/pi";
import TyreWearFilter from "../components/tyrewearComponent/TyreWearFilter";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import axios from "axios";
import Loader from "../components/common/Loader";
import "../components/scrollbar.css";
import { useDispatch, useSelector } from "react-redux";
import { setTyreWearFormData } from "../redux/Slices/tyreWearFilterSlice";
import TyreFitment from "../components/masterComponent/TyreFitment";

function TyreWearReport() {

  const noData = (value) => value || "--";

  const knowUser = JSON.parse(localStorage.getItem("userData"));
  const apiKey = knowUser.data.api_key;

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showTyreWearFilter, setShowTyreWearFilter] = useState(false);
  const [filterData, setFilterData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [activeTable, setActiveTable] = useState("tyre");
  const [totalRecords, setTotalRecords] = useState();
  const [searchText, setSearchText] = useState("");
  const [vehicleId, setVehicleId] = useState(null);
  const formData = useSelector((state) => state.tyreWearFilter.formData);
  const dispatch = useDispatch();

  const handleFilterToggle = () => {
    setShowTyreWearFilter(!showTyreWearFilter);
  };

  const fetchTyreWearData = useCallback(
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

        formData.append("report_type" , "tyre-wise" )

        if (searchText.trim()) {
          formData.append("text", searchText);
        }

       
          

        const response = await axios.post(
          "https://newstaging.regripindia.com/api/tyre-wear-report",
          {...filterData, report_type: "tyre-wise" ,text : searchText},
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: apiKey,
            },
          }
        );

       

        const responseData = response.data;
        setTotalPages(responseData.pagination.totalPages || 1);
        setTotalRecords(responseData.pagination.totalRecords || 0);
        setData(responseData.data || []);
      } catch (error) {
       
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    },
    [currentPage, filterData, searchText] // Add activeTable to the dependencies
  );

  useEffect(() => {
    fetchTyreWearData(filterData);
  }, [fetchTyreWearData, currentPage, filterData, activeTable , searchText]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSubmit = (data) => {
    setFilterData(data);
    handleFilterToggle();
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setTyreWearFormData({ ...formData, [name]: value }));
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  const closeTyreComponent = () => {
    setVehicleId(null);
  };

  const setVehicle = (id) => {
    setVehicleId(id);
  };


  
  return (
    <div className="p-6 bg-[#F7F7F7] rounded-[50px] overflow-x-auto relative">
      <div className="flex justify-between mb-6">
        <p className="font-inter font-semibold text-[30px] leading-[36.31px] text-[#65A143]">
          Tyre Wear Report :({totalRecords})
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
              placeholder="Search tyre/vehicle"
              className="outline-none text-sm bg-[#EBEBEB] text-[#949494] font-outfit font-normal text-[19px] leading-[23.94px]"
              onChange={handleSearchChange}
            />
          </div>
          {/* <span className="p-[3px_4px]">
            <img src={notification} alt="notification icon" className="w-6 h-6" />
          </span> */}
        </div>
      </div>
      <div
        className="bg-white rounded-[20px] pt-5 relative"
        style={{ boxShadow: "2px 2px 15px 0px rgba(0, 0, 0, 0.09)" }}
      >
        <div className="flex justify-between mb-2 px-4">
          <div className="flex gap-4 items-center">
            <div className="flex gap-2  border-solid rounded-lg px-3">
              {/* Tyre Wise */}
              <div className="flex gap-2 p-2 justify-center items-center">
                {/* <input
                  type="radio"
                  name="report_type"
                  id="tyre"
                  value="tyre-wise"
                  className={`hidden mt-1 border text-[#383737] text-[15px] border-gray-300 rounded-[6px] py-2 px-2 ${
                    activeTable === "tyre" ? "bg-[#65A948]" : ""
                  }`}
                  checked={activeTable === "tyre"}
                  readOnly
                /> */}
                {/* <div
                  className={`w-4 h-4 border-2 rounded-full cursor-pointer relative flex justify-center items-center ${
                    activeTable === "tyre"
                      ? "border-[#65A948]"
                      : "border-gray-300"
                  }`}
                  onClick={() => {
                    setActiveTable("tyre");
                    handleInputChange({
                      target: { name: "report_type", value: "tyre-wise" },
                    });
                  }}
                >
                  {activeTable === "tyre" && (
                    <div className="w-2 h-2 bg-[#65A948] rounded-full"></div>
                  )}
                </div> */}
                {/* <span
                  className={`whitespace-nowrap ${
                    activeTable === "tyre" ? "text-[#65A948] text-[24px] font-outfit font-normal  " : ""
                  }`}
                >
                  Wear Count {activeTable === "tyre" ? totalRecords || 0 : ""}
                </span> */}
              </div>

              {/* <span className="border-r-[1px] border-gray-300"></span>

             
              <div className="flex gap-2 p-2 justify-center items-center">
                <input
                  type="radio"
                  name="report_type"
                  id="vehicle"
                  value="vehicle-wise"
                  className={`hidden mt-1 border text-[#383737] text-[15px] border-gray-300 rounded-[6px] py-2 px-2 ${
                    activeTable === "vehicle" ? "bg-[#65A948]" : ""
                  }`}
                  checked={activeTable === "vehicle"}
                  readOnly
                />
                <div
                  className={`w-4 h-4 border-2 rounded-full cursor-pointer relative flex justify-center items-center ${
                    activeTable === "vehicle"
                      ? "border-[#65A948]"
                      : "border-gray-300"
                  }`}
                  onClick={() => {
                    setActiveTable("vehicle");
                    handleInputChange({
                      target: { name: "report_type", value: "vehicle-wise" },
                    });
                  }}
                >
                  {activeTable === "vehicle" && (
                    <div className="w-2 h-2 bg-[#65A948] rounded-full"></div>
                  )}
                </div>
                <span
                  className={`whitespace-nowrap ${
                    activeTable === "vehicle" ? "text-[#65A948]" : ""
                  }`}
                >
                  Vehicle Wise{" "}
                  {activeTable === "vehicle" ? totalRecords || 0 : ""}
                </span>
              </div> */}
            </div>
          </div>
          <div className="flex justify-end">
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
              <p>Download</p>
            </button>
            
          </div>
        </div>
        </div>


        {vehicleId !== null && (
          <>
            <div className="fixed inset-0 bg-[rgba(0,0,0,0.9)] z-30"></div>
            <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-40 min-w-[600px] overflow-x-auto">
              <div className="bg-white w-[80%] max-w-[1145px] max-h-[700px] rounded-[28px] shadow-lg min-w-[700px] overflow-x-auto">
                <TyreFitment close={closeTyreComponent} vehicle={vehicleId} />
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
            {activeTable === "tyre" ? (
              <table className="min-w-[180%] w-[130%] font-outfit">
                <thead>
                  <tr className="bg-[#F5F5F5] text-[#727272] font-normal text-[15px] leading-[21.42px]">
                    <td className="text-left p-3">#</td>
                    <td className="text-left p-3">Vehicle No.</td>
                    <td className="text-left p-2">Date</td>
                    <td className="text-left p-3">Position</td>
                    <td className="text-left p-3">Tyre Number</td>
                    <td className="text-left p-3">Brand</td>
                    <td className="text-left p-3">Model</td>
                    <td className="text-left p-3">Size</td>
                    <td className="text-left p-3">Tyre Wear Defect</td>
                    <td className="text-left p-3">Standard NSD</td>
                    <td className="text-left p-3">Min NSD</td>
                    <td className="text-left p-3">Max NSD</td>
                    <td className="text-left p-3">Remaining life</td>
                    <td className="text-left p-3">Status</td>
                    <td className="text-left p-3">Resolved</td>
                    {/* <td className="text-left p-3">Delay Days</td>
                    <td className="text-left p-3">Pending Ageing (Days)</td> */}
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
                    data.map((tyre, index) => (
                      <tr
                        key={index}
                        className="border-b border-[1px] font-normal text-[14px] leading-[21.42px] text-[#333333] border-gray-200"
                      >
                        <td className="p-3">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>
                        <td className="p-3 text-[#65A948] underline cursor-pointer" onClick={() => setVehicle(tyre.vehicle_id)}>
                          {noData(tyre.vehicle_no)}
                        </td>
                        <td className="p-3">{noData(formatDate(tyre.Date))}</td>
                        <td className="p-3">{noData(tyre.position)}</td>
                        <td className="p-3">{noData(tyre.serial_no)}</td>
                        <td className="p-3">{noData(tyre.brand_name)}</td>
                        <td className="p-3">{noData(tyre.model_name)}</td>
                        <td className="p-3">{noData(tyre.tyre_size)}</td>
                        <td className="p-3">
                          {noData(
                            tyre.defect_name === null
                              ? "No Defects"
                              : tyre.defect_name
                          )}
                        </td>
                        <td className="p-3">
                          {noData(tyre.standard_nsd)}
                        </td>
                        <td className="p-3">
  {Math.min(
    tyre.nsd1 ==0 ? Infinity : tyre.nsd1,
    tyre.nsd2 ==0 ? Infinity : tyre.nsd2,
    tyre.nsd3  == 0 ? Infinity : tyre.nsd3,
    tyre.nsd4 ==0 ? Infinity : tyre.nsd4
  )}
</td>
<td className="p-3">
  {Math.max(
    tyre.nsd1 ?? 0,
    tyre.nsd2 ?? 0,
    tyre.nsd3 ?? 0,
    tyre.nsd4 ?? 0
  )}
</td>
<td className="p-3">
     {  
    Math.floor(100 -  (((tyre.standard_nsd -3) - Math.min(
      tyre.nsd1 ==0 ? Infinity : tyre.nsd1,
      tyre.nsd2 ==0 ? Infinity : tyre.nsd2,
      tyre.nsd3  == 0 ? Infinity : tyre.nsd3,
      tyre.nsd4 ==0 ? Infinity : tyre.nsd4
    )) / (tyre.standard_nsd -3))* 100)   > 100 ? 100 :  Math.floor(100 -  (((tyre.standard_nsd -3) - Math.min(
      tyre.nsd1 ==0 ? Infinity : tyre.nsd1,
      tyre.nsd2 ==0 ? Infinity : tyre.nsd2,
      tyre.nsd3  == 0 ? Infinity : tyre.nsd3,
      tyre.nsd4 ==0 ? Infinity : tyre.nsd4
    )) / (tyre.standard_nsd -3))* 100)
  } %
</td>

                        <td className="p-3">{noData(tyre.current_status)}</td>
                        <td className="p-3">{noData(tyre.is_resolved == 0 ? "Pending" : "Done")}</td>
                        {/* <td className="p-3">{noData(tyre.delay_days)}</td> */}
                        {/* <td className="p-3">
                          {noData(tyre.last_inspection_days)}
                        </td> */}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            ) : (
              <table className="min-w-[100%] w-[100%] font-outfit">
                <thead>
                  <tr className="bg-[#F5F5F5] text-[#727272] font-normal text-[15px] leading-[21.42px]">
                    <td className="text-left p-3">#</td>
                    <td className="text-left p-3">Date</td>
                    <td className="text-left p-2">Vehicle No.</td>
                    <td className="text-left p-3">
                      Tyre Position
                    </td>
                    <td className="text-left p-3">Tyre Count</td>
                    <td className="text-left p-3">Model</td>
                    <td className="text-left p-3">Brand</td>
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
                    data.map((tyre, index) => (
                      <tr
                        key={index}
                        className="border-b border-[1px] font-normal text-[14px] leading-[21.42px] text-[#333333] border-gray-200"
                      >
                        <td className="p-3">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>
                        <td className="p-3">
                          {noData(tyre.date || "12-09-24")}
                        </td>
                        <td className="p-3 text-[#65A948] underline cursor-pointer">
                          {noData(tyre.vehicle_no)}
                        </td>
                        
                        <td className="p-3">{noData(tyre.position)}</td>
                        <td className="p-3">{noData(tyre.date)}</td>
                        
                        <td className="p-3">{noData(tyre.model_name)}</td>
                        
                        <td className="p-3">{noData(tyre.brand_name)}</td>         
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        )}

{showTyreWearFilter && (
          <div className="z-30">
            <TyreWearFilter
              isVisible={showTyreWearFilter}
              onClose={handleFilterToggle}
              onSubmit={handleSubmit}
              filterData={filterData}
            />
          </div>
        )}

        {/* Pagination controls */}
        <div className="flex justify-between items-center mt-4 px-4 py-2 bg-[#F7F7F7] rounded-b-lg">
          <p className="text-[14px] font-outfit font-normal leading-[22.4px] text-[#4E4F54]">
            Showing {(currentPage - 1) * itemsPerPage + 1}-
            {Math.min(currentPage * itemsPerPage, data.length)} of{" "}
            {totalPages * itemsPerPage} items
          </p>
          <div className="flex items-center gap-4">
            <div>
              <select
                value={currentPage}
                onChange={(e) => handlePageChange(Number(e.target.value))}
                className="px-1 py-1 rounded-md border-[1px] border-gray-300"
              >
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <option key={page} value={page}>
                      Page {page}
                    </option>
                  )
                )}
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
}

export default TyreWearReport;
