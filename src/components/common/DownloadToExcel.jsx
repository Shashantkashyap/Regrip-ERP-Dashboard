import React from 'react';
import * as XLSX from 'xlsx';

const DownloadToExcel = ({ data, fileName, selectedFields }) => {
  const handleExport = () => {
    // Filter the data to only include the selected fields
    const filteredData = data.map((item) => {
      const filteredItem = {};
      selectedFields.forEach((field) => {
        filteredItem[field] = item[field]; // Add only the required fields
      });
      return filteredItem;
    });

    // Create a new workbook and worksheet with the filtered data
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Write the file
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  return (
    <button onClick={handleExport}>
      Download
    </button>
  );
};

export default DownloadToExcel;
