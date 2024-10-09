import React, { useEffect, useRef, useState } from "react";
import Loader from "../components/common/Loader";
import search from "../assets/icons/search@2x.png";
import notification from "../assets/icons/notifications_unread (1).png";
import BoxCard from "../components/scrapAnalysisComponents/BoxCard";
import ScrapCountCard from "../components/scrapAnalysisComponents/ScrapCountCard";
import ChartComponent from "../components/scrapAnalysisComponents/ChartComponent";
import TyreListComponent from "../components/scrapAnalysisComponents/TyreListComponent";
import LineChart from "../components/chartComponents/LineChart";
import BarChart from "../components/chartComponents/BarChart";
import isFuture from 'date-fns/isFuture';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  Filler,
  ArcElement, // Import ArcElement
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import Calendar from "react-calendar";
import { addMonths } from "date-fns/addMonths";
import DateRange from "../components/DateRange";
import useScrapData from "../custom-hooks/ScrapDataFetching";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
  Tooltip,
  Legend,
  BarElement,
  ArcElement // Register ArcElement
);

function ScrapAnalysisReport() {
  const [dateRange, setDateRange] = useState({ startDate: addMonths(new Date(), -3), endDate: new Date() });
  const [tyreListFilter, setTyreListFilter] = useState({brand_name: "", vehicle_no: "", reason: "", page_no: 1, limit: 10});
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [customDateRange, setCustomDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const selectVal = [];
  const {countData, brandData, reasonData, vehicleData, doughnutData, nsdData, tyreList, currentPage, setCurrentPage, itemsPerPage, realBrandData, realReasonData, realVehicleData, realDoughnutData, realTyreListDataCount, realNsdData, loading, error} = useScrapData(selectVal, customDateRange, tyreListFilter);

  const handleStartDateChange = (date) => {
    if (isFuture(date)) {
      setPopupMessage("Start Date cannot be in the future.");
      return;
    }
    setCustomDateRange((prevState) => ({ ...prevState, startDate: date }));
    setDateRange((prevState) => ({ ...prevState, startDate: date })); // Update dateRange
    setShowStartCalendar(false);
    setPopupMessage("");
  };

  const handleEndDateChange = (date) => {
    if (isFuture(date)) {
      setPopupMessage("End Date cannot be in the future.");
      return;
    }
    setCustomDateRange((prevState) => ({ ...prevState, endDate: date }));
    setDateRange((prevState) => ({ ...prevState, endDate: date })); // Update dateRange
    setShowEndCalendar(false);
    setPopupMessage("");
  };

  const handleStartDateClick = () => {
    setShowStartCalendar(true);
    setShowEndCalendar(false);
  };

  const handleEndDateClick = () => {
    setShowStartCalendar(false);
    setShowEndCalendar(true);
  };

  const headersArray = ["Brand", "Scrap Count", "Scrap %"];
  const headersArray1 = ["Reason", "No. of Tyres", "%"];

  useEffect(() => {
    console.log("Count Data in Report: ", doughnutData);
  }, [selectVal, customDateRange, reasonData, brandData, vehicleData, doughnutData]);

  return (
    <div className="p-6 rounded-[50px] overflow-x-auto relative">
      <div className="flex justify-between">
        <p className="font-inter font-semibold text-[20px] md:text-[30px] text-center md:text-left leading-[36.31px] text-[#65A143]">
          Scrap Analysis
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
              placeholder="Search Tyre"
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

      <div className="rounded-[20px] pt-6 relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div className="p-6 rounded-[50px] relative h-screen scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 overflow-y-auto ">
            <div className="grid gap-6">
              {/* First Row */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* First row: Total Scrap Count and Box Cards */}
                <div className="p-6 rounded-lg pl-12 flex flex-col justify-center">
                  <h2 className="text-gray-800 text-4xl font-semibold mb-4 text-center lg:text-left">
                    Total Scrap Count
                  </h2>
                  <div className="flex items-center gap-2 mb-3 justify-center lg:justify-start">
                    <span className="text-5xl font-semibold text-[#65A948] flex gap-2">
                      {countData?.total_scrap_count || countData?.current_scrap_count || 0}
                      {
                        selectVal !== "total_count" && (
                          <div className="ml-2 flex items-center bg-[#65A948] text-[#FFF] rounded-full px-3 py-1 mt-2 text-sm font-medium flex-row">
                            <span className="flex gap-1">
                              { 
                                // Calculate the scrap count difference
                                ((countData?.current_scrap_count - countData?.previous_scrap_count)) >= 0
                                ? `${(countData?.current_scrap_count || 0) - countData?.previous_scrap_count}` || 0
                                : `${Math.abs((countData?.current_scrap_count || 0) - countData?.previous_scrap_count)}`
                              }
                              
                              { 
                                // Display the double upward arrow if the count is positive
                                (countData?.current_scrap_count || (countData?.total_scrap_count - countData?.previous_scrap_count)) > 0 ? (
                                  <svg
                                    className="w-4 h-4 mt-1 mr-1"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M19 15l-7-7-7 7 M19 9l-7-7-7 7"
                                    />
                                  </svg>
                                ) : (
                                  // Display the double downward arrow if the count is negative
                                  <svg
                                    className="w-4 h-4 mt-1 mr-1"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M5 9l7 7 7-7M5 4l7 7 7-7"
                                    />
                                  </svg>
                                )
                              }
                            </span>
                          </div>
                        )
                      }
                    </span>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm mt-2 justify-center font-semibold lg:justify-start">
                    {
                      selectVal !== "total_count" && (
                        <>
                          <span>
                            vs prev. <span className="text-lg">{countData?.previous_scrap_count}</span>
                          </span>
                          <span className="mx-2 font-extralight">|</span>
                        </>
                      )
                    } 
                    
                    <select
                      name="date-picker"
                      className="bg-transparent"
                      onChange={(e) => setSelectVal(e.target.value)}
                      value={selectVal}
                    >
                      <option value="total_count">Total Count</option>
                      <option value="last_month">Last Month</option>
                      <option value="last_3_months">Last 3 Months</option>
                      <option value="last_6_months">Last 6 Months</option>
                      <option value="custom_date">Custom Date</option>
                    </select> 
                  </div>
                  <div className="mt-4">
                    {selectVal === "custom_date" && (
                      <div className="calendar-wrapper mb-4">
                        <div className="calendar-inputs flex lg:items-start xl:items-center lg:flex-col xl:flex-row flex-row items-center gap-3">
                          <div className="calendar-input relative flex flex-col gap-1">
                            <label className="block mb-1 text-sm text-gray-700 font-semibold">
                              Start Date:
                            </label>
                            <input
                              type="text"
                              value={
                                customDateRange.startDate
                                  ? customDateRange.startDate.toDateString()
                                  : "Select Date"
                              }
                              onClick={handleStartDateClick}
                              readOnly
                              className="py-2 px-2 border border-gray-300 rounded-md text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            {showStartCalendar && (
                              <div className="calendar-container absolute top-full left-0 mt-2 z-10">
                                <Calendar
                                  onChange={handleStartDateChange}
                                  value={customDateRange.startDate}
                                  className="animated-calendar"
                                />
                              </div>
                            )}
                          </div>
                          <div className="calendar-input relative flex flex-col gap-1">
                            <label className="block mb-1 text-sm text-gray-700 font-semibold">
                              End Date:
                            </label>
                            <input
                              type="text"
                              value={
                                customDateRange.endDate
                                  ? customDateRange.endDate.toDateString()
                                  : "Select Date"
                              }
                              onClick={handleEndDateClick}
                              readOnly
                              className="py-2 px-2 border border-gray-300 rounded-md text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            {showEndCalendar && (
                              <div className="calendar-container absolute top-full left-0 mt-2 z-10">
                                <Calendar
                                  onChange={handleEndDateChange}
                                  value={customDateRange.endDate}
                                  className="animated-calendar"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Box Cards in the same row */}
                <div className="grid grid-cols-2 gap-4 place-content-center">
                  <BoxCard
                    title1="Controllable"
                    title2="Non-Controllable"
                    data1={[
                      { value: 0, unit: "Count" },
                      { value: 0, unit: "%" },
                    ]}
                    data2={[
                      { value: 0, unit: "Count" },
                      { value: 0, unit: "%" },
                    ]}
                  />
                  <BoxCard
                    title1="Repeatable"
                    title2="Non-Repeatable"
                    data1={[
                      { value: 0, unit: "Count" },
                      { value: 0, unit: "%" },
                    ]}
                    data2={[
                      { value: 0, unit: "Count" },
                      { value: 0, unit: "%" },
                    ]}
                  />
                </div>
              </div>

              {/* Second Row */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Second row: ScrapCountCard and ChartComponent */}
                {
                  brandData && realBrandData && (
                    <ScrapCountCard
                      tyreListFilter={tyreListFilter}
                      setTyreListFilter={setTyreListFilter}
                      title="Brand Wise"
                      realCount={realBrandData}
                      count={countData?.current_scrap_count >= 0 ? countData?.current_scrap_count : countData?.total_scrap_count}
                      tableHeaders={headersArray}
                      tableData={brandData?.sort((a, b) => a.scrap_percentage - b.scrap_percentage)}
                      className="w-full"
                    />
                  )
                }
                {
                  nsdData && realNsdData && (
                    <div className="pl-2 bg-white h-[350px] flex flex-col px-5 justify-center items-center gap-3 rounded-xl border border-gray-200 ">
                      <div className="flex justify-between items-center w-full px-1">
                        <p className="font-semibold text-lg text-gray-800">NSD Wise</p>
                        <p className="text-green-600 text-xl font-semibold">{realNsdData} / {countData?.current_scrap_count >= 0 ? countData?.current_scrap_count : countData?.total_scrap_count}</p>
                            </div>
                        <Bar
                          data={{
                            labels: ["0-4", "4-8", "8-12", "12-16", "16 and above"],
                            datasets: [
                              {
                                label: "Count",
                                data: nsdData,
                                backgroundColor: [
                                  "#65A143", // solid green for first bar
                                  "#65A143", // lighter green for second bar
                                  "#65A143", // solid green for third bar
                                  "#65A143", // solid green for fourth bar
                                ],
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: "#65A143",
                                barThickness: 50,
                                maxBarThickness: 50,
                              },
                            ],
                          }}
                          options={{
                            scales: {
                              y: {
                                ticks: {
                                  stepSize: 100, // Set y-axis interval to 100
                                },
                                beginAtZero: true, // Ensures the y-axis starts at zero
                              },
                            },
                          }}
                        />
                      </div>
                  )
                }
              </div>

              {/* Third Row */}
              <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                {/* First chart container */}
                <div className="-translate-y-12">
                  <div className="flex justify-between items-center w-full px-4 md:px-6 lg:px-8 pt-1 translate-y-6 md:translate-y-8 lg:translate-y-10">
                    <p className="font-semibold text-base md:text-lg lg:text-xl text-gray-800 -translate-x-1 translate-y-3 md:translate-y-5 lg:translate-y-5">
                      Month Wise
                    </p>
                    {/* DateRange component can be re-enabled if needed */}
                    {/* <DateRange className="text-green-600 text-xl font-semibold translate-y-3" isYearly={true} /> */}
                    <p className="text-green-600 text-base md:text-lg lg:text-xl font-semibold translate-y-3 md:translate-y-5 lg:translate-y-5">
                      0 / {countData?.total_scrap_count || countData?.current_scrap_count}
                    </p>
                  </div>
                  <ChartComponent title="MonthWise" count={0}>
                    <LineChart />
                  </ChartComponent>
                </div>

                {/* Second chart container */}
                <div className="-translate-y-12 md:-translate-y-0">
                  {
                    vehicleData && realVehicleData && (
                      <ScrapCountCard
                        setTyreListFilter={setTyreListFilter}
                        tyreListFilter={tyreListFilter}
                        title="Vehicle"
                        realCount={realVehicleData}
                        count={countData?.current_scrap_count >= 0 ? countData?.current_scrap_count : countData?.total_scrap_count}
                        tableHeaders={["Vehicle", "Count", "%"]}
                        tableData={vehicleData?.sort((a, b) => a.percentage - b.percentage)}
                        className="w-full h-[300px]"
                  />
                    )
                  }
                </div>
              </div>

              {/* Fourth Row */}
              <div className="grid lg:grid-cols-2 gap-6 -translate-y-12">
                {/* Chart with Doughnut */}
                <div className="bg-white px-6 py-12 pt-8 flex-col rounded-lg border border-gray-200 h-[350px] flex justify-center items-start">
                  <div className="flex justify-between items-center w-full">
                    <p className="font-semibold text-lg text-gray-800">Tyre Area</p>
                    <p className="text-green-600 text-xl font-semibold">{realDoughnutData} / {countData?.current_scrap_count >= 0 ? countData?.current_scrap_count : countData?.total_scrap_count}</p>
                  </div>
                  {
                    doughnutData ? 
                    <Doughnut
                    data={{
                      labels: ["Crown", "Side Wall", "Bead", "Inner Crown"],
                      datasets: [
                        {
                          label: "Tyre Area",
                          data: doughnutData || [0, 0, 0, 0], // Ensure this array matches the number of labels
                          backgroundColor: [
                            "rgb(46, 159, 239)", // Crown
                            "rgb(255, 195, 0)",  // Side Wall
                            "rgb(181, 23, 158)", // Bead
                            "rgb(45, 47, 240)",  // Inner Crown
                          ],
                          hoverOffset: 4,
                          borderWidth: 0,
                        },
                      ],
                    }}
                    options={{
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          display: true,
                          labels: {
                            padding: 20,
                            boxWidth: 20, // Adjust the legend box width
                          },
                        },
                      },
                      cutout: "60%", // Keeps the doughnut hole size consistent
                    }}
                  />
                   : <h1>No Data Available</h1>
                  }
                </div>
                {
                  reasonData && realReasonData && (
                    <ScrapCountCard
                      setTyreListFilter={setTyreListFilter}
                      tyreListFilter={tyreListFilter}
                      title="Reasons"
                      realCount={realReasonData}
                      count={countData?.current_scrap_count >= 0 ? countData?.current_scrap_count : countData?.total_scrap_count}
                      tableHeaders={headersArray1}
                      tableData={reasonData}
                      className="w-full"
                />
                  )
                }
              </div>
              
              {/* fifth Row */}
              {/* <div className="grid lg:grid-cols-2 gap-6 -translate-y-12">
                <ScrapCountCard
                  setTyreListFilter={setTyreListFilter}
                  tyreListFilter={tyreListFilter}
                  title="Vehicle"
                  count={countData?.current_scrap_count || countData?.total_scrap_count}
                  tableHeaders={["Vehicle", "Count", "%"]}
                  tableData={vehicleData?.sort((a, b) => a.percentage - b.percentage)}
                  className="w-full"
                />
              </div> */}

              {/* Sixth Row */}
              <TyreListComponent data={tyreList?.data} selectVal={selectVal} tyreListFilter={tyreListFilter} setCurrentPage={setCurrentPage} currentPage={currentPage} itemsPerPage={itemsPerPage} totalPages={tyreList?.totalPages} totalCount={tyreList?.totalCount} realCount={realTyreListDataCount} count={countData?.current_scrap_count >= 0 ? countData?.current_scrap_count : countData?.total_scrap_count} setTyreListFilter={setTyreListFilter} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ScrapAnalysisReport;
