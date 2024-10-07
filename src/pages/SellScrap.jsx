import React, { useCallback, useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import "../components/scrollbar.css";
import search from "../assets/icons/search@2x.png";
import notification from "../assets/icons/notifications_unread (1).png";
import { IoFilter } from "react-icons/io5";
import TyrePurchaseFilter from "../components/tyrePurchaseComponent/TyrePurchaseFilter";
import arrow from "../assets/icons/arrowright.png";
import PendingTyreImg from "../assets/icons/notifications_unread.png";
import { useDispatch, useSelector } from "react-redux";


function SellScrap() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filterData, setFilterData] = useState({});
  const [showTyrePurchaseFilter, setShowTyrePurchaseFilter] = useState(false);
  const [data, setData] = useState([]);
  const [activeTable, setActiveTable] = useState("Pending Tyre");
  const paymodes = "On amount";

  const dispatch = useDispatch();
  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);


  const handleFilterToggle = () => {
    setShowTyrePurchaseFilter(!showTyrePurchaseFilter);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSubmit = () => {
    handleFilterToggle();
    
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="p-8 bg-[#F7F7F7] rounded-[50px] overflow-x-auto relative">
      {/* TOP HEAEDINGS */}
      <div className="flex justify-between mb-6">
        <p className="font-inter font-semibold text-[30px] leading-[36.31px] text-[#65A143]">
          Sell Scrap
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
              placeholder="Search "
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
          {/* left side of headings */}
          <div className="flex gap-4 items-center">
            <div className="flex gap-2 font-bold   rounded-lg px-3">
              {/*  Pending Tyre */}
              <div className="flex gap-2 text-black  p-2 justify-center items-center">
                <div
                  onClick={() => {
                    setActiveTable("Pending Tyre"); // Manually set value for activeTable
                  }}
                  className={`whitespace-nowrap border-solid  pb-[4px] border-b-[2px] cursor-pointer
                        ${
                          activeTable === "Pending Tyre"
                            ? "text-[#65A948]"
                            : "text-[#7e7e7e]"
                        }
                        ${
                          activeTable === "Pending Tyre"
                            ? "border-[#65A948]"
                            : "border-none  "
                        }`}
                >
                  Pending Tyre (130)
                </div>
              </div>

              {/* Sold Tyres */}
              <div className="flex gap-2 p-2 justify-center items-center">
                <div className="flex gap-2  p-2 justify-center items-center">
                  <div
                    onClick={() => {
                      setActiveTable("Sold Tyres"); // Manually set value for activeTable
                    }}
                    className={`whitespace-nowrap border-solid  pb-[4px] border-b-[2px] cursor-pointer
                        ${
                          activeTable === "Sold Tyres"
                            ? "text-[#65A948]"
                            : "text-[#7e7e7e]"
                        }
                        ${
                          activeTable === "Sold Tyres"
                            ? "border-[#65A948]"
                            : "border-none  "
                        }`}
                  >
                    Sold Tyres (200)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side: Filter, Export, and Add button */}
          <div className="flex items-center gap-4">
            {" "}
            {/* Added gap for spacing */}
            {/* Filter */}
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={handleFilterToggle}
            >
              <IoFilter fontSize={23} />
              <p className="text-[15px] font-medium">Filter</p>
            </div>
            {/* Add Button */}
            <button className={`bg-[#65A948] ${activeTable == "Pending Tyre" ? "block" : "hidden" } text-white pl-[30px] ms-[20px] w-[200px] h-[40px] text-center rounded-[10px] text-[16px] flex items-center`}>
              Sell Select Tyres{" "}
              <img
                src={arrow}
                className="w-[11px] -[20px] pt-[4px] h-[13px] ml-[15px]"
                alt=""
              />
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

          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300">
          {activeTable === "Pending Tyre" ? (
            <table className="w-full font-outfit ">
              <thead>
                <tr className="bg-[#F5F5F5] pe-[20px] text-[#727272] font-normal text-[15px] leading-[21.42px]">
                  <td className="ps-[12px]">
                    <input
                      type="checkbox"
                      name="pendingtyre_checkbox"
                      className="p-[20px]"
                      id="pendingtyre_checkbox"
                    />
                  </td>
                  <td className="text-left p-3">#</td>
                  <td className="text-left p-3">Purchase Date</td>
                  <td className="text-left p-2">Tyre SN</td>
                  <td className="text-left p-3">Size</td>
                  <td className="text-left p-3">Make</td>
                  <td className="text-left p-3">Scrap NSD</td>
                  <td className="text-left p-3">Remaining Life</td>
                  <td className="text-left">Loss</td>
                  <td className="text-left">Scrap reason</td>
                  <td className="text-left ">Image</td>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[1px] font-normal text-[14px] leading-[21.42px] text-[#333333] border-gray-200">
                  <td className="p-3 ">
                    <input type="checkbox" name="" id="" />
                  </td>
                  <td className="p-3">1</td>
                  <td className="p-3">
                    <input type="date" name="" id="" />
                  </td>
                  <td className="p-3 ">{"14514844"}</td>
                  <td className="p-3 ">{"1000-20"}</td>
                  <td className="p-3 ">{"JK"}</td>
                  <td className="p-3 ">{"1.00"}</td>
                  <td className="p-3 ">{"10%"}</td>
                  <td className="p-3 ">{"1000"}</td>
                  <td className="p-3 ">{" Tyre Burst"}</td>
                  <td className="p-3 w-[20px] rounded-[50%]  h-[15px] ">
                    {
                      <img
                        className="cursor-pointer  w-full "
                        src={PendingTyreImg || "image needed"}
                        alt=""
                      />
                    }
                  </td>
                </tr>
                <tr className="border-b border-[1px] font-normal text-[14px] leading-[21.42px] text-[#333333] border-gray-200">
                  <td className="p-3 ">
                    <input type="checkbox" name="" id="" />
                  </td>
                  <td className="p-3">1</td>
                  <td className="p-3">
                    <input type="date" name="" id="" />
                  </td>
                  <td className="p-3 ">{"14514844"}</td>
                  <td className="p-3 ">{"1000-20"}</td>
                  <td className="p-3 ">{"JK"}</td>
                  <td className="p-3 ">{"1.00"}</td>
                  <td className="p-3 ">{"10%"}</td>
                  <td className="p-3 ">{"1000"}</td>
                  <td className="p-3 ">{" Tyre Burst"}</td>
                  <td className="p-3 w-[20px] rounded-[50%]  h-[15px] ">
                    {
                      <img
                        className="cursor-pointer w-full "
                        src={PendingTyreImg || "image needed"}
                        alt=""
                      />
                    }
                  </td>
                </tr>
                <tr className="border-b border-[1px] font-normal text-[14px] leading-[21.42px] text-[#333333] border-gray-200">
                  <td className="p-3 ">
                    <input type="checkbox" name="" id="" />
                  </td>
                  <td className="p-3">1</td>
                  <td className="p-3">
                    <input type="date" name="" id="" />
                  </td>
                  <td className="p-3 ">{"14514844"}</td>
                  <td className="p-3 ">{"1000-20"}</td>
                  <td className="p-3 ">{"JK"}</td>
                  <td className="p-3 ">{"1.00"}</td>
                  <td className="p-3 ">{"10%"}</td>
                  <td className="p-3 ">{"1000"}</td>
                  <td className="p-3 ">{" Tyre Burst"}</td>
                  <td className="p-3 w-[20px] rounded-[50%]  h-[15px] ">
                    {
                      <img
                        className="cursor-pointer w-full "
                        src={PendingTyreImg || "image needed"}
                        alt=""
                      />
                    }
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <table className="w-full font-outfit">
              <thead>
                <tr className="bg-[#F5F5F5] text-[#727272] font-normal text-[15px] leading-[21.42px]">
                  <td className="text-left p-3">#</td>
                  <td className="text-left p-3">Sale Date</td>
                  <td className="text-left p-2">Payment Mode</td>
                  <td className="text-left p-3">Vendor Name</td>
                  <td className="text-left p-3">Branch</td>
                  <td className="text-left p-3">Quality</td>
                  <td className="text-left p-3">Avg.price</td>
                  <td className="text-left p-3">Amount</td>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[1px] font-normal text-[14px] leading-[21.42px] text-[#333333] border-gray-200">
                  <td className="p-3">1 </td>
                  <td className="p-3">
                    {" "}
                    <input type="date" name="" id="" />{" "}
                  </td>

                  <td>
                    {" "}
                    <span
                      className={` rounded-[15px] cursor-pointer p-3 py-2 ${
                        paymodes === "On amount" ? "bg-blue-100" : "bg-none"
                      }`}
                    >
                      {paymodes}
                    </span>{" "}
                  </td>

                  <td className="p-3">{"Tina Rubber"} </td>
                  <td className="p-3">{"JAIPUR"} </td>
                  <td className="p-3">{"10"} </td>
                  <td className="p-3">{"1000"} </td>
                  <td className="p-3">{"10,000"} </td>
                </tr>
                <tr className="border-b border-[1px] font-normal text-[14px] leading-[21.42px] text-[#333333] border-gray-200">
                  <td className="p-3">1 </td>
                  <td className="p-3">
                    {" "}
                    <input type="date" name="" id="" />{" "}
                  </td>

                  <td>
                    {" "}
                    <span
                      className={` rounded-[15px] cursor-pointer p-3 py-2 ${
                        paymodes === "On amount" ? "bg-blue-100" : "bg-none"
                      }`}
                    >
                      {paymodes}
                    </span>{" "}
                  </td>

                  <td className="p-3">{"Tina Rubber"} </td>
                  <td className="p-3">{"JAIPUR"} </td>
                  <td className="p-3">{"10"} </td>
                  <td className="p-3">{"1000"} </td>
                  <td className="p-3">{"10,000"} </td>
                </tr>
                <tr className="border-b border-[1px] font-normal text-[14px] leading-[21.42px] text-[#333333] border-gray-200">
                  <td className="p-3">1 </td>
                  <td className="p-3">
                    {" "}
                    <input type="date" name="" id="" />{" "}
                  </td>

                  <td>
                    {" "}
                    <span
                      className={` rounded-[15px] cursor-pointer p-3 py-2 ${
                        paymodes === "On amount" ? "bg-blue-100" : "bg-none"
                      }`}
                    >
                      {paymodes}
                    </span>{" "}
                  </td>

                  <td className="p-3">{"Tina Rubber"} </td>
                  <td className="p-3">{"JAIPUR"} </td>
                  <td className="p-3">{"10"} </td>
                  <td className="p-3">{"1000"} </td>
                  <td className="p-3">{"10,000"} </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination controls */}
        <div className="flex justify-between items-center mt-4 px-4 py-2 bg-[#F7F7F7] rounded-b-lg">
          <p className="text-[14px] font-outfit font-normal leading-[22.4px] text-[#4E4F54]">
            Showing {(currentPage - 1) * itemsPerPage + 1}-
            {Math.min(currentPage * itemsPerPage, data.length)} of {totalPages}{" "}
            items
          </p>
          <div className="flex items-center gap-4">
            <div>
              {/* <select
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
              </select> */}
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

export default SellScrap;
