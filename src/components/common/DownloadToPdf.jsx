import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const DownloadToPDF = ({ data, fileName, selectedFields, logoUrl = "https://res.cloudinary.com/dtbydmj92/image/upload/v1728387555/Regrip_logo_1_ppi9nx.png", companyName = "Regrip" }) => {
  const handleExport = async () => {
    const doc = new jsPDF({
      unit: 'pt',  // Use points for better control over spacing
      format: 'a4', // Standard page size
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const logoWidth = 100; // Adjust logo width
    const logoHeight = 60; // Adjust logo height
    const margin = 20; // Margin/padding for the logo and text

    // Vertical center alignment calculation
    const verticalCenter = (logoHeight + 40) / 2; // Adjust based on the height of the elements

    // Add the company logo to the PDF on the left
    if (logoUrl) {
      try {
        const img = new Image();
        img.src = logoUrl;
        await img.decode(); // Wait for the image to load

        // Add the image (x, y, width, height)
        doc.addImage(img, 'PNG', margin, margin, logoWidth, logoHeight); // Positioning with padding
      } catch (error) {
        console.error('Error loading image:', error);
      }
    }

   
    // Add a line for separation
    doc.setLineWidth(0.5);
    doc.line(margin, logoHeight + margin * 2, pageWidth - margin, logoHeight + margin * 2); // Full-width line

    // Filter the data to only include the selected fields
    const filteredData = data.map((item) => {
      const filteredItem = {};
      selectedFields.forEach((field) => {
        filteredItem[field] = item[field]; // Add only the required fields
      });
      return filteredItem;
    });

    // Extract headers and rows for the PDF table
    const headers = selectedFields.map((field) => field);
    const rows = filteredData.map((item) =>
      selectedFields.map((field) => item[field])
    );

    // Add the table to the PDF using autoTable
    doc.autoTable({
      head: [headers],
      body: rows,
      startY: logoHeight + margin * 3, // Table starts after the header with padding
      margin: { left: 10, right: 10 }
    });

    // Save the PDF file
    doc.save(`${fileName}.pdf`);
  };

  return (
    <button onClick={handleExport} className='bg-green-200 py-1 px-4 rounded-xl' >
      Download
    </button>
  );
};

export default DownloadToPDF;
