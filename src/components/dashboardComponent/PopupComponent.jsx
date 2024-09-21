import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PiExportBold } from 'react-icons/pi';
import { MdCancel, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

function PopupComponent({ close }) {

  const apiKey = useSelector((state)=> state.user.user.data.api_key)

  const url = "https://staging.regripindia.com/api";
  const [tyreData, setTyreData] = useState([]);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [tyreBody, setTyreBody] = useState();


  const dispatch = useDispatch()

const filterTab = useSelector((state) => state.dashboardTableFilter.tableFilter);


useEffect(() => {
  if (!isEmpty(filterTab)) {
    setTyreBody(filterTab);
  }
}, [filterTab]); // Dependency array ensures this runs when filterTab changes


  console.log(tyreBody)

  const isEmpty = (obj) => Object.keys(obj).length === 0;

  const fetchTyreData = async () => {
    // Check if tyreBody is empty or undefined
    if (!tyreBody || isEmpty(tyreBody)) {
      console.log("Tyre body is empty, skipping fetch.");
      return; // Prevent API call if tyreBody is not valid
    }
  
    try {
      const formData = new FormData();
      for (const key in tyreBody) {
        if (tyreBody.hasOwnProperty(key)) {
          formData.append(key, tyreBody[key]);
        }
      }
  
      const response = await axios.post(`${url}/tyre-list`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: apiKey,
        },
      });
  
      const totalItems = response.data.total_tyres;
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      setTyreData(response.data.data);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching tyre Data:", error);
    }
  };

  useEffect(() => {
   
    fetchTyreData();
  }, [tyreBody]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  console.log(tyreData)

  // Calculate displayed data based on current page
  const displayedData =  tyreData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  console.log(displayedData)

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
      {tyreBody.current_status
        ? `${tyreBody.current_status} Tyres`
        : tyreBody.tyre_condition
        ? `${tyreBody.tyre_condition} Tyres`
        : tyreBody.tyre_depth
        ? `Tyres with ${tyreBody.tyre_depth} mm Depth`
        : `${tyreBody.stock_status} Tyres`
        ? `Available Tyres`
        
        : 'Total Tyres'}
    </>
  )}
                    
                  </div>

          <div className="flex gap-4 items-center mr-5 mt-10">
            {/* <div className="flex items-center gap-1">
              <span className="mr-2">
                <IoFilter fontSize={23} className="cursor-pointer" />
              </span>
              <p className="text-[15px] font-medium">Filter</p>
            </div> */}
            <button className="p-[5px_15px_10px_15px] text-center rounded-[10px] text-[16px] flex gap-1 items-center border-[1px]">
              <span>
                <PiExportBold />
              </span>
              <p>Export</p>
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto overflow-y-auto max-h-[500px] scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300">
        <table className="min-w-[97%] font-outfit mx-auto">
          <thead>
            <tr className="bg-[#F5F5F5] text-[#727272] font-normal text-[15px] leading-[21.42px] sticky">
              <td className="text-left p-3">#</td>
              <td className="text-left p-3">Serial No.</td>
              <td className="text-left p-2">Size</td>
              <td className="text-left p-3">Brand</td>
              <td className="text-left p-3">Model</td>
              <td className="text-left p-3">Category</td>
              <td className="text-left p-3">Status</td>
              <td className="text-left p-3">Now In</td>
            </tr>
          </thead>

          <tbody>
            {displayedData.map((item, index) => (
              <tr key={index} className="border-b border-[1px] font-normal text-[14px] leading-[21.42px] text-[#333333] border-gray-200">
                <td className="p-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="p-3">{item.serial_no}</td>
                <td className="p-2">{item.tyre_size}</td>
                <td className="p-3">{item.brand_name}</td>
                <td className="p-3">{item.model_name}</td>
                <td className="p-3">{item.product_category}</td>
                <td className="p-3">{item.current_status}</td>
                <td className="p-3">{item.ongoing_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
