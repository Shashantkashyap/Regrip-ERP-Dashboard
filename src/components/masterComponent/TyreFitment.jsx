import React, { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { PiExportBold } from "react-icons/pi";
import TyreJourney from "./TyreJourney";
import axios from "axios";
import { useSelector } from "react-redux";

function TyreFitment({ close, vehicle }) {

  const apiKey = useSelector((state)=> state.user.user.data.api_key)

  const [tyreId, setTyreId] = useState(null);
  const [tyreFitments, setTyreFitment] = useState([]);
  const [tyreNo, setTyreNo] = useState()

  console.log(vehicle)

  const url = "https://staging.regripindia.com/api";

  const fetchTyreFitmentData = async () => {
    try {
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
    }
  };

  useEffect(() => {
    
    fetchTyreFitmentData();
  }, []);

  
  const showTyreJourney = (id, serial_no) => {
    console.log("first")
    setTyreId(id);
    setTyreNo(serial_no)
  };

  const closeTyreJourney = () => {
    setTyreId(null);
  };

  console.log(tyreFitments)

  return (
    <div className="font-inter relative p-5 w-[90%] bg-white mx-auto rounded-[28px] min-w-[700px] overflow-x-auto">
      {/* Background Overlay */}
      {tyreId !== null && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.2)] z-30"></div>
      )}

      {/* AddVehicle Component */}
      {tyreId !== null && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-40 min-w-[700px] overflow-x-auto">
          <div className="bg-white w-[80%] max-w-[1145px]  h-auto min-h-[500px] min-w-[700px] overflow-x-auto rounded-[28px] shadow-lg">
            <TyreJourney close={closeTyreJourney} tyreId={tyreId} tyreNo= {tyreNo}/>
          </div>
        </div>
      )}

      <MdCancel
        fontSize={24}
        onClick={close}
        className="cursor-pointer text-gray-500 hover:text-gray-700 absolute top-4 right-4"
      />
      <p className="text-2xl font-semibold text-center text-[#65A143] mb-6 mt-2">
        Tyre Fitment Details - { tyreFitments.length !== 0  ? tyreFitments[0].vehicle_no : "Details not found"}
      </p>
      <div className="flex justify-end mb-2">
        <button className="bg-[#333333] text-white text-[14px] py-2 px-4 rounded-md flex items-center gap-2 hover:bg-green-600 transition">
          <PiExportBold size={20} />
          <span>Export</span>
        </button>
      </div>
      <div className="rounded-[10px] shadow-[2px_2px_15px_0px_rgba(0,0,0,0.25)]">
        <table className="min-w-full  bg-white border border-gray-200 rounded-[10px]">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <td className="py-2 px-4 text-left border-b font-outfit text-[#727272] font-normal text-[14px] leading-[21.42px]">#</td>
              <td className="py-2 px-4 text-left border-b font-outfit text-[#727272] font-normal text-[14px] leading-[21.42px]">Position</td>
              <td className="py-2 px-8 text-left border-b font-outfit text-[#727272] font-normal text-[14px] leading-[21.42px]">Tyre No.</td>
              <td className="py-2 px-4 text-left border-b font-outfit text-[#727272] font-normal text-[14px] leading-[21.42px]">Make</td>
              <td className="py-2 px-8 text-left border-b font-outfit text-[#727272] font-normal text-[14px] leading-[21.42px]">Model</td>
              <td className="py-2 px-8 text-left border-b font-outfit text-[#727272] font-normal text-[14px] leading-[21.42px]">Radial/Nylon</td>
              <td className="py-2 px-8 text-left border-b font-outfit text-[#727272] font-normal text-[14px] leading-[21.42px]">Size</td>
              
              <td className="py-2 px-0 text-left border-b font-outfit text-[#727272] font-normal text-[14px] leading-[21.42px]">Retread / Fresh</td>
            </tr>
          </thead>
          <tbody>
            {tyreFitments.length > 0 &&
            tyreFitments.map((tyre, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4 font-outfit text-[#333333] font-normal text-[14px] leading-[21.42px]">{index + 1}</td>
                <td className="py-2 px-4 font-outfit text-[#333333] font-normal text-[14px] leading-[21.42px]">{tyre.position}</td>
                <td className="py-2 px-4 text-green-600 font-outfit  font-normal text-[14px] leading-[21.42px] cursor-pointer" onClick={() => showTyreJourney(tyre.id, tyre.serial_no)}>{tyre.serial_no}</td>
                <td className="py-2 px-4 font-outfit text-[#333333] font-normal text-[14px] leading-[21.42px]">{tyre.brand_name}</td>
                <td className="py-2 px-8 font-outfit text-[#333333] font-normal text-[14px] leading-[21.42px]">{tyre.model_name}</td>
                <td className="py-2 px-8 font-outfit text-[#333333] font-normal text-[14px] leading-[21.42px]">{tyre.construction_type}</td>
                <td className="py-2 px-8 font-outfit text-[#333333] font-normal text-[14px] leading-[21.42px]">{tyre.tyre_size}</td>
                
                <td className="py-2 px-4">{tyre.product_category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TyreFitment;
