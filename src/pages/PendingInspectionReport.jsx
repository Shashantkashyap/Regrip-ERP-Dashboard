import React, { useEffect, useState } from 'react';
import Alignment from "../components/pendingReports/Alignment";
import Inspection from '../components/pendingReports/Inspection';
import Rotation from '../components/pendingReports/Rotation';
import notification from '../assets/icons/notifications_unread (1).png';  // Assuming the path for the notification icon
import { useDispatch, useSelector } from 'react-redux';

function PendingInspectionReport() {
  const [activeTable, setActiveTable] = useState('inspection');

  const tab = useSelector((state)=> state.dashboardTableFilter.tableFilter)

  useEffect(() => {
    if (tab.hasOwnProperty("PendingI")) {
      setActiveTable("inspection");
    } else if (tab.hasOwnProperty("PendingA")) {
      setActiveTable("alignment");
    } else if (tab.hasOwnProperty("PendingR")) {
      setActiveTable("rotation");
    }
  }, [tab]); // The effect will run whenever `tab` changes

  const renderActiveReport = () => {
    switch (activeTable) {
      case 'inspection':
        return <Inspection />;
      case 'alignment':
        return <Alignment />;
      case 'rotation':
        return <Rotation />;
      default:
        return <Inspection />;
    }
  };

  return (
    <div>
      <div className="p-6 bg-[#F7F7F7] rounded-[50px] overflow-x-auto relative">
        <div className="flex justify-between mb-6">
          <p className="font-inter font-semibold text-[30px] leading-[36.31px] text-[#65A143]">
            Pending Reports
          </p>
          {/* <span className="p-[3px_4px]">
            <img src={notification} alt="notification icon" className="w-6 h-6" />
          </span> */}
        </div>

        {/* Buttons for Inspection, Alignment, and Rotation */}
        <div className="flex gap-4 items-center">
          <div className="flex gap-2 border-gray-300 border-[1px] border-solid rounded-lg px-3">
            {/* Inspection Button */}
            <div className="flex gap-2 p-2 justify-center items-center">
              <input
                type="radio"
                name="report_type"
                id="inspection"
                value="inspection"
                className={`hidden mt-1 border text-[#383737] text-[15px] border-gray-300 rounded-[6px] py-2 px-2 ${
                  activeTable === 'inspection' ? 'bg-[#65A948]' : ''
                }`}
                checked={activeTable === 'inspection'}
                readOnly
              />
              <div
                className={`w-4 h-4 border-2 rounded-full cursor-pointer relative flex justify-center items-center ${
                  activeTable === 'inspection' ? 'border-[#65A948]' : 'border-gray-300'
                }`}
                onClick={() => setActiveTable('inspection')}
              >
                {activeTable === 'inspection' && (
                  <div className="w-2 h-2 bg-[#65A948] rounded-full"></div>
                )}
              </div>
              <span
                className={`whitespace-nowrap ${
                  activeTable === 'inspection' ? 'text-[#65A948]' : ''
                }`}
              >
                Inspection
              </span>
            </div>

            <span className="border-r-[1px] border-gray-300"></span>

            {/* Alignment Button */}
            <div className="flex gap-2 p-2 justify-center items-center">
              <input
                type="radio"
                name="report_type"
                id="alignment"
                value="alignment"
                className={`hidden mt-1 border text-[#383737] text-[15px] border-gray-300 rounded-[6px] py-2 px-2 ${
                  activeTable === 'alignment' ? 'bg-[#65A948]' : ''
                }`}
                checked={activeTable === 'alignment'}
                readOnly
              />
              <div
                className={`w-4 h-4 border-2 rounded-full cursor-pointer relative flex justify-center items-center ${
                  activeTable === 'alignment' ? 'border-[#65A948]' : 'border-gray-300'
                }`}
                onClick={() => setActiveTable('alignment')}
              >
                {activeTable === 'alignment' && (
                  <div className="w-2 h-2 bg-[#65A948] rounded-full"></div>
                )}
              </div>
              <span
                className={`whitespace-nowrap ${
                  activeTable === 'alignment' ? 'text-[#65A948]' : ''
                }`}
              >
                Alignment
              </span>
            </div>

            <span className="border-r-[1px] border-gray-300"></span>

            {/* Rotation Button */}
            <div className="flex gap-2 p-2 justify-center items-center">
              <input
                type="radio"
                name="report_type"
                id="rotation"
                value="rotation"
                className={`hidden mt-1 border text-[#383737] text-[15px] border-gray-300 rounded-[6px] py-2 px-2 ${
                  activeTable === 'rotation' ? 'bg-[#65A948]' : ''
                }`}
                checked={activeTable === 'rotation'}
                readOnly
              />
              <div
                className={`w-4 h-4 border-2 rounded-full cursor-pointer relative flex justify-center items-center ${
                  activeTable === 'rotation' ? 'border-[#65A948]' : 'border-gray-300'
                }`}
                onClick={() => setActiveTable('rotation')}
              >
                {activeTable === 'rotation' && (
                  <div className="w-2 h-2 bg-[#65A948] rounded-full"></div>
                )}
              </div>
              <span
                className={`whitespace-nowrap ${
                  activeTable === 'rotation' ? 'text-[#65A948]' : ''
                }`}
              >
                Rotation
              </span>
            </div>
          </div>
        </div>

        {/* Render the active report */}
        {renderActiveReport()}
      </div>
    </div>
  );
}

export default PendingInspectionReport;
