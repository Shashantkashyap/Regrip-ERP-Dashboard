import React from "react";

function InvoiceDetails() {
  return (
    <>
      <div className="p-8 bg-[#F7F7F7] border rounded-[50px] shad overflow-x-auto relative">
        <h1 className="font-outfit font-semibold text-center text-[26px] leading-[36.31px] text-[#65A143]">
          Invoice Details
        </h1>
        <div className=" w-[80%] shadow-md rounded-[20px] mx-auto mt-[60px]   max-h-[500px] scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-white overflow-y-auto min-h-[400px] scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 py-[40px]">
          <table  className="w-full  font-outfit  ">
            <thead>
              <tr className="bg-[#f2efef]   text-[#727272] font-normal text-[15px] leading-[21.42px]">
                <th className="text-left font-normal  p-3">S.No.</th>
                <th className="text-left font-normal  p-3">Invoice Date</th>
                <th className="text-left font-normal  p-3">Invoice No.</th>
                <th className="text-left font-normal  p-3">Invoice Amount</th>
                <th className="text-left font-normal  p-3">Invoice </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[1px] font-normal text-[14px]  leading-[21.42px] text-[#333333] border-gray-200">
                <td className="text-left p-3 ps-[20px]">1</td>
                <td className="text-left p-3">15 Sep 24</td>
                <td className="text-left p-3">992817223</td>
                <td className="text-left p-3">10,000</td>
                <td><button className="bg-blue-300 text-white rounded-[20px] px-[20px] py-[3px]">Download</button></td>
              </tr>
              <tr className="border-b border-[1px] font-normal text-[14px]  leading-[21.42px] text-[#333333] border-gray-200">
                <td className="text-left p-3 ps-[20px]">1</td>
                <td className="text-left p-3">15 Sep 24</td>
                <td className="text-left p-3">992817223</td>
                <td className="text-left p-3">10,000</td>
                <td><button className="bg-blue-300 text-white rounded-[20px] px-[20px] py-[3px]">Download</button></td>
              </tr>  <tr className="border-b border-[1px] font-normal text-[14px]  leading-[21.42px] text-[#333333] border-gray-200">
                <td className="text-left p-3 ps-[20px]">1</td>
                <td className="text-left p-3">15 Sep 24</td>
                <td className="text-left p-3">992817223</td>
                <td className="text-left p-3">10,000</td>
                <td><button className="bg-blue-300 text-white rounded-[20px] px-[20px] py-[3px]">Download</button></td>
              </tr>  <tr className="border-b border-[1px] font-normal text-[14px]  leading-[21.42px] text-[#333333] border-gray-200">
                <td className="text-left p-3 ps-[20px]">1</td>
                <td className="text-left p-3">15 Sep 24</td>
                <td className="text-left p-3">992817223</td>
                <td className="text-left p-3">10,000</td>
                <td><button className="bg-blue-300 text-white rounded-[20px] px-[20px] py-[3px]">Download</button></td>
              </tr>  <tr className="border-b border-[1px] font-normal text-[14px]  leading-[21.42px] text-[#333333] border-gray-200">
                <td className="text-left p-3 ps-[20px]">1</td>
                <td className="text-left p-3">15 Sep 24</td>
                <td className="text-left p-3">992817223</td>
                <td className="text-left p-3">10,000</td>
                <td><button className="bg-blue-300 text-white rounded-[20px] px-[20px] py-[3px]">Download</button></td>
              </tr>  <tr className="border-b border-[1px] font-normal text-[14px]  leading-[21.42px] text-[#333333] border-gray-200">
                <td className="text-left p-3 ps-[20px]">1</td>
                <td className="text-left p-3">15 Sep 24</td>
                <td className="text-left p-3">992817223</td>
                <td className="text-left p-3">10,000</td>
                <td><button className="bg-blue-300 text-white rounded-[20px] px-[20px] py-[3px]">Download</button></td>
              </tr>  <tr className="border-b border-[1px] font-normal text-[14px]  leading-[21.42px] text-[#333333] border-gray-200">
                <td className="text-left p-3 ps-[20px]">1</td>
                <td className="text-left p-3">15 Sep 24</td>
                <td className="text-left p-3">992817223</td>
                <td className="text-left p-3">10,000</td>
                <td><button className="bg-blue-300 text-white rounded-[20px] px-[20px] py-[3px]">Download</button></td>
              </tr>  <tr className="border-b border-[1px] font-normal text-[14px]  leading-[21.42px] text-[#333333] border-gray-200">
                <td className="text-left p-3 ps-[20px]">1</td>
                <td className="text-left p-3">15 Sep 24</td>
                <td className="text-left p-3">992817223</td>
                <td className="text-left p-3">10,000</td>
                <td><button className="bg-blue-300 text-white rounded-[20px] px-[20px] py-[3px]">Download</button></td>
              </tr>
              
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default InvoiceDetails;
