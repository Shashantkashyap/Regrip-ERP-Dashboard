import React, { useEffect } from 'react';

const ScrapCountCard = ({ title, count, tableHeaders, setTyreListFilter, tyreListFilter, tableData, className = '' }) => {

  return (
    <div className={`p-4 rounded-xl border border-gray-200 bg-white w-[500px] h-[350px] ${className} overflow-y-auto overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 w-[100%]`}>
      {/* Title and Count */}
      <div className="flex justify-between items-center mb-4 px-1">
        <p className="font-semibold text-lg text-gray-800">{title}</p>
        <p className="text-green-600 text-xl font-semibold">{count}</p>
      </div>

      {/* Table */}
      <table className="w-full text-left font-semibold">
        <thead className="bg-gray-100">
          <tr>
            {tableHeaders.map((header, index) => (
              <th key={index} className="p-2 text-sm font-semibold text-gray-500 border-r-2 text-center">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData ? tableData.map((row, index) => {
              return (
                <tr key={index} className="border-t">
                  {Object.entries(row).map((cell, i) => {
                    const [key, value] = cell;
                    if (key === "brand_name" || key === "vehicle_no" || key === "defect_type_name") {
                      return (
                        <td key={i} className="p-2 text-sm text-[#16A34A] text-center cursor-pointer underline" onClick={(e) => setTyreListFilter({...tyreListFilter, key: value})}>
                          {value}
                        </td>
                      );
                    } else {
                      return (
                        <td key={i} className="p-2 text-sm text-gray-700 text-center">
                          {value}
                        </td>
                      );
                    }
                  })}
                </tr>
              );
          }) : <h1 className='text-center'>No Data Available</h1>}
        </tbody>
      </table>
    </div>
  );
};

export default ScrapCountCard;
