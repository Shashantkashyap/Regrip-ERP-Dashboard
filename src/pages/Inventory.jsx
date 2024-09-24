import React, { useEffect, useState } from "react";
import notification from "../assets/icons/notifications_unread (1).png";
import search from "../assets/icons/search@2x.png";
import { IoFilter } from "react-icons/io5";
import { PiExportBold } from "react-icons/pi";
import axios from "axios";
import Loading from "../components/common/Loader";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useSelector } from "react-redux";

function Inventory() {

  const apiKey = useSelector((state)=> state.user.user.data.api_key)

  const url = "https://api.regripindia.com/api";
  const [isOnwheelTyres, setIsOnwheelTyres] = useState(true);
  const [extraBody, setExtraBody] = useState(null)
  const [tyreSummary, SetTyreSummary] = useState({
    data: [],
    tyre_depth_data: [],
    onwheel_tyres_data: [],
  });
  const [tyreData, setTyreData] = useState([]);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [tyreBody, setTyreBody] = useState();

  const fetchTyreSummary = async () => {
    try {
      const response = await axios.post(
        `${url}/tyre-summary`,
        {},
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: apiKey,
          },
        }
      );

      SetTyreSummary(response.data);
    } catch (error) {
      console.error("Error fetching tyre summary:", error);
    }
  };

  const fetchTyreData = async () => {
    try {

      const formData = new FormData();

      tyreBody.tyre_depth && (
        form
      )

      const response = await axios.post(`${url}/tyre-list`, tyreBody, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: apiKey,
        },
      });

      const totalItems = response.data.total_tyres;
      const totalPages = Math.ceil(totalItems / itemsPerPage);

      console.log(response)
      setTyreData(response.data.data);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching tyre Data:", error);
    }
  };

  console.log(tyreSummary)

  useEffect(() => {
    fetchTyreSummary();
    fetchTyreData();
  }, [tyreBody]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  console.log(tyreBody)
  console.log(tyreData)

  const displayedData = tyreData !== undefined ? tyreData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  ) : []  ;

  const stockData = {
    totalStock: tyreSummary.data[0]?.total || 0,
    availableStock: tyreSummary.data[1]?.total || 0,
    availableDetails: [
      {
        count: tyreSummary.data[2]?.total || 0,
        label: "New",
        current_status: "New",
      },
      {
        count: tyreSummary.data[3]?.total || 0,
        label: "Ready Retread",
        current_status: "Ready-Retread",
      },
      {
        count: tyreSummary.data[6]?.total || 0,
        label: "Retreaded",
        current_status: "Retreaded",
      },
      {
        count: tyreSummary.data[8]?.total || 0,
        label: "Reusable",
        current_status: "Reusable",
      },
    ],

    utilizedDetails: [
      {
        count: tyreSummary.data[5]?.total || 0,
        label: "In Use",
        current_status: "On-Wheel",
      },
      {
        count: tyreSummary.data[4]?.total || 0,
        label: "Scrap",
        tyre_condition: "Scrap",
      },
      {
        count: tyreSummary.data[7]?.total || 0,
        label: "Retreadable",
        current_status: "Retreadable",
      },
    ],
  };

  const tyreDepthData = {
    onwheelTyres: [
      {
        count: tyreSummary.tyre_depth_data[0]?.total || 0,
        range: "0-4 mm",
        tyre_depth: "0-4",
        current_status: "On-Wheel"
      },
      {
        count: tyreSummary.tyre_depth_data[1]?.total || 0,
        range: "4-8 mm",
        tyre_depth: "4-8",
        current_status: "On-Wheel"
      },
      {
        count: tyreSummary.tyre_depth_data[2]?.total || 0,
        range: "8-12 mm",
        tyre_depth: "8-12",
        current_status: "On-Wheel"
      },
      // { count: tyreSummary.tyre_depth_data[3]?.total || 0, range: "12-16 mm" },
      // { count: tyreSummary.tyre_depth_data[4]?.total || 0, range: "16-20 mm" },
      // { count: tyreSummary.tyre_depth_data[5]?.total || 0, range: "20-24 mm" },
    ],
    otherTyres: [
      {
        count:    tyreSummary.depth_summary_data_others &&   tyreSummary.depth_summary_data_others[0]?.total || 0,
        range: "0-4 mm",
        tyre_depth: "0-4",
        current_status: "other"
      },
      {
        count: tyreSummary.depth_summary_data_others &&  tyreSummary.depth_summary_data_others[1]?.total || 0,
        range: "4-8 mm",
        tyre_depth: "4-8",
        current_status: "other"
      },
      {
        count: tyreSummary.depth_summary_data_others &&  tyreSummary.depth_summary_data_others[2]?.total || 0,
        range: "8-12 mm",
        tyre_depth: "8-12",
        current_status: "other"
      },
      // { count: tyreSummary.depth_summary_data_others &&   tyreSummary.depth_summary_data_others[3]?.total || 0, range: "12-16 mm" },
      // { count: tyreSummary.depth_summary_data_others &&  tyreSummary.depth_summary_data_others[4]?.total || 0, range: "16-20 mm" },
      // { count: tyreSummary.depth_summary_data_others &&  tyreSummary.depth_summary_data_others[5]?.total || 0, range: "20-24 mm" },
    ],
  };

  const currentStatusData = [
    { count: 0 || 0, label: "Scrap Sold" },
    {
      count: tyreSummary.data[10]?.total || 0,
      label: "Sent to Retread",
      ongoing_status: "sent-to-retread",
    },
    {
      count: tyreSummary.data[11]?.total || 0,
      label: "Un-Identified",
      ongoing_status: "Unidentified",
    },
    {
      count: tyreSummary.data[12]?.total || 0,
      label: "Missing",
      ongoing_status: "Missing"
    },
  ];

  const onWheelData = [
    {
      count: tyreSummary.onwheel_tyres_data[2]?.total || 0,
      label: "New Tyres",
      current_Status: "On-Wheel",
      product_category: "fresh"
    },
    {
      count: tyreSummary.onwheel_tyres_data[1]?.total || 0,
      label: "Retreaded Tyres",
      current_status: "On-Wheel",
      product_category: "rtd"
    },
  ];

  console.log(tyreBody)
  

  return (
    <div className="p-6 bg-[#F7F7F7] rounded-[50px] overflow-x-auto relative">
      <div className="flex justify-between mb-10">
        <p className="font-inter font-semibold text-[30px] leading-[36.31px] text-[#65A143]">
          Inventory
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

      <div>
        {!tyreSummary ? (
          <div>
            <Loading />
          </div>
        ) : (
          <div className="flex gap-5">
            {/* Left Side */}
            <div className="flex flex-col gap-5 w-[30%] font-outfit">
              {/* Total Stock */}
              <div
                className="flex justify-between items-center px-2 cursor-pointer"
                onClick={() => setTyreBody({stock_status : "total"})}
              >
                <p className="font-semibold text-[28px] leading-[36px] text-[#232323]">
                  Total Stock
                </p>
                <p className="font-semibold text-[28px] leading-[36px] text-[#65A143]">
                  {stockData?.totalStock || 0}
                </p>
              </div>

              {/* Available Stock */}
              <div className="border-[1px] p-3 bg-white rounded-[17px] flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-[22px] leading-[27.72px] text-[#232323]">
                    Available Stock
                  </p>
                  <p className="font-semibold text-[22px] leading-[27.72px] text-[#66A847]">
                    {stockData?.totalStock || 0}
                  </p>
                </div>
                <div className="flex w-full flex-wrap justify-between gap-1">
                  {stockData?.availableDetails?.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-0 bg-[#F8F8F8] p-[11px_25px_11px_12px] rounded-[10px] w-[49%] cursor-pointer"
                      onClick={() =>
                        setTyreBody({ current_status: item.current_status })
                      }
                    >
                      <p className="font-bold text-[20px] leading-[32px] text-[#66A847]">
                        {item.count}
                      </p>
                      <p className="font-normal text-[13px] leading-[18px] text-[#404040]">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Utilized Stock */}
              <div className="border-[1px] p-3 bg-white rounded-[17px] flex flex-col gap-3 w-full">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-[22px] leading-[27.72px] text-[#232323]">
                    Utilized Stock
                  </p>
                  <p className="font-semibold text-[22px] leading-[27.72px] text-[#66A847]">
                    {stockData?.utilizedStock || 0}
                  </p>
                </div>
                <div className="flex w-full justify-between gap-1">
                  {stockData?.utilizedDetails?.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col bg-[#F8F8F8] p-[11px_25px_11px_12px] rounded-[10px] w-[32%] cursor-pointer"
                      onClick={() => {
                        if (item.current_status) {
                          setTyreBody({ current_status: item.current_status });
                        } else {
                          setTyreBody({ tyre_condition: item.tyre_condition });
                        }
                      }}
                    >
                      <p className="font-bold text-[20px] leading-[32px] text-[#66A847]">
                        {item.count}
                      </p>
                      <p className="font-normal text-[13px] leading-[18px] text-[#404040]">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Current Status */}
              <div className="w-full mx-auto p-3 bg-white rounded-[17px] border-[1px]">
                <h2 className="font-semibold text-[20px] text-[#232323] mb-4">
                  Current Status
                </h2>
                <div className="grid grid-cols-2 gap-2">
                  {currentStatusData?.map((item, index) => (
                    <div
                      key={index}
                      className="bg-[#F8F8F8] p-[11px_25px_11px_12px] rounded-md text-center cursor-pointer"
                      onClick={() =>
                        setTyreBody({ ongoing_status: item.ongoing_status })
                      }
                    >
                      <p className="text-[#66A847] font-bold text-[20px]">
                        {item.count}
                      </p>
                      <p className="text-[#404040] font-normal text-[13px]">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tyre Depth */}
              <div className="w-full mx-auto p-3 bg-white rounded-[17px] border-[1px]">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-[20px] text-[#232323]">
                    Tyre Depth
                  </h2>
                  <p className="font-semibold text-[24px] text-[#66A847]">
                    {tyreSummary.tyre_depth_data?.reduce(
                      (sum, item) => sum + item.total,
                      0
                    ) || 0}
                  </p>
                </div>
                <div className="flex justify-evenly border-b-[2px] border-[#EAEAEA] mb-4">
                  <button
                    className={`text-[13px] font-semibold pb-2 ${
                      isOnwheelTyres
                        ? "text-[#66A847] border-b-[3px] border-[#66A847]"
                        : "text-[#9A9A9A]"
                    }`}
                    onClick={() => setIsOnwheelTyres(true)}
                  >
                    Onwheel Tyres
                  </button>
                  <button
                    className={`text-[13px] font-semibold pb-2 ${
                      !isOnwheelTyres
                        ? "text-[#66A847] border-b-[3px] border-[#66A847]"
                        : "text-[#9A9A9A]"
                    }`}
                    onClick={() => setIsOnwheelTyres(false)}
                  >
                    Other Tyres
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {isOnwheelTyres
                    ? tyreDepthData?.onwheelTyres?.map((item, index) => (
                        <div
                          key={index}
                          className="bg-[#F8F8F8] p-[11px_25px_11px_12px] rounded-md text-center cursor-pointer"
                          onClick={() =>
                            setTyreBody({ tyre_depth: item.tyre_depth })
                          }
                        >
                          <p className="text-[#66A847] font-bold text-[20px]">
                            {item.count}
                          </p>
                          <p className="text-[#404040] font-normal text-[13px]">
                            {item.range}
                          </p>
                        </div>
                      ))
                     : tyreDepthData?.otherTyres?.map((item, index) => (
                     
                      <div
                        key={index}
                        className="bg-[#F8F8F8] p-[11px_25px_11px_12px] rounded-md text-center cursor-pointer"
                        onClick={() =>
                          setTyreBody({ tyre_depth: item.tyre_depth})
                        }
                      >
                        <p className="text-[#66A847] font-bold text-[20px]">{item.count}</p>
                        <p className="text-[#404040] font-normal text-[13px]">{item.range}</p> {/* Corrected */}
                      </div>
                    ))}
                </div>
              </div>

              {/* On Wheel Tyres */}
              <div className="w-full mx-auto p-3 bg-white rounded-[17px] border-[1px]">
                <h2 className="font-semibold text-[20px] text-[#232323] mb-4">
                  On Wheel Tyres
                </h2>
                <div className="grid grid-cols-2 gap-2">
                  {onWheelData?.map((item, index) => (
                    <div
                      key={index}
                      className="bg-[#F8F8F8] p-[11px_25px_11px_12px] rounded-md text-center cursor-pointer"
                      onClick={() =>
                        setTyreBody({ current_status: item.current_status })
                      }
                    >
                      <p className="text-[#66A847] font-bold text-[20px]">
                        {item.count}
                      </p>
                      <p className="text-[#404040] font-normal text-[13px]">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div
              className="bg-white min-w-[69%] overflow-x-auto h-[700px] flex flex-col rounded-[20px] pt-5 relative"
              style={{ boxShadow: "2px 2px 15px 0px rgba(0, 0, 0, 0.09)" }}
            >
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
        : 'Total Tyres'}
    </>
  )}
                    
                  </div>

                  <div className="flex gap-4 items-center mr-5">
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

              {/* Add both horizontal and vertical scroll */}
              <div className="overflow-x-auto overflow-y-auto max-h-[500px] scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300">
                <table className="min-w-[100%] font-outfit">
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
                      <tr
                        key={index}
                        className="border-b border-[1px] font-normal text-[14px] leading-[21.42px] text-[#333333] border-gray-200"
                      >
                        <td className="p-3 ">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>
                        <td className="p-3">{item.serial_no}</td>
                        <td className="p-2">{item.tyre_size}</td>
                        <td className="p-3">{item.brand_name}</td>
                        <td className="p-3">{item.model_name}</td>
                        <td className="p-3">{item.product_category}</td>
                        <td className="p-3">{item.current_status}</td>
                        <td className="p-3">{item.ongoing_status !== "" ? item.ongoing_status : (<img src="https://media.istockphoto.com/id/1133442802/vector/green-checkmark-vector-illustration.jpg?s=612x612&w=0&k=20&c=NqyVOdwANKlbJNqbXjTvEp2wIZWUKbfUbRxm9ROPk6M=" width={25}></img>)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination controls */}
              <div className="flex justify-between items-center mt-4 px-4 py-2 bg-[#F7F7F7] rounded-b-lg">
                <p className="text-[14px] font-outfit font-normal leading-[22.4px] text-[#4E4F54]">
                  Showing {(currentPage - 1) * itemsPerPage + 1}-
                  {Math.min(currentPage * itemsPerPage, tyreData.length)} of{" "}
                  {tyreData.length} items
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
        )}
      </div>
    </div>
  );
}

export default Inventory;
