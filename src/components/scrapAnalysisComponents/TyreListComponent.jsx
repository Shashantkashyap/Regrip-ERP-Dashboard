import React, { useCallback, useEffect, useState } from "react";
import "../scrollBar.css";
import { IoFilterSharp } from "react-icons/io5";
import { FaDownload, FaSort } from "react-icons/fa";
import { useDispatch } from "react-redux";
import ScrapAnalysisFilter from "./ScrapAnalysisFilter";
import axios from "axios";
import { setScrapFilterFormData } from "../../redux/Slices/scrapFilter";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import TyreJourney from "../masterComponent/TyreJourney";
import toast from "react-hot-toast";

const TyreListComponent = () => {

  const url = "https://newstaging.regripindia.com/api"
  const knowUser = JSON.parse(localStorage.getItem("userData"));
  const apiKey = knowUser.data.api_key


  const [showTyreScrapFilter, setShowshowTyreScrapFilter] = useState(false);
  const dispatch = useDispatch();
  const [filterData, setFilterData] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [tyreId, setTyreId] = useState(null); 
  const [tyreNo, setTyreNo] = useState();

  const handleFilterToggle = () => {
    setShowshowTyreScrapFilter(!showTyreScrapFilter);
  };

  const handleSubmit = (data) => {
    setFilterData(data);
    handleFilterToggle();
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const tyres = [
    {
      tyreNo: "CZ89031132021",
      size: "1000-20",
      make: "Bridgestone",
      model: "JUH",
      purchaseDate: "13 Sep 23",
      fitmentDate: "14 Sep 23",
      stdNsd: 12.5,
      scrapNsd: 4.0,
      scrapDate: "15 Sep 24",
      reasonOfScrap: "Tyre Burst",
    },
    {
      tyreNo: "CZ89031132021",
      size: "1000-20",
      make: "Bridgestone",
      model: "JUH",
      purchaseDate: "13 Sep 23",
      fitmentDate: "14 Sep 23",
      stdNsd: 12.5,
      scrapNsd: 4.0,
      scrapDate: "15 Sep 24",
      reasonOfScrap: "Tyre Burst",
    },
    {
      tyreNo: "CZ89031132021",
      size: "1000-20",
      make: "Bridgestone",
      model: "JUH",
      purchaseDate: "13 Sep 23",
      fitmentDate: "14 Sep 23",
      stdNsd: 12.5,
      scrapNsd: 4.0,
      scrapDate: "15 Sep 24",
      reasonOfScrap: "Tyre Burst",
    },
    {
      tyreNo: "CZ89031132021",
      size: "1000-20",
      make: "Bridgestone",
      model: "JUH",
      purchaseDate: "13 Sep 23",
      fitmentDate: "14 Sep 23",
      stdNsd: 12.5,
      scrapNsd: 4.0,
      scrapDate: "15 Sep 24",
      reasonOfScrap: "Tyre Burst",
    },
    {
      tyreNo: "CZ89031132021",
      size: "1000-20",
      make: "Bridgestone",
      model: "JUH",
      purchaseDate: "13 Sep 23",
      fitmentDate: "14 Sep 23",
      stdNsd: 12.5,
      scrapNsd: 4.0,
      scrapDate: "15 Sep 24",
      reasonOfScrap: "Tyre Burst",
    },
    {
      tyreNo: "CZ89031132021",
      size: "1000-20",
      make: "Bridgestone",
      model: "JUH",
      purchaseDate: "13 Sep 23",
      fitmentDate: "14 Sep 23",
      stdNsd: 12.5,
      scrapNsd: 4.0,
      scrapDate: "15 Sep 24",
      reasonOfScrap: "Tyre Burst",
    },
    {
      tyreNo: "CZ89031132021",
      size: "1000-20",
      make: "Bridgestone",
      model: "JUH",
      purchaseDate: "13 Sep 23",
      fitmentDate: "14 Sep 23",
      stdNsd: 12.5,
      scrapNsd: 4.0,
      scrapDate: "15 Sep 24",
      reasonOfScrap: "Tyre Burst",
    },
    {
      tyreNo: "CZ89031132021",
      size: "1000-20",
      make: "Bridgestone",
      model: "JUH",
      purchaseDate: "13 Sep 23",
      fitmentDate: "14 Sep 23",
      stdNsd: 12.5,
      scrapNsd: 4.0,
      scrapDate: "15 Sep 24",
      reasonOfScrap: "Tyre Burst",
    },
    {
      tyreNo: "CZ89031132021",
      size: "1000-20",
      make: "Bridgestone",
      model: "JUH",
      purchaseDate: "13 Sep 23",
      fitmentDate: "14 Sep 23",
      stdNsd: 12.5,
      scrapNsd: 4.0,
      scrapDate: "15 Sep 24",
      reasonOfScrap: "Tyre Burst",
    },
    {
      tyreNo: "CZ89031132021",
      size: "1000-20",
      make: "Bridgestone",
      model: "JUH",
      purchaseDate: "13 Sep 23",
      fitmentDate: "14 Sep 23",
      stdNsd: 12.5,
      scrapNsd: 4.0,
      scrapDate: "15 Sep 24",
      reasonOfScrap: "Tyre Burst",
    },
    // Add more tyre objects as necessary...
  ];

  const fetchTyrePurchaseData = useCallback(
    async (filterData = {}) => {
      setLoading(true);
      setError(null);

      try {
        // send filter data object in the body and take it from body
        // const response = await axios.post(
        //   ``,
        //   {...filterData, report_type},
        //   {
        //     headers: {
        //       "Content-Type": "multipart/form-data",
        //       Authorization: "google",
        //     },
        //   }
        // );

        console.log("Response Submitted", filterData);
        // const responseData = response.data;
        // console.log("Response Data: ", responseData);
        // setTotalPages(responseData.pagination.total);
        // setData(responseData.data || []);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    },
    [filterData]
  );

  const handleSort = (data) => {
    const { sortField, sortOrder } = data;
    dispatch(setScrapFilterFormData({ sortOrder, sortField }));
  };

  

  useEffect(() => {
    fetchTyrePurchaseData(filterData);
  }, [fetchTyrePurchaseData, filterData]);


  const showTyreJourney = (id, serial_no) => {
    setTyreId(id);
    setTyreNo(serial_no);
  };

  const closeTyreJourney = () => {
    setTyreId(null);
  };

  const getScrapReport = async(tyreNo)=>{

    try {
      const formData = new FormData();
      formData.append('serial_no', tyreNo); // Use the provided id

      // Replace `${url}` and `apiKey` with your actual values
      const response = await axios.post(`${url}/get-scrap-report`, formData, {
          headers: {
              Authorization: apiKey,
              'Content-Type': 'multipart/form-data',
          }
      });

      console.log(response)

      //const pdfUrl = response.data.return_data.pdfUrl;
      
      // if (pdfUrl) {
      //     // Open the PDF URL in a new tab
      //     window.open(`${pdfUrl}`, '_blank');
      // } else {
      //     toast.error('No PDF URL returned.');
      // }
  } catch (error) {
      console.error('Error downloading report:', error);
      toast.error('Inspection report not available');
  }

  }

  return (
    <div className="max-w-full overflow-x-auto">
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="flex justify-between w-full items-center">
          <h2 className="text-lg font-semibold mb-4">Tyre List</h2>
          <button onClick={handleFilterToggle} className="flex">
            <IoFilterSharp className="-translate-x-4 text-xl -translate-y-3 cursor-pointer" />
            <span className="font-semibold text-md -translate-x-2  -translate-y-4">
              Filter
            </span>
          </button>
        </div>

        {showTyreScrapFilter && (
          <div className="z-30">
            <ScrapAnalysisFilter
              isVisible={showTyreScrapFilter}
              onClose={handleFilterToggle}
              onSubmit={handleSubmit}
              setFilterData={setFilterData}
            />
          </div>
        )}


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



        <div className="max-h-[400px] overflow-y-auto overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 rounded-lg font-outfit">
          <table className="min-w-full bg-white rounded-xl font-normal whitespace-nowrap table-auto">
            <thead className="bg-[#FFF] border-b sticky top-0 rounded-lg">
              <tr>
                <td className="px-4 py-2 text-sm font-semibold text-gray-600 text-center">
                  #
                </td>
                <td className="px-4 py-2 text-sm font-semibold text-gray-600 text-center">
                  Tyre S.No.
                </td>
                <td className="px-4 py-2 text-sm font-semibold text-gray-600 text-center">
                 Size
                  {/* <button
                    onClick={() =>
                      setSortOrder((prev) => {
                        if (prev.sortOrder === "asc") {
                          return { sortField: "size", sortOrder: "desc" };
                        }
                        return { sortField: "size", sortOrder: "asc" };
                      })
                    }
                  >
                    <FaSort className="inline ml-1 mr-1 cursor-pointer" />
                  </button> */}
                </td>
                <td className="px-4 py-2 text-sm font-semibold text-gray-600 text-center">
                  Make
                </td>
                <td className="px-4 py-2 text-sm font-semibold text-gray-600 text-center">
                  Model
                </td>
                <th className="px-4 py-2 text-sm font-semibold text-gray-600 text-center">
                  Purchase Date
                  {/* <button
                    onClick={() =>
                      setSortOrder((prev) => {
                        console.log(prev);

                        if (prev.sortOrder === "asc") {
                          return {
                            sortField: "purchase_date",
                            sortOrder: "desc",
                          };
                        }
                        return { sortField: "purchase_date", sortOrder: "asc" };
                      })
                    }
                  >
                    <FaSort className="inline ml-1 mr-1 cursor-pointer" />
                  </button> */}
                </th>
                <td className="px-4 py-2 text-sm font-semibold text-gray-600 text-center">
                  Fitment Date
                  {/* <button onClick={() => handleSort()}>
                    <FaSort className="inline ml-1 mr-1 cursor-pointer" />
                  </button> */}
                </td>
                <td className="px-4 py-2 text-sm font-semibold text-gray-600 text-center">
                  Std. NSD
                  {/* <button onClick={() => handleSort()}>
                    <FaSort className="inline ml-1 mr-1 cursor-pointer" />
                  </button> */}
                </td>
                <td className="px-4 py-2 text-sm font-semibold text-gray-600 text-center">
                  Scrap NSD
                  {/* <button onClick={() => handleSort()}>
                    <FaSort className="inline ml-1 mr-1 cursor-pointer" />
                  </button> */}
                </td>
                <td className="px-4 py-2 text-sm font-semibold text-gray-600 text-center">
                  Scrap Date
                 
                </td>
                <th className="px-4 py-2 text-sm font-semibold text-gray-600 text-center">
                  Reason of Scrap
                </th>
                <td className="px-4 py-2 text-sm font-semibold text-gray-600 text-center">
                Image
                </td>
                <td className="px-4 py-2 text-sm font-semibold text-gray-600 text-center">
                Report
                </td>
              </tr>
            </thead>
            <tbody className="rounded-lg">
              {tyres.map((tyre, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-100 transition-all"
                >
                  <td className="px-4 py-2 text-sm text-gray-700 text-center">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 text-sm  text-center text-[#65A948] cursor-pointer " onClick={() => showTyreJourney( 3070, "70509053322")}>
                    {tyre.tyreNo}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 text-center">
                    {tyre.size}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 text-center">
                    {tyre.make}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 text-center">
                    {tyre.model}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 text-center">
                    {tyre.purchaseDate}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 text-center">
                    {tyre.fitmentDate}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 text-center">
                    {tyre.stdNsd.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 text-center">
                    {tyre.scrapNsd.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 text-center">
                    {tyre.scrapDate}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 text-center">
                    {tyre.reasonOfScrap}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 text-center">
                    {tyre.image}
                  </td>
                  
                  <td className="px-8 py-2 text-sm text-gray-700 text-center cursor-pointer" onClick={()=>getScrapReport("70509053322")}>
                  <FaDownload  color="green"/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 px-4 py-2 bg-[#F7F7F7] rounded-b-lg">
          <p className="text-[14px] font-outfit font-normal leading-[22.4px] text-[#4E4F54]">
            Showing {(currentPage - 1) * 10 + 1}-
            {Math.min(currentPage * 10, totalRecords)} of {totalRecords} items
          </p>
          <div className="flex items-center gap-4">
            <div>
              <select
                value={currentPage}
                onChange={(e) => handlePageChange(Number(e.target.value))}
                className="px-1 py-1 rounded-md border-[1px] border-gray-300"
              >
                {pageNumbers.map((page) => (
                  <option key={page} value={page}>
                    Page {page}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-3 ">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-gray-300 p-2 rounded-md text-white hover:bg-green-600 cursor-pointer"
              >
                <MdKeyboardArrowLeft />
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="bg-gray-300 p-2 rounded-md text-white hover:bg-green-600 cursor-pointer"
              >
                <MdKeyboardArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TyreListComponent;
