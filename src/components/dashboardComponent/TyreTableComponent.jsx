import React, { useState } from 'react';
import { FaSort } from 'react-icons/fa';
import { IoFilterSharp } from 'react-icons/io5';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const TyreTable = ({
  currentItems,
  formatDate,
  calculateTimeDifference,
  handleFilterChange,
  handleSort,
  currentPage,
  itemsPerPage,
  totalItems,
  handlePageChange
}) => {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Filtered items based on search query
  const filteredItems = currentItems.filter(item =>
    item.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tyre_no.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.manufacturer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.model_name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  console.log(currentItems)

  const toggleSearchInput = () => {
    setShowSearchInput(prev => !prev);
    // Clear search query when hiding input
    if (showSearchInput) {
      setSearchQuery('');
    }
  };

  return (
    <div className="overflow-x-auto">
      {/* Optionally add a search toggle button here */}
      {/* <button onClick={toggleSearchInput}>Search</button> */}
      
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="py-2 px-1 text-left font-semibold text-[14px] leading-[16.94px] text-[#6D6D6D]">
              <div className="flex gap-1 items-center">
                <p>Pending Date</p>
                <div onClick={() => handleSort('datetime_created')} className="cursor-pointer">
                  <FaSort />
                </div>
              </div>
            </th>
            <th className="py-2 px-4 text-left font-semibold text-[14px] leading-[16.94px] text-[#6D6D6D]">
              <div className="flex gap-1 items-center">
                <p>Action</p>
                <div onClick={() => handleFilterChange('action')} className="cursor-pointer">
                  <IoFilterSharp />
                </div>
              </div>
            </th>
            <th className="py-2 px-4 text-left font-semibold text-[14px] leading-[16.94px] text-[#6D6D6D]">
              <div className="flex gap-1 items-center">
                <p>Tyre No</p>
                <div onClick={() => handleFilterChange('tyre_no')} className="cursor-pointer">
                  <IoFilterSharp />
                </div>
              </div>
            </th>
            <th className="py-2 px-2 text-left font-semibold text-[14px] leading-[16.94px] text-[#6D6D6D]">
              <div className="flex gap-1 items-center">
                <p>Brand</p>
                <div onClick={() => handleFilterChange('brand')} className="cursor-pointer">
                  <IoFilterSharp />
                </div>
              </div>
            </th>
            <th className="py-2 px-4 text-left font-semibold text-[14px] leading-[16.94px] text-[#6D6D6D]">Vehicle No.</th>
            <th className="py-2 px-4 text-left font-semibold text-[14px] leading-[16.94px] text-[#6D6D6D]">
              <div className="flex gap-1 items-center">
                <p>Dues</p>
                <div onClick={() => handleSort('datetime_created')} className="cursor-pointer">
                  <FaSort />
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item, index) => (
            <tr key={index} className="text-left">
              <td className="py-2 px-2 font-medium text-[13px] leading-[20px] text-[#1A1A1A]">
                {formatDate(item.datetime_created)}
              </td>
              <td className="py-2 px-4 font-medium text-[13px] leading-[20px] text-[#1A1A1A]">
                {item.action}
              </td>
              <td className="py-2 px-4 font-medium text-[13px] leading-[20px] text-[#1A1A1A]">
                {item.serial_no}
              </td>
              <td className="py-2 px-2 font-medium text-[13px] leading-[20px] text-[#1A1A1A]">
                {item.brand_name}
              </td>
              <td className="py-2 px-3 font-medium text-[13px] leading-[20px] text-[#1A1A1A]">
                {item.vehicle_no}
              </td>
              
              <td className="py-2 px-4 font-medium text-[13px] leading-[20px] text-[#1A1A1A]">
                {calculateTimeDifference(item.datetime_created)} days
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-1 bg-gray-500 text-white rounded disabled:opacity-50"
        >
          <MdKeyboardArrowLeft />
        </button>
        <span className="mx-4">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-1 bg-gray-500 text-white rounded disabled:opacity-50"
        >
          <MdKeyboardArrowRight />
        </button>
      </div>
    </div>
  );
};

export default TyreTable;
