import React, { useCallback, useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import axios from "axios";
import Loader from "../components/common/Loader";
import "../components/scrollbar.css";
import search from "../assets/icons/search@2x.png";
import notification from "../assets/icons/notifications_unread (1).png";
import { IoFilter } from "react-icons/io5";
import { PiExportBold } from "react-icons/pi";
import TyrePurchaseFilter from "../components/tyrePurchaseComponent/TyrePurchaseFilter";
import TyrePurchaseCountDetails from "../components/tyrePurchaseComponent/tyrePurchaseCountDetails";
import { useDispatch, useSelector } from "react-redux";
import { setTyrePurchaseFormData } from "../redux/Slices/tyrePurchaseFilterSlice";

function formatDate(dateStr) {
  const date = new Date(dateStr);
  
  const options = { year: '2-digit', month: 'short', day: 'numeric' };
  
  return date.toLocaleDateString('en-US', options);
}

function TyrePurchaseReport() {

  const knowUser = JSON.parse(localStorage.getItem("userData"));
  const apiKey = knowUser.data.api_key

  const itemsPerPage = 10;
  const [searchText, setSearchText] = useState(""); // State to store search input

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showTyrePurchaseFilter, setShowTyrePurchaseFilter] = useState(false);
  const [filterData, setFilterData] = useState({report_type: "invoice-wise"});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [activeTable, setActiveTable] = useState("invoice");
  const [vehicleNumberId, setVehicleNumberId] = useState(null);
  const report_type = useSelector(state => state.tyrePurchaseFilter.formData.report_type);
  const noData = (value) => value || "--";
  const dispatch = useDispatch();

  const handleFilterToggle = () => {
    setShowTyrePurchaseFilter(!showTyrePurchaseFilter);
  };

  const fetchTyrePurchaseData = useCallback(
    async (filterData = {}) => {
      setLoading(true);
      setError(null);


      try {

        const formData = new FormData();

        console.log(searchText)

        if (searchText.trim()) {
          formData.append("text", searchText);
        }

        formData.append("report_type", filterData.report_type)
       
        
        

        console.log(formData)


        const response = await axios.post(
          "https://newstaging.regripindia.com/api/tyre-purchase-report",
          formData,  // Send formData, not an object
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: apiKey,
            },
          }
        );

        console.log(response)
        const responseData= response.data

        
        setTotalPages(responseData.pagination.total);
        setData(responseData.data || []);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    },
    [currentPage, filterData, report_type, searchText]
  );

  useEffect(() => {
    fetchTyrePurchaseData(filterData); 
    console.log(filterData, report_type);
    // setFilterData('');
  }, [fetchTyrePurchaseData, currentPage, report_type, filterData, searchText]);

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
    console.log("Value: ", value, "Name: ", name);
    // Merge current formData with the new value
    dispatch(setTyrePurchaseFormData({ [name]: value }));
  };

  const closeInspection = () => {
    setVehicleNumberId(null);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  //   useEffect(() => {
//     console.log(data, activeTable, formData.report_type);
//   }, [data, activeTable]);

  return (
    <div className="p-6 bg-[#F7F7F7] rounded-[50px] overflow-x-auto relative">
      <div className="flex justify-between mb-6">
        <p className="font-inter font-semibold text-[30px] leading-[36.31px] text-[#65A143]">
          Tyre Purchase Report
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
      <div
        className="bg-white rounded-[20px] pt-5 relative"
        style={{ boxShadow: "2px 2px 15px 0px rgba(0, 0, 0, 0.09)" }}
      >
        <div className="flex justify-between mb-2 px-4"> 
            <div className="flex gap-4 items-center">
                <div className="flex gap-2 border-gray-300 border-[1px] border-solid rounded-lg px-3">
                    {/* Invoice Wise */}
                    <div className="flex gap-2 p-2 justify-center items-center">
                        {/* Hidden radio input for "invoice" */}
                        <input
                        type="radio"
                        name="report_type"
                        id="invoice"
                        value="invoice-wise"
                        className={`hidden mt-1 border text-[#383737] text-[15px] border-gray-300 rounded-[6px] py-2 px-2 ${
                            activeTable === "invoice" ? 'bg-[#65A948]' : ''
                        }`}
                        checked={activeTable === "invoice"}
                        readOnly
                        />
                        {/* Custom styled div acting as a radio button */}
                        <div
                        className={`w-4 h-4 border-2 rounded-full cursor-pointer relative flex justify-center items-center ${
                            activeTable === "invoice" ? "border-[#65A948]" : "border-gray-300"
                        }`}
                        onClick={() => {
                            setActiveTable("invoice"); // Manually set value for activeTable
                            handleInputChange({ target: { name: "report_type", value: "invoice-wise" } }); // Manually pass the event object with the value
                        }}
                        >
                        {activeTable === "invoice" && (
                            <div className="w-2 h-2 bg-[#65A948] rounded-full"></div>
                        )}
                        </div>
                        <span
                        className={`whitespace-nowrap ${
                            activeTable === "invoice" ? "text-[#65A948]" : ""
                        }`}
                        >
                        Invoice Wise
                        </span>
                    </div>

                    <span className="border-r-[1px] border-gray-300"></span>

                    {/* Tyre Wise */}
                    <div className="flex gap-2 p-2 justify-center items-center">
                        {/* Hidden radio input for "tyre" */}
                        <input
                        type="radio"
                        name="report_type"
                        id="tyre"
                        value="tyre-wise"
                        className={`hidden mt-1 border text-[#383737] text-[15px] border-gray-300 rounded-[6px] py-2 px-2 ${
                            activeTable === "tyre" ? 'bg-[#65A948]' : ''
                        }`}
                        checked={activeTable === "tyre"}
                        readOnly
                        />
                        {/* Custom styled div acting as a radio button */}
                        <div
                        className={`w-4 h-4 border-2 rounded-full cursor-pointer relative flex justify-center items-center ${
                            activeTable === "tyre" ? "border-[#65A948]" : "border-gray-300"
                        }`}
                        onClick={() => {
                            setActiveTable("tyre"); // Manually set value for activeTable
                            handleInputChange({ target: { name: "report_type", value: "tyre-wise" } }); // Manually pass the event object with the value
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
                        Tyre Wise
                        </span>
                    </div>
                </div>
            </div>

            {/* Right side: Filter, Export, and Add button */}
            <div className="flex items-center gap-4"> {/* Added gap for spacing */}
                {/* Filter */}
                <div className="flex items-center gap-1 cursor-pointer" onClick={handleFilterToggle}>
                <IoFilter fontSize={23} />
                <p className="text-[15px] font-medium">Filter</p>
                </div>

                {/* Export Button */}
                <button className="flex items-center gap-1 p-[5px_15px_10px_15px] text-center rounded-[10px] text-[16px] border-[1px]">
                <PiExportBold />
                <p>Download</p>
                </button>

                {/* Add Button */}
                <button className="bg-black text-white p-[5px_15px_10px_15px] text-center rounded-[10px] text-[16px] flex items-center">
                + Add
                </button>
            </div>
        </div>

        {showTyrePurchaseFilter && (
          <div className="z-30">
            <TyrePurchaseFilter
              isVisible={showTyrePurchaseFilter}
              onClose={handleFilterToggle}
              onSubmit={handleSubmit}
              setFilterData={setFilterData}
            />
          </div>
        )}

        {vehicleNumberId && (
        <>
            <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] z-30"></div>
            <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-40 min-w-[600px] overflow-x-auto">
            <div className="bg-white w-[80%] max-w-[1145px] h-auto rounded-[28px] shadow-lg min-w-[700px] overflow-x-auto">
                <TyrePurchaseCountDetails close={closeInspection} vehicleId={vehicleNumberId} />
            </div>
            </div>
        </>
        )}

        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300">
            {activeTable === "invoice" ? (
              <table className="min-w-[100%] w-[122.5%] font-outfit">
                <thead>
                  <tr className="bg-[#F5F5F5] text-[#727272] font-normal text-[15px] leading-[21.42px]">
                    <td className="text-left p-3">#</td>
                    <td className="text-left p-3">Purchase Date</td>
                    <td className="text-left p-2">Tyre Count</td>
                    <td className="text-left p-3">Invoice No.</td>
                    <td className="text-left p-3">Vendor Name</td>
                    <td className="text-left p-3">Vendor Location</td>
                    <td className="text-left p-3">Basic Amount</td>
                    <td className="text-left">Total Amount</td>
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
                          {noData(formatDate(tyre.purchased_date))}
                        </td>
                        <td className="p-3 ">{noData(tyre.tyres_count)}</td>
                        <td className="p-3">{noData(tyre.invoice_no)}</td>
                        <td className="p-3">{noData(tyre.dealer_name)}</td>
                        <td className="p-3">{noData(tyre.address)}</td>
                        <td className="p-3">{noData(tyre.base_amount)}</td>
                        <td className="">{noData(tyre.total_amount)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            ) : (
              <table className="min-w-[100%] w-[122.5%] font-outfit">
                <thead>
                  <tr className="bg-[#F5F5F5] text-[#727272] font-normal text-[15px] leading-[21.42px]">
                    <td className="text-left p-3">#</td>
                    <td className="text-left p-3">Purchase Date</td>
                    <td className="text-left p-2">Tyre Number</td>
                    <td className="text-left p-3">Brand</td>
                    <td className="text-left p-3">Model</td>
                    <td className="text-left p-3">Size</td>
                    <td className="text-left p-3">Category</td>
                    <td className="text-left p-3">Standard NSD</td>
                    <td className="text-left p-3">Vendor Name</td>
                    <td className="text-left p-3">Tyre Price {"(inc. GST)"}</td>
                    <td className="text-left p-3">Tyre Price {"(exc. GST)"}</td>
                    <td className="text-left p-3">Invoice No.</td>
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
                          {noData(tyre.purchased_date)}
                        </td>
                        <td className="p-3 text-[#65A948] underline cursor-pointer">{noData(tyre.serial_no)}</td>
                        <td className="p-3">{noData(tyre.brand_name)}</td>
                        <td className="p-3" onClick={(e) => setVehicleNumberId(e.target.value)}>{noData(tyre.model_name)}</td>
                        <td className="p-3">{noData(tyre.tyre_size)}</td>
                        <td className="p-3">{noData(tyre.construction_type)}</td>
                        <td className="p-3">{noData(tyre.standard_nsd)}</td>
                        <td className="p-3">
                          {noData(tyre.dealer_name)}
                        </td>
                        <td className="p-3">
                          {noData(tyre.base_amount)}
                        </td>
                        <td className="p-3">
                          {noData(tyre.total_amount)}
                        </td>
                        <td className="p-3">
                          {noData(tyre.invoice_no)}
                        </td>
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
            {totalPages} items
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

export default TyrePurchaseReport;
