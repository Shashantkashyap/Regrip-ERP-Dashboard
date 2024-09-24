import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { PiExportBold } from "react-icons/pi";
import { useSelector } from "react-redux";
import Loader from "../common/Loader"; // Assuming you have a Loader component

function TyreJourney({ tyreId, close, tyreNo }) {
  const apiKey = useSelector((state) => state.user.user.data.api_key);

  const [tyreHistory, setTyreHistory] = useState();
  const [tyreImgDetails, setTyreImgDetails] = useState()
  const [loading, setLoading] = useState(true); // State to handle loading
  const [isFetchComplete, setIsFetchComplete] = useState(false); // Track fetch completion

  const url = "https://newstaging.regripindia.com/api";

  const fetchTyreHistoryData = async () => {
    try {
      setLoading(true); // Start loader
      const formData = new FormData();
      formData.append("tyre_id", tyreId);

      const details = await axios.post(`${url}/get-vehicle-journey`, formData, {
        headers: {
          Authorization: apiKey,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(details);
      setTyreImgDetails(details.data.tyreDetails)
      setTyreHistory(details.data.tyreHistory);
    } catch (error) {
      console.error("Error fetching tyre history data:", error);
    } finally {
      setLoading(false); // Stop loader
      setIsFetchComplete(true); // Mark fetch as complete
    }
  };

  useEffect(() => {
    fetchTyreHistoryData();
  }, []);

  // Function to format the date
  function formatDate(datetime_created) {
    const date = new Date(datetime_created);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  return (
    <div className="relative bg-white rounded-[28px] p-8">
      <MdCancel
        fontSize={24}
        onClick={close}
        className="cursor-pointer text-gray-500 hover:text-gray-700 absolute top-4 right-4"
      />

<div className="mb-4 text-2xl font-semibold leading-[38.73px] text-[#65A143] text-center flex items-center justify-center gap-5">
  <p>Tyre History: {tyreNo}</p>
  
  {tyreImgDetails && tyreImgDetails.length > 0 && (
    <div className="w-[305px] h-[100px]">
      <img 
        src={tyreImgDetails[0].image_url} 
        alt="Tyre Image" 
        className="w-full h-full object-contain"
      />
    </div>
  )}
</div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex justify-end mb-2">
            <button className="bg-[#333333] text-white text-[14px] py-2 px-4 rounded-md flex items-center gap-2 hover:bg-green-600 transition">
              <PiExportBold size={20} />
              <span>Export</span>
            </button>
          </div>

          <div
            className="overflow-x-auto "
            style={{
              boxShadow: "0px 14px 33.8px rgba(0, 0, 0, 0.33)",
            }}
          >
            <table
              className="min-w-full w-[130%] h-auto bg-white border border-gray-200"
              style={{
                boxShadow: "0px 14px 33.8px rgba(0, 0, 0, 0.33)",
              }}
            >
              <thead>
                <tr className="bg-gray-100 border-b">
                  <td className="text-left px-4 py-2 font-outfit text-[14px] font-normal leading-[21.42px] text-[#727272]">#</td>
                  <td className="text-left px-4 py-2 font-outfit text-[14px] font-normal leading-[21.42px] text-[#727272]">Date</td>
                  <td className="text-left px-4 py-2 font-outfit text-[14px] font-normal leading-[21.42px] text-[#727272]">Activity</td>
                  <td className="text-left px-4 py-2 font-outfit text-[14px] font-normal leading-[21.42px] text-[#727272]">Vehicle No.</td>
                  <td className="text-left px-4 py-2 font-outfit text-[14px] font-normal leading-[21.42px] text-[#727272]">Position</td>
                  <td className="text-left px-4 py-2 font-outfit text-[14px] font-normal leading-[21.42px] text-[#727272]">Odometer</td>
                  <td className="text-left px-4 py-2 font-outfit text-[14px] font-normal leading-[21.42px] text-[#727272]">Running Km</td>
                  <td className="text-left px-4 py-2 font-outfit text-[14px] font-normal leading-[21.42px] text-[#727272]">Std Depth</td>
                  <td className="text-left px-4 py-2 font-outfit text-[14px] font-normal leading-[21.42px] text-[#727272]">Avg nsd</td>
                  <td className="text-left px-4 py-2 font-outfit text-[14px] font-normal leading-[21.42px] text-[#727272]">Status</td>
                  <td className="text-left px-4 py-2 font-outfit text-[14px] font-normal leading-[21.42px] text-[#727272]">Fresh/Retread</td>
                  <td className="text-left px-4 py-2 font-outfit text-[14px] font-normal leading-[21.42px] text-[#727272]">Nsd 1</td>
                  <td className="text-left px-4 py-2 font-outfit text-[14px] font-normal leading-[21.42px] text-[#727272]">Nsd 2</td>
                  <td className="text-left px-4 py-2 font-outfit text-[14px] font-normal leading-[21.42px] text-[#727272]">Nsd 3</td>
                  <td className="text-left px-4 py-2 font-outfit text-[14px] font-normal leading-[21.42px] text-[#727272]">Nsd 4</td>
                </tr>
              </thead>
              <tbody>
                {isFetchComplete && tyreHistory?.length === 0 ? (
                  <tr>
                    <td colSpan="14" className="text-center py-4 text-red-500">No tyre history data found.</td>
                  </tr>
                ) : (
                  tyreHistory?.map((entry, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-2 font-outfit text-[14px] leading-[21.42px] text-[#333333] font-normal">
                        {index + 1}
                      </td>
                      <td className="px-4 py-2 font-outfit text-[14px] leading-[21.42px] text-[#333333] font-normal">
                        {formatDate(entry.datetime_created)}
                      </td>
                      <td className="px-4 py-2 font-outfit text-[14px] leading-[21.42px] text-[#333333] font-normal">
                        {entry.action}
                      </td>
                      <td className="px-4 py-2 font-outfit text-[14px] leading-[21.42px] text-[#333333] font-normal">
                        {entry.vehicle_number}
                      </td>
                      <td className="px-4 py-2 font-outfit text-[14px] leading-[21.42px] text-[#333333] font-normal">
                        {entry.position}
                      </td>
                      <td className="px-4 py-2 font-outfit text-[14px] leading-[21.42px] text-[#333333] font-normal">
                        {entry.tyre_km}
                      </td>
                      <td className="px-4 py-2 font-outfit text-[14px] leading-[21.42px] text-[#333333] font-normal">
                        {entry.km_reading}
                      </td>
                      <td className="px-4 py-2 font-outfit text-[14px] leading-[21.42px] text-[#333333] font-normal">
                        {entry.stdDepth || "20"}
                      </td>
                      <td className="px-4 py-2 font-outfit text-[14px] leading-[21.42px] text-[#333333] font-normal">
                        {(entry.nsd1 + entry.nsd2 + entry.nsd3 + entry.nsd4) / 4}
                      </td>
                      <td className="px-4 py-2 font-outfit text-[14px] leading-[21.42px] text-[#333333] font-normal">
                        {entry.tyre_status}
                      </td>
                      <td className="px-4 py-2 font-outfit text-[14px] leading-[21.42px] text-[#333333] font-normal">
                        {entry.freshRetread || "Fresh"}
                      </td>
                      <td className="px-4 py-2 font-outfit text-[14px] leading-[21.42px] text-[#333333] font-normal">
                        {entry.nsd1}
                      </td>
                      <td className="px-4 py-2 font-outfit text-[14px] leading-[21.42px] text-[#333333] font-normal">
                        {entry.nsd2}
                      </td>
                      <td className="px-4 py-2 font-outfit text-[14px] leading-[21.42px] text-[#333333] font-normal">
                        {entry.nsd3}
                      </td>
                      <td className="px-4 py-2 font-outfit text-[14px] leading-[21.42px] text-[#333333] font-normal">
                        {entry.nsd4}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default TyreJourney;
