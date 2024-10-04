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

function TyreWearReport() {

  const knowUser = JSON.parse(localStorage.getItem("userData"));
  const apiKey = knowUser.data.api_key


  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showTyreWearFilter, setShowTyreWearFilter] = useState(false);
  const [filterData, setFilterData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const noData = (value) => value || "--";
  const [activeTable, setActiveTable] = useState("tyre");
  const formData = useSelector(state => state.tyreWearFilter.formData);
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

        console.log(formData)
        // Append page to formData
        formData.append("page", currentPage);

        if(activeTable == "tyre"){
          formData.append("report_type", "tyre-wise")
        }else{
          formData.append("report_type", "vehicle-wise")
        }

        
        
        const response = await axios.post(
          "https://newstaging.regripindia.com/api/tyre-wear-report",
          formData, // Send formData, not an object
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: apiKey, // Assuming you have a valid auth token
            },
          }
        );
        

        console.log("Response: ", response);
        const responseData = response.data;
        // console.log("Response Data: ", responseData);
        setTotalPages(responseData.pagination.total || 1);
        setData(responseData.data || []);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    },
    [currentPage, filterData] // Make sure this updates when currentPage changes
  );

  useEffect(() => {
    fetchTyreWearData(filterData);
  }, [fetchTyreWearData, currentPage, filterData]);

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
    // console.log("Value: ", value, "Name: ", name);
    // Merge current formData with the new value
    dispatch(setTyreWearFormData({ ...formData, [name]: value }));
  };

  useEffect(() => {
    console.log(data.pagination);
  }, [data]);

  return (
    <div className="p-6 bg-[#F7F7F7] rounded-[50px] overflow-x-auto relative">
      <div className="flex justify-between mb-6">
        <p className="font-inter font-semibold text-[30px] leading-[36.31px] text-[#65A143]">
          Tyre Wear Report
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
        <div className="flex justify-between mb-2 px-4"> 
            <div className="flex gap-4 items-center">
              <div className="flex gap-2 border-gray-300 border-[1px] border-solid rounded-lg px-3">

                {/* Tyre Wise */}
                <div className="flex gap-2 p-2 justify-center items-center">
                  {/* Hidden radio input for "tyre" */}
                  <input
                    type="radio"
                    name="report_type"
                    id="tyre"
                    value="tyre-wise"
                    className={`hidden mt-1 border text-[#383737] text-[15px] border-gray-300 rounded-[6px] py-2 px-2 ${
                      activeTable === "tyre" ? "bg-[#65A948]" : ""
                    }`}
                    checked={activeTable === "tyre"}
                    readOnly
                  />
                  {/* Custom styled div acting as a radio button */}
                  <div
                    className={`w-4 h-4 border-2 rounded-full cursor-pointer relative flex justify-center items-center
                       ${
                      activeTable === "tyre"
                        ? "border-[#65A948]"
                        : "border-gray-300"
                    }
                    `}
                    onClick={() => {
                      setActiveTable("tyre"); // Manually set value for activeTable
                      handleInputChange({
                        target: { name: "report_type", value: "tyre-wise" },
                      }); // Manually pass the event object with the value
                    }}
                  >
                    {activeTable === "tyre" && (
                      <div className="w-2 h-2 bg-[#65A948] rounded-full"></div>
                    )}
                  </div>
                  <span
                    className={`whitespace-nowrap ${
                      activeTable === "tyre" ? "text-[#65A948]" : ""
                    }`}
                  >
                    Tyre Wise {totalPages || 0}
                  </span>
                </div>

                <span className="border-r-[1px] border-gray-300"></span>

                {/* Vehicle Wise */}
                <div className="flex gap-2 p-2 justify-center items-center">
                  {/* Hidden radio input for "vehicle" */}
                  <input
                    type="radio"
                    name="report_type"
                    id="vehicle"
                    value="vehicle"
                    className={`hidden mt-1 border text-[#383737] text-[15px] border-gray-300 rounded-[6px] py-2 px-2 ${
                      activeTable === "vehicle" ? "bg-[#65A948]" : ""
                    }`}
                    checked={activeTable === "vehicle"}
                    readOnly
                  />
                  {/* Custom styled div acting as a radio button */}
                  <div
                    className={`w-4 h-4 border-2 rounded-full cursor-pointer relative flex justify-center items-center ${
                      activeTable === "vehicle"
                        ? "border-[#65A948]"
                        : "border-gray-300"
                    }`}
                    onClick={() => {
                      setActiveTable("vehicle"); // Manually set value for activeTable
                      handleInputChange({
                        target: { name: "report_type", value: "vehicle-wise" },
                      }); // Manually pass the event object with the value
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
                    Vehicle Wise
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-4 items-center mr-5 ">
              <div
                className="flex items-center gap-1"
                onClick={handleFilterToggle}
              >
                <span className="mr-2">
                  <IoFilter fontSize={23} className="cursor-pointer" />
                </span>
                <p className="text-[15px] font-medium">Filter</p>
              </div>
              <button className="p-[5px_15px_10px_15px] text-center rounded-[10px] text-[16px] flex gap-1 items-center border-[1px]">
                <span>
                  <PiExportBold />
                </span>
                <p>Download</p>
              </button>
            </div>
        </div>
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

        {/* Loader */}
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300">
            {activeTable === "tyre" ? (
              <table className="min-w-[100%] w-[130%] font-outfit">
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
                    <td className="text-left p-3">NSD1</td>
                    <td className="text-left p-3">NSD2</td>
                    <td className="text-left p-3">NSD3</td>
                    <td className="text-left p-3">Status</td>
                    <td className="text-left p-3">Resolved Date</td>
                    <td className="text-left p-3">Delay Days</td>
                    <td className="text-left p-3">Pending Ageing (Days)</td>
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
                        <td className="p-3 text-[#65A948] underline cursor-pointer">
                          {noData(tyre.vehicle_no)}
                        </td>
                        <td className="p-3">{noData(tyre.date)}</td>
                        <td className="p-3">{noData(tyre.position)}</td>
                        <td className="p-3">{noData(tyre.tyre_no)}</td>
                        <td className="p-3">{noData(tyre.brand_name)}</td>
                        <td className="p-3">{noData(tyre.model_name)}</td>
                        <td className="p-3">{noData(tyre.size)}</td>
                        <td className="p-3">
                          {noData(
                            tyre.defect_name === null
                              ? "No Defects"
                              : tyre.defect_name
                          )}
                        </td>
                        {/* <td className="p-3">
                          {noData(tyre.standard_nsd)}
                        </td> */}
                        {/* <td className="p-3">{noData(tyre.nsd1)}</td>
                        <td className="p-3">{noData(tyre.nsd2)}</td>
                        <td className="p-3">{noData(tyre.nsd3)}</td> */}
                        <td className="p-3">{noData(tyre.current_status)}</td>
                        {/* <td className="p-3">{noData(tyre.resolved_date)}</td> */}
                        {/* <td className="p-3">{noData(tyre.delay_days)}</td> */}
                        <td className="p-3">
                          {noData(tyre.last_inspection_days)}
                        </td>
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
                      Position(1LO, 1RO, 2RO, 2LO, 2LI, 2RI)
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
                        <td className="p-3">{noData(tyre.date)}</td>
                        <td className="p-3">{noData(tyre.position)}</td>
                        <td className="p-3">{noData(tyre.tyre_no)}</td>
                        <td className="p-3">{noData(tyre.brand_name)}</td>         
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
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
