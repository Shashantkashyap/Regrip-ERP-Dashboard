import React, { useEffect, useState } from "react";
import isFuture from 'date-fns/isFuture';
import { addMonths } from "date-fns/addMonths";
import Calendar from "react-calendar";

function DateRange({className = '', isCustomDate = false, isTotalCount = false, isYearly = false}) {
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: addMonths(new Date(), -3),
    endDate: new Date(),
  });
  const [selectVal, setSelectVal] = useState("total");
  const [popupMessage, setPopupMessage] = useState("");
  const [customDateRange, setCustomDateRange] = useState({
    startDate: null,
    endDate: null,
  });

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

  useEffect(() => {
   
  }, [dateRange, customDateRange]);

  return (
    <div className={`${className}`}>
      <div>
        <select
          name="date-picker"
          className="bg-transparent text-gray-500 text-sm font-semibold mt-2"
          onChange={(e) => setSelectVal(e.target.value)}
        >
          {
            isTotalCount && <option value="total_count">Total Count</option>
          }
          <option value="last_month">Last Month</option>
          <option value="last_3_months">Last 3 Months</option>
          <option value="last_6_months">Last 6 Months</option>
          {isYearly && <option value="yearly">Yearly</option>}
          {isCustomDate && <option value="custom_date">Custom Date</option>}
        </select>
      </div>
      {
        isCustomDate && (
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
        )
      }
    </div>
  );
}

export default DateRange;
