import React, { useState } from "react";
import attachimg from "../../assets/icons/attachfile.png";
import docfile from "../../assets/icons/Doc.png";
import UploadTable from "./components/MissMatched";
import Matched from './components/Matched'
import All from "./components/All";

function UploadDetails() {
  const [tableData, setTableData] = useState(1);

  return (
    <>
      <div className="w-[750px] font-outfit p-[40px] mx-auto border h-[auto] rounded-[20px]">
        <div className="text-center">
          <h1 className="mb-[10px] text-left ms-[160px]">Upload Details *</h1>
          <div className="flex items-center mx-auto w-[350px] space-x-4 border rounded-[10px] p-[10px]">
            <label
              htmlFor="file-upload"
              className="bg-[#dad9d9] text-[12px] text-[gray] p-[2px] px-[10px] rounded-lg cursor-pointer"
            >
              Choose File
            </label>
            <input id="file-upload" type="file" className="hidden" />
            <div className="flex justify-between w-[200px] items-center">
              <span className="text-gray-500 text-[12px]">{"No File"}</span>
              <img src={attachimg} alt="" className="w-[10px] h-[16px]" />
            </div>
          </div>
        </div>
        <h6 className="text-center text-gray-400 text-[14px] underline mt-[10px]">
          Download Excel Template
        </h6>
        <div className="flex text-[15px] items-center justify-center gap-[40px] mt-[50px]">
          <div>
            <input
              type="radio"
              name="tyreType"
              id="mismatched"
              checked={tableData === 1}
              onChange={() => setTableData(1)}
            />
            <label htmlFor="mismatched"> Mismatched Tyres (10)</label>
          </div>
          <div>
            <input
              type="radio"
              name="tyreType"
              id="matched"
              checked={tableData === 2}
              onChange={() => setTableData(2)}
            />
            <label htmlFor="matched"> Matched Tyres (4)</label>
          </div>
          <div>
            <input
              type="radio"
              name="tyreType"
              id="all"
              checked={tableData === 3}
              onChange={() => setTableData(3)}
            />
            <label htmlFor="all"> All (14)</label>
          </div>
          <div>
            <button className="border py-[6px] flex justify-around items-center rounded-[10px] w-[150px]">
              <img src={docfile} className="w-[15px] h-[17px]" alt="" />
              Download
            </button>
          </div>
        </div>
        <div className="shadow-md w-[80%] rounded-[30px] h-auto mx-auto mt-[20px]">
          {tableData === 1 && <UploadTable />}
          {tableData === 2 && <Matched/>}
          {tableData === 3 && <All />}
        </div>
        <button className="w-[150px] h-[40px] text-center border mt-[40px] text-white bg-[#65A948] mx-auto block">
          Submit
        </button>
      </div>
    </>
  );
}

export default UploadDetails;
