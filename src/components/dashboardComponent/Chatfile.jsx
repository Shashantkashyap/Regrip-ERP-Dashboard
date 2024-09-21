import React from "react";
import Chart1 from "./Chart1";
import Chart2 from "./Chart2";

function Chatfile() {
  return (
    <div>
      <div className="flex flex-col p-4  mt-10 bg-white rounded-[15px]">
        <div className="px-5 mt-1">
          <p className="  font-medium text-[22px] leading-[27.72px] text-[#232323]">
            Tyre Purchases
          </p>
        </div>
        <div className="flex  px-5 gap-4   mt-5 bg-white">
          <div className="w-[45%] min-w-[400px] bg-white rounded-[15px] p-[2px] border-[1px]">
            <Chart1 />
          </div>
          <div className="w-[55%] min-w-[500px] bg-white rounded-[15px] p-[2px] border-[1px]">
            <Chart2 />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatfile;
