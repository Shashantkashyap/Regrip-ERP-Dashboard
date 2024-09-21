import React from 'react';
import { setTableFilter } from '../../redux/Slices/DasboardPopup';
import { useDispatch } from 'react-redux';

function Summary({ summaryItems , handleClick }) {

  const dispatch = useDispatch()

  console.log(summaryItems)

  return (
    <div className="w-[495px] min-w-[300px] bg-white p-[15px_15px_30px_15px] rounded-[15px] border-[1px] font-outfit cursor-pointer">
      <p className="font-semibold text-[22px] max-lg:text-[18px] text-gray-800 mb-4">Summary</p>
      <div className="grid grid-cols-3 gap-2">
        {summaryItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-1 bg-[#F8F8F8] px-4 py-3 rounded-lg hover:shadow-lg transition-shadow duration-300"
            onClick={() => {
              // Dispatch the action to set the filter
              dispatch(setTableFilter({ key: item.key, value: item.value2 }));
              
              // Call handleClick after dispatching the action
              handleClick();
            }}
          >
            <p className="font-bold text-[21px] max-lg:text-[16px] text-[#66A847]">{item.value}</p>
            <p className="font-normal text-[13px] max-lg:text-[12px] text-gray-600">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Summary;
