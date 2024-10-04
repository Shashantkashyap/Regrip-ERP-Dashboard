import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { PiExportBold } from "react-icons/pi";
import Loader from "../common/Loader";
import { useSelector } from "react-redux";

function InspectionTyreFitmentDetails({ inspectionId, close, vehicleNo }) {

 // const apiKey = useSelector((state)=> state.user.user.data.api_key)

 const knowUser = JSON.parse(localStorage.getItem("userData"));
  const apiKey = knowUser.data.api_key

  const [tyreFitments, setTyreFitment] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state

  const url = "https://newstaging.regripindia.com/api";

  const fetchTyreFitmentData = async () => {
    try {
      setLoading(true); // Set loading to true when data fetching starts
      const formData = new FormData();
      formData.append("inspection_id", inspectionId);
      console.log(inspectionId)

      const details = await axios.post(`${url}/inspection-tyre-details`, formData, {
        headers: {
          Authorization: apiKey,
          "Content-Type": "multipart/form-data",
        },
      });

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

  console.log(tyreFitments)

  return (
    <div className="font-inter relative p-5 w-[150%] bg-white mx-auto rounded-[28px] min-w-[900px] max-h-[80vh] overflow-hidden">
      
      <MdCancel
        fontSize={24}
        onClick={close}
        className="cursor-pointer absolute text-gray-500 hover:text-gray-700  top-4 right-5"
      />
      <p className="text-2xl font-semibold text-center text-[#65A143] mb-6 mt-2">
        Tyre Fitment Details -{" "}
        {vehicleNo === null || vehicleNo === undefined ? ("") : (
            <span>{vehicleNo}</span>
        )}
      </p>
      <div className="flex justify-end mb-2">
        <button className="bg-[#333333] text-white text-[14px] py-2 px-4 rounded-md flex items-center gap-2 hover:bg-green-600 transition">
          <PiExportBold size={20} />
          <span>Download</span>
        </button>
      </div>
      
      {/* Render Loader while loading */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <Loader /> {/* This is your Loader component */}
        </div>
      ) : (
        <div className="rounded-[10px] shadow-[2px_2px_15px_0px_rgba(0,0,0,0.25)] max-h-[60vh] overflow-y-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-[10px]">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <td className="py-2 px-2 text-left border-b font-outfit text-[#727272] font-normal text-[14px] leading-[21.42px]">#</td>
                <td className="py-2 px-2 text-left border-b font-outfit text-[#727272] font-normal text-[14px] leading-[21.42px]">Position</td>
                <td className="py-2 px-2 text-left border-b font-outfit text-[#727272] font-normal text-[14px] leading-[21.42px]">Tyre No.</td>
                <td className="py-2 px-4 text-left border-b font-outfit text-[#727272] font-normal text-[14px] leading-[21.42px]">Make</td>
                <td className="py-2 px-4 text-left border-b font-outfit text-[#727272] font-normal text-[14px] leading-[21.42px]">Model</td>
                <td className="py-2 px-0 text-left border-b font-outfit text-[#727272] font-normal text-[14px] leading-[21.42px]">Retread / Fresh</td>
                <td className="py-2 px-0 text-left border-b font-outfit text-[#727272] font-normal text-[14px] leading-[21.42px]">Std_nsd</td>
                <td className="py-2 px-4 text-left border-b font-outfit text-[#727272] font-normal text-[14px] leading-[21.42px]">Avg. Nsd</td>
                <td className="py-2 px-4 text-left border-b font-outfit text-[#727272] font-normal text-[14px] leading-[21.42px]">Remaining Life</td>
                
                <td className="py-2 px-4 text-left border-b font-outfit text-[#727272] font-normal text-[14px] leading-[21.42px]">PSI</td>
                <td className="py-2 px-4 text-left border-b font-outfit text-[#727272] font-normal text-[14px] leading-[21.42px]">Nsd1</td>
                <td className="py-2 px-4 text-left border-b font-outfit text-[#727272] font-normal text-[14px] leading-[21.42px]">Nsd2</td>
                <td className="py-2 px-4 text-left border-b font-outfit text-[#727272] font-normal text-[14px] leading-[21.42px]">Nsd3</td>
                <td className="py-2 px-4 text-left border-b font-outfit text-[#727272] font-normal text-[14px] leading-[21.42px]">Nsd4</td>
                
              </tr>
            </thead>
            <tbody>
              {tyreFitments.length === 0 ? (
                <tr>
                  <td colSpan="12" className="py-2 px-4 text-center text-[#333333]">Data not found</td>
                </tr>
              ) : (
                tyreFitments.map((tyre, index) => (
                  <tr key={tyre.id} className="border-b">
                    <td className="py-2 px-4 font-outfit text-[#333333] font-normal text-[14px] leading-[21.42px]">
                      {index + 1}
                    </td>
                    <td className="py-2 px-2 font-outfit text-[#333333] font-normal text-[14px] leading-[21.42px]">
                      {tyre.tyre_position}
                    </td>
                    <td className="py-2 px-2 text-[#333333] font-outfit font-normal text-[14px] leading-[21.42px] cursor-pointer">
                      {tyre.serial_no}
                    </td>
                    <td className="py-2 px-2 font-outfit text-[#333333] font-normal text-[14px] leading-[21.42px]">
                      {tyre.brand_name}
                    </td>
                    <td className="py-2 px-4 font-outfit text-[#333333] font-normal text-[14px] leading-[21.42px]">
                      {tyre.model_name}
                    </td>
                    <td className="py-2 px-4">{tyre.product_category}</td>
                    <td className="py-2 px-4 font-outfit text-[#333333] font-normal text-[14px] leading-[21.42px]">
                      {tyre.standard}
                    </td>
                    <td className="py-2 px-4 font-outfit text-[#333333] font-normal text-[14px] leading-[21.42px]">
                      {tyre.avg_nsd}
                    </td>
                    <td className="py-2 px-4 font-outfit text-[#333333] font-normal text-[14px] leading-[21.42px]">
                      {
                       Math.floor( 100 - ((tyre.standard - tyre.avg_nsd)/tyre.standard)/100)
                      } %
                    </td>
                    <td className="py-2 px-4 font-outfit text-[#333333] font-normal text-[14px] leading-[21.42px]">
                      {tyre.psi}
                    </td>
                    <td className="py-2 px-4 font-outfit text-[#333333] font-normal text-[14px] leading-[21.42px]">
                      {tyre.nsd1}
                    </td>
                    <td className="py-2 px-4 font-outfit text-[#333333] font-normal text-[14px] leading-[21.42px]">
                      {tyre.nsd2}
                    </td>
                    <td className="py-2 px-4 font-outfit text-[#333333] font-normal text-[14px] leading-[21.42px]">
                      {tyre.nsd3}
                    </td>
                    <td className="py-2 px-4 font-outfit text-[#333333] font-normal text-[14px] leading-[21.42px]">
                      {tyre.nsd4}
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
