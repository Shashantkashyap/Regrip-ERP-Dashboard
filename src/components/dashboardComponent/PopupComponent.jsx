import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PiExportBold } from 'react-icons/pi';
import { MdCancel, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import TyreJourney from '../masterComponent/TyreJourney';
import Loader from '../common/Loader';

function PopupComponent({ close }) {
  const knowUser = JSON.parse(localStorage.getItem("userData"));
  const apiKey = knowUser.data.api_key;

  console.log(localStorage.getItem("current_status"))

  const url = "https://api.regripindia.com/api";
  const [tyreData, setTyreData] = useState([]);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [tyreBody, setTyreBody] = useState();
  const [tyreId, setTyreId] = useState(null);
  const [tyreNo, setTyreNo] = useState();
  const [loading, setLoading] = useState(false); // Loader state

  const dispatch = useDispatch();
  const filterTab = useSelector((state) => state.dashboardTableFilter.tableFilter);

  useEffect(() => {
    if (!isEmpty(filterTab)) {
      setTyreBody(filterTab);
    }
  }, [filterTab]);

  const isEmpty = (obj) => Object.keys(obj).length === 0;

  const fetchTyreData = async () => {
    if (!tyreBody || isEmpty(tyreBody)) {
      console.log("Tyre body is empty, skipping fetch.");
      return;
    }

    setLoading(true); // Start loading
    try {
      const formData = new FormData();
      
      for (const key in tyreBody) {
        if (tyreBody.hasOwnProperty(key)) {
          formData.append(key, tyreBody[key]);
        }
      }

      if(tyreBody.hasOwnProperty("tyre_depth") || tyreBody.hasOwnProperty("brand_id")){
        formData.append("current_status", localStorage.getItem("current_status"))
      }
      
      const response = await axios.post(`${url}/tyre-list`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: apiKey,
        },
      });

      console.log(response)

      const totalItems = response.data.total_tyres;
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      setTyreData(response.data.data || []);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching tyre Data:", error);
    } finally {
      setLoading(false); // Stop loading after the fetch
    }
  };

  useEffect(() => {
    fetchTyreData();
  }, [tyreBody]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const displayedData = tyreData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const showTyreJourney = (id, serial_no) => {
    setTyreId(id);
    setTyreNo(serial_no);
  };

  const closeTyreJourney = () => {
    setTyreId(null);
  };

  return (
    <div className="bg-white min-w-[69%] overflow-x-auto h-[700px] flex flex-col rounded-[20px] pt-5 relative" style={{ boxShadow: "2px 2px 15px 0px rgba(0, 0, 0, 0.09)" }}>
      <MdCancel
        fontSize={24}
        onClick={close}
        className="cursor-pointer absolute text-gray-500 hover:text-gray-700 top-4 right-5"
      />

      <div>
        <div className="flex justify-between mb-2">
          <div className="font-semibold text-[23px] text-[#232323] ml-6">
            {tyreBody && (
              <>
                {tyreBody.current_status && !tyreBody.tyre_depth && !tyreBody.product_category
                  ? `${tyreBody.current_status} Tyres`
                  : tyreBody.tyre_condition
                  ? `${tyreBody.tyre_condition} Tyres`
                  : tyreBody.tyre_depth
                  ? `Tyres with ${tyreBody.tyre_depth} mm Depth`
                  : tyreBody.product_category
                  ? `On-Wheel (${tyreBody.product_category}) Tyres`
                  : tyreBody.ongoing_status
                  ? `${tyreBody.ongoing_status} Tyres`
                  : "Total Tyres"}
              </>
            )}
          </div>

          <div className="flex gap-4 items-center mr-5 mt-10">
            <button className="p-[5px_15px_10px_15px] text-center rounded-[10px] text-[16px] flex gap-1 items-center border-[1px]">
              <span>
                <PiExportBold />
              </span>
              <p>Export</p>
            </button>
          </div>
        </div>
      </div>

      {/* Background Overlay */}
      {tyreId !== null && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] z-30"></div>
      )}

      {/* AddVehicle Component */}
      {tyreId !== null && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-40 min-w-[700px] overflow-x-auto">
          <div className="bg-white w-[80%] max-w-[1145px] h-[600px] min-h-[500px] min-w-[700px] overflow-x-auto rounded-[28px] shadow-lg">
            <TyreJourney close={closeTyreJourney} tyreId={tyreId} tyreNo={tyreNo} />
          </div>
        </div>
      )}

      {/* Loader component */}
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Loader />
        </div>
      ) : (
        <div className="overflow-x-auto overflow-y-auto max-h-[500px] scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300">
          <table className="min-w-[97%] font-outfit mx-auto">
            <thead>
              <tr className="bg-[#F5F5F5] text-[#727272] font-normal text-[15px] leading-[21.42px] sticky">
                <td className="text-left p-3">#</td>
                <td className="text-left p-3">Serial No.</td>
                <td className="text-left p-3">Vehicle No.</td>
                <td className="text-left p-2">Size</td>
                <td className="text-left p-3">Brand</td>
                <td className="text-left p-3">Model</td>
                <td className="text-left p-3">Construction</td>
                <td className="text-left p-3">Category</td>
                <td className="text-left p-3">Min NSD</td>
                <td className="text-left p-3">Max NSD</td>
                <td className="text-left p-3">Remaining life</td>
              </tr>
            </thead>

            <tbody>
              {displayedData.map((item, index) => (
                <tr key={index} className="border-b border-[1px] font-normal text-[14px] leading-[21.42px] text-[#333333] border-gray-200">
                  <td className="p-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="p-3 text-green-600 cursor-pointer" onClick={() => showTyreJourney(item.id, item.serial_no)}>{item.serial_no}</td>
                  <td className="p-2">{item.vehicle_no}</td>
                  <td className="p-2">{item.tyre_size}</td>
                  <td className="p-3">{item.brand_name}</td>
                  <td className="p-3">{item.model_name}</td>
                  <td className="p-3">{item.construction_type}</td>
                  <td className="p-3">{item.product_category}</td>
                  <td className="p-3">
  {Math.min(
    item.nsd1 ?? Infinity,
    item.nsd2 ?? Infinity,
    item.nsd3 ?? Infinity,
    item.nsd4 ?? Infinity
  )}
</td>
<td className="p-3">
  {Math.max(
    item.nsd1 ?? 0,
    item.nsd2 ?? 0,
    item.nsd3 ?? 0,
    item.nsd4 ?? 0
  )}
</td>
<td className="p-3">
     {  
    Math.floor(100 -  (((item.std_nsd -3) - (Math.min(item.nsd1 ?? Infinity, item.nsd2 ?? Infinity, item.nsd3 ?? Infinity, item.nsd4 ?? Infinity))) / (item.std_nsd -3))* 100)
  } %
</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-between items-center mt-4 px-4 py-2 bg-[#F7F7F7] rounded-b-lg">
        <p className="text-[14px] font-outfit font-normal leading-[22.4px] text-[#4E4F54]">
          Showing {(currentPage - 1) * itemsPerPage + 1}- {Math.min(currentPage * itemsPerPage, tyreData.length)} of {tyreData.length} items
        </p>
        <div className="flex items-center gap-4">
          <div>
            <select
              value={currentPage}
              onChange={(e) => handlePageChange(Number(e.target.value))}
              className="px-1 py-1 rounded-md border-[1px] border-gray-300"
            >
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <option key={page} value={page}>Page {page}</option>
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
  );
}

export default PopupComponent;
