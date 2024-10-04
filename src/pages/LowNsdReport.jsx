import { useState, useEffect, useCallback } from "react";
import notification from "../assets/icons/notifications_unread (1).png";
import search from "../assets/icons/search@2x.png";
import axios from "axios";
import Loader from "../components/common/Loader";
import { IoFilter } from "react-icons/io5";
import { PiExportBold } from "react-icons/pi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import LowNsdFilter from "../components/lowNSDcomponent/LowNsdFilter";
import TyreJourney from "../components/masterComponent/TyreJourney";

// Assuming same UI as InspectionReport
const LowNsdTyre = () => {

  const knowUser = JSON.parse(localStorage.getItem("userData"));
  const apiKey = knowUser.data.api_key

  const itemsPerPage = 10;
  const [tyreId, setTyreId] = useState(null);
  const [tyreNo, setTyreNo] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showLowNsdFilter, setShowLowNsdFilter] = useState(false);
  const [filterData, setFilterData] = useState({});
  const [searchText, setSearchText] = useState(""); // Global search state

  const fetchLowNsdData = useCallback(
    async (filterData = {}, searchText = "") => {
      setLoading(true);
      setError(null);

      try {
        const formData = new FormData();

        formData.append("text" , searchText)

        if (filterData.vehicle_num) {
          formData.append("vehicle_num", filterData.vehicle_num);
        }

        if (filterData.nsd) {
          formData.append("nsd", filterData.nsd);
        }

        // Append the search text if provided
        if (searchText) {
          formData.append("search", searchText);
        }

        formData.append("page", currentPage);

        const response = await axios.post(
          "https://newstaging.regripindia.com/api/tyre-low-nsd-report",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: apiKey,
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
    [currentPage]
  );

  useEffect(() => {
    fetchLowNsdData(filterData, searchText); // Call fetch with search text
  }, [fetchLowNsdData, currentPage, filterData, searchText]);

  const handleFilterToggle = () => {
    setShowLowNsdFilter(!showLowNsdFilter);
  };

  const closeTyreJourney = () => {
    setTyreId(null);
  };

  const showTyreJourney = (id, serial_no) => {
    setTyreId(id);
    setTyreNo(serial_no);
  };

  const handleSubmit = (data) => {
    setFilterData(data);
    handleFilterToggle();
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value); // Update search text state
    setCurrentPage(1); // Reset to first page on search
  };

  console.log(data)

  return (
    <div className="p-4 bg-[#F7F7F7] rounded-[50px] overflow-x-auto relative">
      {/* Heading */}
      <div className="flex justify-between mb-6">
        <p className="font-inter ml-5 mt-3 font-semibold text-[30px] leading-[36.31px] text-[#65A143]">
          Low NSD Tyres
        </p>
        <div className="flex items-center gap-[34px">
          <div className="flex bg-[#EBEBEB] rounded-[37px] p-[9px_24px] items-center gap-[7px]">
            <img src={search} alt="search icon" className="w-6 h-6 bg-[#EBEBEB] text-[#949494]" />
            <input
              type="text"
              placeholder="Search Tyre"
              className="outline-none text-sm bg-[#EBEBEB] text-[#949494] font-outfit font-normal text-[19px] leading-[23.94px]"
              value={searchText} // Bind input to searchText state
              onChange={handleSearchChange} // Handle input change
            />
          </div>
          <span className="p-[3px_4px]">
            <img src={notification} alt="notification icon" className="w-6 h-6" />
          </span>
        </div>
      </div>

      {/* Table, Filter, Export, and Loader */}
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
              <p>Download</p>
            </button>
          </div>
        </div>

        {tyreId !== null && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] z-30"></div>
      )}


        {tyreId !== null && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-40 min-w-[700px] overflow-x-auto">
          <div className="bg-white w-[80%] max-w-[1145px] h-[600px] min-h-[500px] min-w-[700px] overflow-x-auto rounded-[28px] shadow-lg">
            <TyreJourney close={closeTyreJourney} tyreId={tyreId} tyreNo={tyreNo} />
          </div>
        </div>
      )}

        {showLowNsdFilter && (
          <div className="z-30">
            <LowNsdFilter
              isVisible={showLowNsdFilter}
              onClose={handleFilterToggle}
              onSubmit={handleSubmit}
            />
          </div>
        )}

        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300">
            <table className="min-w-[100%] w-[100%] font-outfit">
              <thead>
                <tr className="bg-[#F5F5F5] text-[#727272] font-normal text-[15px] leading-[21.42px]">
                  <td className="text-left p-3">#</td>
                  <td className="text-left p-2">Tyre No.</td>
                  <td className="text-left p-3">Brand</td>
                  <td className="text-left p-3">Model</td>
                  <td className="text-left p-3">Last Insp. Date</td>
                  <td className="text-left p-3">Vehicle No.</td>
                  <td className="text-left p-3">Avg. NSD</td>
                  <td className="text-left p-3">Min. NSD</td>
                  <td className="text-left p-3">Max. NSD</td>
                  <td className="text-left p-3">PSI</td>
                  <td className="text-left p-3">Status</td>
                </tr>
              </thead>
              <tbody>
  {data.length === 0 ? (
    <tr>
      <td colSpan="9" className="text-center p-3">Data not found</td>
    </tr>
  ) : (
    data.map((tyre, index) => {
      const nsdValues = [tyre.nsd1, tyre.nsd2, tyre.nsd3];
      const minNSD = Math.min(...nsdValues);
      const maxNSD = Math.max(...nsdValues);
      
      return (
        <tr key={index} className="border-b border-[1px] font-normal text-[14px] leading-[21.42px] text-[#333333] border-gray-200">
          <td className="p-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
          
          <td className="p-3 text-[#65A948] underline cursor-pointer" onClick={() => showTyreJourney(tyre.tyre_id, tyre.serial_no)}>
            {tyre.serial_no}
          </td>

          <td className="p-2">{tyre.brand_name}</td>
          <td className="p-2">{tyre.model_name}</td>
          <td className="p-2">{tyre.inspection_date}</td>
          <td className="p-2">{tyre.vehicle_no}</td>
          <td className="p-2">{tyre.avg_nsd}</td>
          <td className="p-2">{minNSD}</td>
          <td className="p-2">{maxNSD}</td>
          <td className="p-2">{tyre.psi}</td>
          <td className="p-2">
            {tyre.is_resolved === 1 ? "Done" : "Pending"}
          </td>
        </tr>
      );
    })
  )}
</tbody>

             
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 px-4 py-2 bg-[#F7F7F7] rounded-b-lg">
          <p className="text-[14px] font-outfit font-normal leading-[22.4px] text-[#4E4F54]">
            Showing {(currentPage - 1) * itemsPerPage + 1}-
            {Math.min(currentPage * itemsPerPage, data.length)} of {totalPages * itemsPerPage} items
          </p>
          <div className="flex items-center gap-4">
            <div>
              <select
                value={currentPage}
                onChange={(e) => setCurrentPage(Number(e.target.value))}
                className="px-1 py-1 rounded-md border-[1px] border-gray-300"
              >
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <option key={page} value={page}>Page {page}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-gray-300 p-2 rounded-md text-white hover:bg-green-600 cursor-pointer"
              >
                <MdKeyboardArrowLeft />
              </button>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
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

export default LowNsdTyre;
