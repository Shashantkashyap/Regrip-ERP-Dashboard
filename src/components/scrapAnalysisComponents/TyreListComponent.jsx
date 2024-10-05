import React, { useCallback, useEffect, useState } from "react";
import "../scrollBar.css";
import { IoFilterSharp } from "react-icons/io5";
import { FaSort } from "react-icons/fa";
import { useDispatch } from "react-redux";
import ScrapAnalysisFilter from "./ScrapAnalysisFilter";
import axios from "axios";
import { setScrapFilterFormData } from "../../redux/Slices/scrapFilter";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import useScrapData from "../../custom-hooks/ScrapDataFetching";

const TyreListComponent = ({ data, tyreListFilter, currentPage, setCurrentPage, itemsPerPage, totalPages, totalCount, realCount, count, setTyreListFilter }) => {
  const [showTyreScrapFilter, setShowshowTyreScrapFilter] = useState(false);
  const [filterData, setFilterData] = useState("");

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
      setTyreListFilter({...tyreListFilter, page_no: newPage});
    }
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="max-w-full overflow-x-auto -translate-y-12">
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="flex justify-between w-full items-center">
          <h2 className="text-lg font-semibold mb-4">Tyre List ({realCount} / {count}) </h2>
          <button onClick={handleFilterToggle} className="flex">
            {/* <IoFilterSharp className="-translate-x-4 text-xl -translate-y-3 cursor-pointer" /> */}
            {/* <span className="font-semibold text-md -translate-x-2  -translate-y-4">
              Filter
            </span> */}
          </button>
        </div>

        {/* {showTyreScrapFilter && (
          <div className="z-30">
            <ScrapAnalysisFilter
              isVisible={showTyreScrapFilter}
              onClose={handleFilterToggle}
              onSubmit={handleSubmit}
              setFilterData={setFilterData}
            />
          </div>
        )} */}

        <div className="max-h-[400px] overflow-y-auto overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 rounded-lg">
          <table className="min-w-full bg-white rounded-xl font-semibold whitespace-nowrap table-auto">
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
                </td>
                <td className="px-4 py-2 text-sm font-semibold text-gray-600 text-center">
                  Make
                </td>
                <td className="px-4 py-2 text-sm font-semibold text-gray-600 text-center">
                  Model
                </td>
                <td className="px-4 py-2 text-sm font-semibold text-gray-600 text-center">
                  Std. NSD
                </td>
                <td className="px-4 py-2 text-sm font-semibold text-gray-600 text-center">
                  Scrap NSD
                </td>
                <th className="px-4 py-2 text-sm font-semibold text-gray-600 text-center">
                  Reason of Scrap
                </th>
                <td className="px-4 py-2 text-sm font-semibold text-gray-600 text-center">
                  Fitment Date
                </td>
                <td className="px-4 py-2 text-sm font-semibold text-gray-600 text-center">
                  Purchased Date
                </td>
                <td className="px-4 py-2 text-sm font-semibold text-gray-600 text-center">
                  Scrap Date
                </td>
                <td className="px-4 py-2 text-sm font-semibold text-gray-600 text-center">
                  Image
                </td>
              </tr>
            </thead>

            <tbody className="rounded-lg">
              {data?.map((tyre, index) => {
                // Filter actions for each relevant action type
                const fitmentAction = tyre.actions?.find(
                  (item) => item.action === "Fitment"
                );
                const purchasedAction = tyre.actions?.find(
                  (item) => item.action === "Purchased"
                );
                const removalAction = tyre.actions?.find(
                  (item) => item.action === "Removal" || item.action === "Scrap"
                );

                // console.log(fitmentAction, purchasedAction, removalAction);
                
                return (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-100 transition-all"
                  >
                    <td className="px-4 py-2 text-sm text-gray-700 text-center">
                      {index + 1 + ((currentPage - 1) * 10)}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700 text-center">
                      {tyre.serial_no}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700 text-center">
                      {tyre.tyre_size}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700 text-center">
                      {tyre.brand_name}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700 text-center">
                      {tyre.model_name}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700 text-center">
                      {tyre.standard_nsd}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700 text-center">
                      {tyre.scrap_nsd}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700 text-center">
                      {tyre.scrap_reason}
                    </td>
                    {/* Render Fitment Date */}
                    <td className="px-4 py-2 text-sm text-gray-700 text-center">
                      {fitmentAction
                        ? fitmentAction.action_date || fitmentAction.date
                        : "NA"}
                    </td>
                    {/* Render Purchased Date */}
                    <td className="px-4 py-2 text-sm text-gray-700 text-center">
                      {purchasedAction
                        ? purchasedAction.action_date || purchasedAction.date
                        : "NA"}
                    </td>
                    {/* Render Removal Date */}
                    <td className="px-4 py-2 text-sm text-gray-700 text-center">
                      {removalAction
                        ? removalAction.action_date || removalAction.date
                        : "NA"}
                    </td>
                    {/* Render Image */}
                    <td className="px-4 py-2 text-sm text-gray-700 text-center">
                      {tyre.image ? <img src={tyre.image} alt="Tyre" /> : "NA"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 px-4 py-2 bg-[#F7F7F7] rounded-b-lg">
          <p className="text-[14px] font-outfit font-normal leading-[22.4px] text-[#4E4F54]">
            Showing {(currentPage - 1) * 10 + 1} -
            {Math.min(currentPage * 10, totalCount)} of {totalCount} items
          </p>
          <div className="flex items-center gap-4">
            <div>
              <select
                value={currentPage}
                onChange={(e) => handlePageChange(Number(e.target.value))}
                className="px-1 py-1 rounded-md border-[1px] border-gray-300"
              >
                {pageNumbers?.map((page) => (
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
