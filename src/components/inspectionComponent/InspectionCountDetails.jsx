import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdCancel } from 'react-icons/md';
import { IoCloudDownloadOutline } from 'react-icons/io5';
import InspectionTyreFitmentDetails from './InspectionTyreFitmentDetails';
import Loader from '../common/Loader';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';  // Import react-hot-toast
import { saveAs } from 'file-saver';

function InspectionCountDetails({ close, vehicleId }) {
  //const apiKey = useSelector((state) => state.user.user.data.api_key);
  const knowUser = JSON.parse(localStorage.getItem("userData"));
  const apiKey = knowUser.data.api_key
  
  const [inspectionData, setInspectionData] = useState([]);
  const [inspectionId, setInspectionId] = useState();
  const [tyreFitmentDetails, setTyreFitmentDetails] = useState([]);
  const [vehicleNo, setVehicleNo] = useState();
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false); // State for download loader

  const url = 'https://newstaging.regripindia.com/api';

  const fetchVehicleInspectionData = async () => {
    setLoading(true); // Start loader
    try {
      const formData = new FormData();
      formData.append('vehicle_id', vehicleId);

      const details = await axios.post(`${url}/inspection-vehicle-data`, formData, {
        headers: {
          Authorization: apiKey,
          'Content-Type': 'multipart/form-data',
        },
      });

      

      setInspectionData(details.data.data);
    } catch (error) {
      console.error('Error fetching vehicle Inspection data:', error);
    } finally {
      setLoading(false); // Stop loader after fetching data
    }
  };

  useEffect(() => {
    fetchVehicleInspectionData();
  }, []);

  const showInspectionTyreFitmentDetails = (id, vehicleNo) => {
    setInspectionId(id);
    setVehicleNo(vehicleNo);
  };

  const closeInspectionTyreFitmentDetails = () => {
    setInspectionId(null);
    setVehicleNo();
  };

  const fetchDownloadReport = async (id, veh_num) => {
    setDownloading(true); // Start download loader
    try {
        const formData = new FormData();
        formData.append('inspection_id', id); // Use the provided id

        // Replace `${url}` and `apiKey` with your actual values
        const response = await axios.post(`${url}/inspection-data`, formData, {
            headers: {
                Authorization: apiKey,
                'Content-Type': 'multipart/form-data',
            }
        });

        const pdfUrl = response.data.return_data.pdfUrl;

        if (pdfUrl) {
            // Open the PDF URL in a new tab
            window.open(`${pdfUrl}`, '_blank');
        } else {
            toast.error('No PDF URL returned.');
        }
    } catch (error) {
        console.error('Error downloading report:', error);
        toast.error('Inspection report not available');
    } finally {
        setDownloading(false); // Stop download loader
    }
};

function formatDate(dateString) {
  const date = new Date(dateString);

  // Get month short name (e.g. "Aug")
  const monthShort = date.toLocaleString('default', { month: 'short' });

  // Get day (e.g. 8)
  const day = date.getDate();

  // Get year in two digits (e.g. "24" for 2024)
  const year = date.getFullYear().toString().slice(-2);

  // Return formatted date
  return `${monthShort} ${day}, ${year}`;
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
            <InspectionTyreFitmentDetails close={closeInspectionTyreFitmentDetails} inspectionId={inspectionId} vehicleNo={vehicleNo} />
          </div>
        </div>
      )}

      <MdCancel fontSize={24} onClick={close} className="cursor-pointer text-gray-500 hover:text-gray-700 absolute top-4 right-4" />
      <p className="text-2xl font-semibold text-center text-[#65A143] mb-6 mt-2">
        Inspection Count Details
      </p>
      <div className="flex justify-end mb-2"></div>
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
              <td className="py-2 px-2 text-left border-b font-outfit text-[#727272] font-normal text-[14px] leading-[21.42px]">Download</td>
            </tr>
          </thead>
          <tbody>
            {inspectionData.length === 0 ? (
              <tr>
                <td colSpan="8" className="py-2 px-4 text-center text-[#333333]">Data not found</td>
              </tr>
            ) : (
              inspectionData.map((tyre, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-4 font-outfit text-[#333333] font-normal text-[14px] leading-[21.42px]">{index + 1}</td>
                  <td className="py-2 px-4 font-outfit text-[#333333] font-normal text-[14px] leading-[21.42px]">{formatDate(tyre.details[0].datetime_created)}</td>
                  <td className="py-2 px-4 font-outfit text-green-600 font-normal text-[14px] leading-[21.42px] cursor-pointer" onClick={() => showInspectionTyreFitmentDetails(tyre.details[0].inspection_id, tyre.details[0].vehicle_no)}>{tyre.details[0].vehicle_no}</td>
                  <td className="py-2 px-4 font-outfit text-[#333333] font-normal text-[14px] leading-[21.42px]">{tyre.details[0].km_total_reading}</td>
                  <td className="py-2 px-8 font-outfit text-[#333333] font-normal text-[14px] leading-[21.42px]">{tyre.details[0].vehicle_km}</td>
                  <td className="py-2 px-8 font-outfit text-[#333333] font-normal text-[14px] leading-[21.42px]">{tyre.details[0].vehicle_km - tyre.details[0].km_total_reading}</td>
                  <td className="py-2 text-green-600 px-4 cursor-pointer" onClick={() => showInspectionTyreFitmentDetails(tyre.details[0].inspection_id, tyre.details[0].vehicle_no)}>{tyre.count}</td>
                  <td className="py-2 px-4 font-outfit font-normal text-[14px] leading-[21.42px] cursor-pointer" onClick={() => fetchDownloadReport(tyre.details[0].inspection_id,tyre.details[0].vehicle_no)}>
                    <IoCloudDownloadOutline fontSize={20} />
                    {/* {downloading && <Loader />}  Loader while downloading */}
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
