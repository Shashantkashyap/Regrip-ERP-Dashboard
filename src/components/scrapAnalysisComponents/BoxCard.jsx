import React from "react";

const BoxCard = ({ title1, title2, data1, data2 }) => {
  return (
    <div className="p-4 rounded-lg border border-gray-200 bg-white max-w-fit">
      {/* First Data Block */}
      <div className="mb-6">
        <p className="font-semibold text-gray-800">{title1}</p>
        <div className="flex justify-start items-center gap-4 mt-3">
          {data1?.map((data, idx) => (
            <div
              className="bg-gray-100 rounded-lg px-4 py-2 w-[150px] text-center"
              key={idx}
            >
              <p className="text-green-600 text-2xl font-semibold">
                {data.value}{" "}
                <span className="text-xs text-gray-500">{data.unit}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Second Data Block */}
      <div className="mb-6">
        <p className="font-semibold text-gray-800">{title2}</p>
        <div className="flex justify-start items-center gap-4 mt-3">
          {data2?.map((data, idx) => (
            <div
              className="bg-gray-100 rounded-lg px-4 py-2 w-[150px] text-center"
              key={idx}
            >
              <p className="text-green-600 text-2xl font-semibold">
                {data.value}{" "}
                <span className="text-xs text-gray-500">{data.unit}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default BoxCard;
