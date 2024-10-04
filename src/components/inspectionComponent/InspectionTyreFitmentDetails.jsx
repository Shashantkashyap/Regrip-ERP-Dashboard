import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { PiExportBold } from "react-icons/pi";
import Loader from "../common/Loader";
import { useSelector } from "react-redux";

function InspectionTyreFitmentDetails({ inspectionId, close, vehicleNo }) {
  // const apiKey = useSelector((state)=> state.user.user.data.api_key)

  const knowUser = JSON.parse(localStorage.getItem("userData"));
  const apiKey = knowUser.data.api_key;

  const [tyreFitments, setTyreFitment] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state

  const url = "https://newstaging.regripindia.com/api";

  const fetchTyreFitmentData = async () => {
    try {
      setLoading(true); // Set loading to true when data fetching starts
      const formData = new FormData();
      formData.append("inspection_id", inspectionId);

      const details = await axios.post(
        `${url}/inspection-tyre-details`,
        formData,
        {
          headers: {
            Authorization: apiKey,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const vehicleTyres = details?.data?.data;
      setTyreFitment(Array.isArray(vehicleTyres) ? vehicleTyres : []);
    } catch (error) {
      console.error("Error fetching tyre fitment data:", error);
      setTyreFitment([]);
    } finally {
      setLoading(false); // Set loading to false when data fetching ends
    }
  };

  useEffect(() => {
    fetchTyreFitmentData();
  }, []);

  const setTyreColor = (num) => {
    const colors = {
        1: '#FF0000', // Red
        2: '#0000FF', // Blue
        3: '#008000', // Green
        4: '#A52A2A', // Yellow
        5: '#FFA500', // Orange
        6: '#800080', // Purple
        7: '#00FFFF', // Cyan
        8: '#FFC0CB', // Pink
        9: '#A52A2A', // Brown
        10: '#808080'  // Gray
    };
    return colors[num] || '#00000'; // Return white if num not found
};

  return (
    <div className="font-inter relative p-5 w-[100%] bg-white mx-auto rounded-[28px] min-w-[900px] max-h-[80vh] overflow-hidden">
      <MdCancel
        fontSize={24}
        onClick={close}
        className="cursor-pointer absolute text-gray-500 hover:text-gray-700  top-4 right-5"
      />
      <p className="text-2xl font-semibold text-center text-[#65A143] mb-6 mt-2">
        Tyre Fitment Details -{" "}
        {vehicleNo === null || vehicleNo === undefined ? (
          ""
        ) : (
          <span>{vehicleNo}</span>
        )}
      </p>
      <div className="flex justify-end mb-2">
        <button className="bg-[#333333] text-white text-[14px] py-2 px-4 rounded-md flex items-center gap-2 hover:bg-green-600 transition">
          <PiExportBold size={20} />
          <span>Export</span>
        </button>
      </div>

      {/* Render Loader while loading */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <Loader /> {/* This is your Loader component */}
        </div>
      ) : (
        <div className="rounded-[10px] shadow-[2px_2px_15px_0px_rgba(0,0,0,0.25)] max-h-[60vh] overflow-y-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-[10px]  table-fixed">
  <thead className="bg-gray-100 text-gray-600">
    <tr>
      {['#', 'Position', 'Tyre No.', 'Make', 'Model', 'Retread / Fresh', 'Std NSD', 'Avg. NSD', 'Remaining Life', 'PSI', 'Min NSD', 'Max NSD'].map((header) => (
        <td
          key={header}
          className="py-3 px-1 text-left border-b font-outfit text-[#727272] font-normal text-[14px] leading-[21.42px]"
        >
          {header}
        </td>
      ))}
    </tr>
  </thead>
  <tbody>
    {tyreFitments.length === 0 ? (
      <tr>
        <td colSpan="12" className="py-2 px-4 text-center text-[#333333]">
          Data not found
        </td>
      </tr>
    ) : (
      tyreFitments.map((tyre, index) => (
        <tr key={tyre.id} className="border-b">
          <td className="py-3 px-1 font-outfit text-[#333333] font-normal text-[14px] leading-[21.42px]">
            {index + 1}
          </td>
          <td className="py-3 px-1 font-outfit text-[#333333] font-normal text-[14px] leading-[21.42px]" style={{ color: setTyreColor(parseInt(tyre.tyre_position.split("")[0], 10)) }}>
            {tyre.tyre_position}
          </td>
          <td className="py-3 px-1 font-outfit text-[#333333] font-normal text-[14px] leading-[21.42px] cursor-pointer">
            {tyre.serial_no}
          </td>
          <td className="py-3 px-1 font-outfit text-[#333333] font-normal text-[14px] leading-[21.42px]">
            {tyre.brand_name}
          </td>
          <td className="py-3 px-1 font-outfit text-[#333333] font-normal text-[14px] leading-[21.42px]">
            {tyre.model_name}
          </td>
          <td className="py-3 px-1 font-outfit text-[#333333] font-normal text-[14px] leading-[21.42px]">
            {tyre.product_category}
          </td>
          <td className="py-3 px-1 font-outfit text-[#333333] font-normal text-[14px] leading-[21.42px]">
            {tyre.standard}
          </td>
          <td className="py-3 px-1 font-outfit text-[#333333] font-normal text-[14px] leading-[21.42px]">
          {Number.isInteger(tyre.avg_nsd) ? tyre.avg_nsd.toFixed(1) : tyre.avg_nsd.toFixed(1)}
          </td>
          <td className="py-3 px-1 font-outfit text-[#333333] font-normal text-[14px] leading-[21.42px]">
            {Math.floor(
              100 -
              (((tyre.standard - 3) - Math.min(tyre.nsd1 ?? Infinity, tyre.nsd2 ?? Infinity, tyre.nsd3 ?? Infinity, tyre.nsd4 ?? Infinity)) /
              (tyre.standard - 3)) * 100
            )} %
          </td>
          <td className="py-3 px-1 font-outfit text-[#333333] font-normal text-[14px] leading-[21.42px]">
            {tyre.psi}
          </td>
          <td className="py-3 px-1 font-outfit text-[#333333] font-normal text-[14px] leading-[21.42px]">
            {Math.min(
              tyre.nsd1 == 0 ? Infinity : tyre.nsd1,
              tyre.nsd2 == 0 ? Infinity : tyre.nsd2,
              tyre.nsd3 == 0 ? Infinity : tyre.nsd3,
              tyre.nsd4 == 0 ? Infinity : tyre.nsd4
            )}
          </td>
          <td className="py-3 px-1 font-outfit text-[#333333] font-normal text-[14px] leading-[21.42px]">
            {Math.max(
              tyre.nsd1 ?? 0,
              tyre.nsd2 ?? 0,
              tyre.nsd3 ?? 0,
              tyre.nsd4 ?? 0
            )}
          </td>
        </tr>
      ))
    )}
  </tbody>
</table>
        </div>
      )}
    </div>
  );
}

export default InspectionTyreFitmentDetails;
