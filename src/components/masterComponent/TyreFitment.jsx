import React, { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { PiExportBold } from "react-icons/pi";
import TyreJourney from "./TyreJourney";
import axios from "axios";
import Loader from "../common/Loader"; // Assuming you have a Loader component
import "../scrollBar.css";
import DownloadToExcel from "../common/DownloadToExcel";
import DownloadToPDF from "../common/DownloadToPdf";

function TyreFitment({ close, vehicle }) {
  const knowUser = JSON.parse(localStorage.getItem("userData"));
  const apiKey = knowUser.data.api_key;

  const [tyreId, setTyreId] = useState(null);
  const [tyreFitments, setTyreFitment] = useState([]);
  const [tyreNo, setTyreNo] = useState();
  const [loading, setLoading] = useState(false); // State to handle loader
  const [isFetchComplete, setIsFetchComplete] = useState(false); // Tracks if the fetch has been completed
  const [vehicleFitmentTime, setVehicleFitmentTime] = useState(1); // 1 for Past, 0 for Present
  const [vehiclePastData, setVehiclePastData] = useState([]);
  const [downloadToggle , setDownloadToggle] = useState("DownloadToExcel")

  const url = "https://staging.regripindia.com/api";
  const url2 = "https://newstaging.regripindia.com/api";

  const fetchTyreFitmentData = async () => {
    try {
      setLoading(true); // Start loading
      const formData = new FormData();
      formData.append("vehicle_id", vehicle);

      const details = await axios.post(`${url}/vm-vehicle-details`, formData, {
        headers: {
          Authorization: apiKey,
          "Content-Type": "multipart/form-data",
        },
      });

      setTyreFitment(details.data.vehicle_tyres);
    } catch (error) {
      console.error("Error fetching tyre fitment data:", error);
    } finally {
      setLoading(false); // Stop loader when fetch is complete
      setIsFetchComplete(true); // Mark fetch as complete
    }
  };

  const fetchvehiclePastTyreFitmentData = async () => {
    try {
      setLoading(true); // Start loading
      const formData = new FormData();
      formData.append("vehicle_id", vehicle);

      const details = await axios.post(`${url2}/vehicle-past-tyres`, formData, {
        headers: {
          Authorization: apiKey,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(details);

      setVehiclePastData(details.data.data);
    } catch (error) {
      console.error("Error fetching tyre fitment data:", error);
    } finally {
      setLoading(false); // Stop loader when fetch is complete
      setIsFetchComplete(true); // Mark fetch as complete
    }
  };
  const handleSelectChange = (event) => {
    setDownloadToggle(event.target.value); // Update state based on selected option
  };
  const selectedFields = ["position","serial_no","brand_name","model_name","construction_type","tyre_size","product_category","tyre_status"]


  useEffect(() => {
    fetchTyreFitmentData();
    fetchvehiclePastTyreFitmentData();
  }, []);

  const showTyreJourney = (id, serial_no) => {
    setTyreId(id);
    setTyreNo(serial_no);
  };

  const closeTyreJourney = () => {
    setTyreId(null);
  };

  function formatDate(dateString) {
    // Create a new Date object from the provided date string
    const date = new Date(dateString);

    // Get the day, month, and year
    const day = String(date.getDate()).padStart(2, "0"); // Ensure two digits
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1
    const year = date.getFullYear();

    // Return the formatted date
    return `${day}-${month}-${year}`;
  }

  const setTyreColor = (num) => {
    const colors = {
      1: "#FF0000", // Red
      2: "#0000FF", // Blue
      3: "#008000", // Green
      4: "#A52A2A", // Yellow
      5: "#FFA500", // Orange
      6: "#800080", // Purple
      7: "#00FFFF", // Cyan
      8: "#FFC0CB", // Pink
      9: "#A52A2A", // Brown
      10: "#808080", // Gray
    };
    return colors[num] || "#00000"; // Return white if num not found
  };

  const dataToDisplay =
    vehicleFitmentTime === 1 ? tyreFitments : vehiclePastData; // Switch based on the selected time

  return (
    <div className="font-inter relative p-5 w-[90%] bg-white mx-auto rounded-[28px] min-w-[700px] overflow-x-auto">
      {tyreId !== null && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] z-30"></div>
      )}

      {tyreId !== null && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-40 min-w-[700px] overflow-x-auto">
          <div className="bg-white w-[80%] max-w-[1145px] h-[600px] min-h-[500px] min-w-[700px] overflow-x-auto rounded-[28px] shadow-lg">
            <TyreJourney
              close={closeTyreJourney}
              tyreId={tyreId}
              tyreNo={tyreNo}
            />
          </div>
        </div>
      )}

      <MdCancel
        fontSize={24}
        onClick={close}
        className="cursor-pointer text-gray-500 hover:text-gray-700 absolute top-4 right-4"
      />

      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <Loader />
        </div>
      ) : (
        <div>
          <p className="text-2xl font-semibold text-center text-[#65A143] mb-6 mt-2">
            Tyre Fitment Details -{" "}
            {isFetchComplete && dataToDisplay.length === 0
              ? "Details not found"
              : dataToDisplay[0]?.vehicle_no}
          </p>

          <div className="flex justify-end mb-2 gap-2">
            <div className="flex gap-2">
              {/* Present Button */}
              <button
                onClick={() => setVehicleFitmentTime(1)}
                className={`${
                  vehicleFitmentTime == 1 ? "bg-green-300" : "bg-gray-100"
                } text-black py-2 px-6 rounded-md shadow-md font-medium hover:scale-[1.01] transition-all duration-300`}
              >
                Present
              </button>

              {/* Past Button */}
              <button
                onClick={() => setVehicleFitmentTime(0)}
                className={`${
                  vehicleFitmentTime == 0 ? "bg-green-300" : "bg-gray-100"
                } text-black py-2 px-6 rounded-md shadow-md font-medium hover:scale-[1.01] transition-all duration-300`}
              >
                Past
              </button>
            </div>

            {/* Download Button */}
            <button className="w-auto px-[5px]  py-[5px]  mb-[10px]  rounded-[10px] text-[14px] flex gap-1 items-center border-[1px]">
      <span>
        <PiExportBold />
      </span>
      <div>
        <select 
          name="" 
          id="" 
          className="w-[90%]pe-[5px] me-[10px] focus:outline-none" 
          onChange={handleSelectChange} // Handle change here
        >
          <option value="DownloadToExcel">Excel</option>
          <option value="DownloadToPDF">PDF</option>
        </select>
      </div>

      {/* Conditional rendering based on the selected download type */}
      {downloadToggle === "DownloadToExcel" ? (
        <p>
          <DownloadToExcel 
            data={dataToDisplay} 
            fileName="vehicleFitment" 
            selectedFields={selectedFields} 
          />
        </p>
      ) : downloadToggle === "DownloadToPDF" ? (
        <p>
          <DownloadToPDF 
            data={dataToDisplay} 
            fileName="vehicleFitment" 
            selectedFields={selectedFields} 
          />
        </p>
      ) : null}
    </button>
          </div>

          {loading === true ? (
            <Loader />
          ) : dataToDisplay.length > 0 ?
           (
            <div className="rounded-[10px] shadow-[2px_2px_15px_0px_rgba(0,0,0,0.25)] scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300">
              <table className="min-w-full bg-white border border-gray-200 rounded-[10px] text-[14px] font-outfit">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <td className="py-2 px-4 text-left border-b">#</td>
                    <td className="py-2 px-4 text-left border-b">Position</td>
                    <td className="py-2 px-4 text-left border-b">Tyre No.</td>
                    <td className="py-2 px-4 text-left border-b">Make</td>
                    <td className="py-2 px-4 text-left border-b">Model</td>
                    <td className="py-2 px-4 text-left border-b">
                      Radial/Nylon
                    </td>
                    <td className="py-2 px-4 text-left border-b">Size</td>
                    <td className="py-2 px-4 text-left border-b">
                      Retread / Fresh
                    </td>
                    <td className="py-2 px-4 text-left border-b">Status</td>
                  </tr>
                </thead>
                <tbody>
                  {dataToDisplay.map((tyre, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2 px-4">{index + 1}</td>
                      <td
                        className="py-2 text-center px-4"
                        style={{
                          color: setTyreColor(
                            parseInt(tyre.position?.split("")[0], 10)
                          ),
                        }}
                      >
                        {tyre.position}
                      </td>
                      <td
                        className="py-2 px-4 text-[#65A143] cursor-pointer"
                        onClick={() =>
                          vehicleFitmentTime === 1
                            ? showTyreJourney(tyre.id, tyre.serial_no)
                            : showTyreJourney(tyre.tyre_id, tyre.serial_no)
                        }
                      >
                        {tyre.serial_no}
                      </td>
                      <td className="py-2 px-4">{tyre.brand_name}</td>
                      <td className="py-2 px-4">{tyre.model_name}</td>
                      <td className="py-2 px-4">{tyre.construction_type}</td>
                      <td className="py-2 px-4">{tyre.tyre_size}</td>
                      <td className="py-2 px-4">{tyre.product_category}</td>
                      <td className="py-2 px-4">
                        {tyre.tyre_status || "on-wheel"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            isFetchComplete && (
              <p className="text-center text-red-500 mt-4">
                No tyre fitment data found.
              </p>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default TyreFitment;
