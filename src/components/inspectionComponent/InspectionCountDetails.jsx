import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MdCancel } from 'react-icons/md';
import { PiExportBold } from 'react-icons/pi';
import InspectionTyreFitmentDetails from './InspectionTyreFitmentDetails';
import Loader from "../common/Loader"
import { useSelector } from 'react-redux';

function InspectionCountDetails({close , vehicleId}) {

  const apiKey = useSelector((state)=> state.user.user.data.api_key)


  
    const [inspectionData, setInspectionData] = useState([]);
    const [inspectionId, setInspectionId] = useState();
    const [tyreFitmentDetails , setTyreFitmentDetails] = useState([]);
    const [vehicleNo, setVehicleNo] = useState();
    const [loading, setLoading] = useState(true);  

    const url = "https://newstaging.regripindia.com/api";

    const fetchVehicleInspectionData = async () => {
      setLoading(true); // Start loader
      try {
        const formData = new FormData();
        formData.append("vehicle_id", vehicleId);

        const details = await axios.post(
          `${url}/inspection-vehicle-data`,
          formData,
          {
            headers: {
              Authorization: apiKey,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setInspectionData(details.data.data);
      } catch (error) {
        console.error("Error fetching vehicle Inspection data:", error);
      } finally {
        setLoading(false); // Stop loader after fetching data
      }
    };

    useEffect(() => {
      fetchVehicleInspectionData();
    }, []);

    const showInspectionTyreFitmentDetails = (id , vehicleNo)=>{
      setInspectionId(id);
      setVehicleNo(vehicleNo);
    }

    const closeInspectionTyreFitmentDetails = ()=>{
      setInspectionId(null);
      setVehicleNo();
    }

    return (
        <div className="font-inter relative p-5 w-[90%] bg-white mx-auto rounded-[28px] min-w-[700px] overflow-x-auto">
          {/* Background Overlay */}
          {inspectionId !== null && inspectionId !== undefined && (
            <div className="fixed inset-0 bg-[rgba(0,0,0,0.2)] z-30"></div>
          )}

          {/* Loader */}
          {loading && (
            <div className="fixed inset-0 flex items-center justify-center bg-[rgba(255,255,255,0.8)] z-50">
              <Loader />
            </div>
          )}

          {/* AddVehicle Component */}
          {inspectionId !== null && inspectionId !== undefined && (
            <div className="fixed left-0 right-0 top-5 flex items-center justify-center z-40 min-w-[700px] overflow-x-auto">
              <div className="bg-white w-[80%] max-w-[1145px] h-auto min-h-[500px] min-w-[700px] overflow-x-auto rounded-[28px] shadow-lg">
                <InspectionTyreFitmentDetails close={closeInspectionTyreFitmentDetails} inspectionId={inspectionId} vehicleNo={vehicleNo}/>
              </div>
            </div>
          )}

          <MdCancel
            fontSize={24}
            onClick={close}
            className="cursor-pointer text-gray-500 hover:text-gray-700 absolute top-4 right-4"
          />
          <p className="text-2xl font-semibold text-center text-[#65A143] mb-6 mt-2">
            Inspection Count Details 
          </p>
          <div className="flex justify-end mb-2">
            <button className="bg-[#333333] text-white text-[14px] py-2 px-4 rounded-md flex items-center gap-2 hover:bg-green-600 transition">
              <PiExportBold size={20} />
              <span>Export</span>
            </button>
          </div>
          <div className="rounded-[10px] shadow-[2px_2px_15px_0px_rgba(0,0,0,0.25)]">
            <table className="min-w-full bg-white border border-gray-200 rounded-[10px]">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <td className="py-2 px-4 text-left border-b font-outfit text-[#727272] font-normal text-[14px] leading-[21.42px]">#</td>
                  <td className="py-2 px-4 text-left border-b font-outfit text-[#727272] font-normal text-[14px] leading-[21.42px]">Insp Date</td>
                  <td className="py-2 px-6 text-left border-b font-outfit text-[#727272] font-normal text-[14px] leading-[21.42px]">Vehicle No.</td>
                  <td className="py-2 px-2 text-left border-b font-outfit text-[#727272] font-normal text-[14px] leading-[21.42px]">Prev km</td>
                  <td className="py-2 px-4 text-left border-b font-outfit text-[#727272] font-normal text-[14px] leading-[21.42px]">Curr. km</td>
                  <td className="py-2 px-0 text-left border-b font-outfit text-[#727272] font-normal text-[14px] leading-[21.42px]">Km Running </td>
                  <td className="py-2 px-2 text-left border-b font-outfit text-[#727272] font-normal text-[14px] leading-[21.42px]">Tyres</td>
                </tr>
              </thead>
              <tbody>
                {inspectionData.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-2 px-4 text-center text-[#333333]">
                      Data not found
                    </td>
                  </tr>
                ) : (
                  inspectionData.map((tyre, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2 px-4 font-outfit text-[#333333] font-normal text-[14px] leading-[21.42px]">
                        {index + 1}
                      </td>
                      <td className="py-2 px-4 font-outfit text-[#333333] font-normal text-[14px] leading-[21.42px]">
                        {tyre.inspection_date}
                      </td>
                      <td className="py-2 px-4  font-outfit  font-normal text-[14px] leading-[21.42px] cursor-pointer">
                        {tyre.vehicle_no}
                      </td>
                      <td className="py-2 px-4 font-outfit text-[#333333] font-normal text-[14px] leading-[21.42px]">0</td>
                      <td className="py-2 px-8 font-outfit text-[#333333] font-normal text-[14px] leading-[21.42px]">
                        {tyre.km_total_reading}
                      </td>
                      <td className="py-2 px-4">{tyre.km_total_reading}</td>
                      <td className="py-2 text-green-600 px-4 cursor-pointer" onClick={() => showInspectionTyreFitmentDetails(tyre.id , tyre.vehicle_no)}>
                        {tyre.tyreCount}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      );
}

export default InspectionCountDetails;
