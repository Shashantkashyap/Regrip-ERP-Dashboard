import React from 'react';

const ScrapCountCard = ({ title, count, tableHeaders, tableData, className = '' }) => {
  return (
    <div className={`p-4 rounded-xl border border-gray-200 bg-white w-[500px] h-[350px] ${className} overflow-y-auto overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 w-[100%]`}>
      {/* Title and Count */}
      <div className="flex justify-between items-center mb-4 px-1">
        <p className="font-semibold text-lg text-gray-800">{title}</p>
        <p className="text-green-600 text-xl font-semibold">{count}</p>
      </div>

      {/* Table */}
      <table className="w-full text-left font-normal font-outfit">
        <thead className="bg-gray-100">
          <tr>
            {tableHeaders.map((header, index) => (
              <td key={index} className="p-2 text-sm font-semibold text-gray-500 border-r-2 text-center">
                {header}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index} className="border-t">
              {row?.map((cell, i) => (
                <td key={i} className="p-2 text-sm text-gray-700 text-center">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScrapCountCard;
