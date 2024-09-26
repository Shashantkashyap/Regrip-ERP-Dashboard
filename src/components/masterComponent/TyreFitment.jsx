import React, { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { PiExportBold } from "react-icons/pi";
import TyreJourney from "./TyreJourney";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "../common/Loader"; // Assuming you have a Loader component
import "../scrollBar.css"
import { set } from "lodash";

function TyreFitment({ close, vehicle }) {
 // const apiKey = useSelector((state) => state.user.user.data.api_key);
 const knowUser = JSON.parse(localStorage.getItem("userData"));
  const apiKey = knowUser.data.api_key

  const [tyreId, setTyreId] = useState(null);
  const [tyreFitments, setTyreFitment] = useState([]);
  
  const [tyreNo, setTyreNo] = useState();
  const [loading, setLoading] = useState(true); // State to handle loader
  const [isFetchComplete, setIsFetchComplete] = useState(false); // Tracks if the fetch has been completed

  const url = "https://staging.regripindia.com/api";

  const fetchTyreFitmentData = async () => {
    try {
      setLoading(true); // Start loading
      const formData = new FormData();
      formData.append("vehicle_id", vehicle);

      const details = await axios.post(
        `${url}/vm-vehicle-details`,
        formData,
        {
          headers: {
            Authorization: apiKey,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      
      setTyreFitment(details.data.vehicle_tyres);
    } catch (error) {
      console.error("Error fetching tyre fitment data:", error);
    } finally {
      setLoading(false); // Stop loader when fetch is complete
      setIsFetchComplete(true); // Mark fetch as complete
    }
  };

  useEffect(() => {
    fetchTyreFitmentData();
  }, []);

  const showTyreJourney = (id, serial_no) => {
    setTyreId(id);
    setTyreNo(serial_no);
  };

  const closeTyreJourney = () => {
    setTyreId(null);
  };

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
    <div className="font-inter relative p-5 w-[90%] bg-white mx-auto rounded-[28px] min-w-[700px] overflow-x-auto">
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

      <MdCancel
        fontSize={24}
        onClick={close}
        className="cursor-pointer text-gray-500 hover:text-gray-700 absolute top-4 right-4"
      />

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <Loader />
        </div>
      ) : (
        <div>
          {/* Heading */}
          <p className="text-2xl font-semibold text-center text-[#65A143] mb-6 mt-2">
            Tyre Fitment Details -{" "}
            {isFetchComplete && tyreFitments.length === 0
              ? "Details not found"
              : tyreFitments[0]?.vehicle_no}
          </p>

          {/* Export Button */}
          <div className="flex justify-end mb-2">
            <button className="bg-[#333333] text-white text-[14px] py-2 px-4 rounded-md flex items-center gap-2 hover:bg-green-600 transition">
              <PiExportBold size={20} />
              <span>Export</span>
            </button>
          </div>

          {/* Tyre Fitment Table */}
          {tyreFitments.length > 0 ? (
            <div className="rounded-[10px] shadow-[2px_2px_15px_0px_rgba(0,0,0,0.25)] scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300">
            <table className="min-w-full bg-white border border-gray-200 rounded-[10px]">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <td className="py-2 px-4 text-left border-b font-outfit text-[#727272] font-normal text-[14px] leading-[21.42px]">#</td>
                  <td className="py-2 px-4 text-left border-b font-outfit text-[#727272] font-normal text-[14px] leading-[21.42px]">Position</td>
                  <td className="py-2 px-4 text-left border-b font-outfit text-[#727272] font-normal text-[14px] leading-[21.42px]">Tyre No.</td>
                  <td className="py-2 px-4 text-left border-b font-outfit text-[#727272] font-normal text-[14px] leading-[21.42px]">Make</td>
                  <td className="py-2 px-4 text-left border-b font-outfit text-[#727272] font-normal text-[14px] leading-[21.42px]">Model</td>
                  <td className="py-2 px-4 text-left border-b font-outfit text-[#727272] font-normal text-[14px] leading-[21.42px]">Radial/Nylon</td>
                  <td className="py-2 px-4 text-left border-b font-outfit text-[#727272] font-normal text-[14px] leading-[21.42px]">Size</td>
                  <td className="py-2 px-4 text-left border-b font-outfit text-[#727272] font-normal text-[14px] leading-[21.42px]">Retread / Fresh</td>
                </tr>
              </thead>
              <tbody>
                {tyreFitments.map((tyre, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4 font-outfit text-[#333333] font-normal text-[14px] leading-[21.42px]">{index + 1}</td>
                    <td 
                className="py-2 text-center px-4 font-outfit text-[#333333] font-normal text-[14px] leading-[21.42px] rounded-[10px]"
                style={{ color: setTyreColor(parseInt(tyre.position.split("")[0], 10)) }}
            >
                {tyre.position}
            </td>
            <td className="py-2 px-4 text-green-600 font-outfit font-normal text-[14px] leading-[21.42px] cursor-pointer" onClick={() => showTyreJourney(tyre.id, tyre.serial_no)}>
                      {tyre.serial_no}
                    </td>
                    <td className="py-2 px-4 font-outfit text-[#333333] font-normal text-[14px] leading-[21.42px]">{tyre.brand_name}</td>
                    <td className="py-2 px-4 font-outfit text-[#333333] font-normal text-[14px] leading-[21.42px]">{tyre.model_name}</td>
                    <td className="py-2 px-4 font-outfit text-[#333333] font-normal text-[14px] leading-[21.42px]">{tyre.construction_type}</td>
                    <td className="py-2 px-4 font-outfit text-[#333333] font-normal text-[14px] leading-[21.42px]">{tyre.tyre_size}</td>
                    <td className="py-2 px-4">{tyre.product_category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          ) : (
            isFetchComplete && (
              <p className="text-center text-red-500 mt-4">No tyre fitment data found.</p>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default TyreFitment;
