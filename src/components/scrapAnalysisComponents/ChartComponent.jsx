import React from 'react';
import { useState } from "react";

function ChartComponent({title = '', children, className = '', count = 0}) {

  return (
    <div className={`${className} bg-white h-[300px] flex justify-center items-start rounded-xl border border-gray-200 flex-col mt-4 md:w-[100%] w-[100%]`}>
      <div className="py-4 pt-12 flex justify-center items-center w-[100%] h-[90%]">
        {children}
      </div>
    </div>
  );
}

export default ChartComponent;
