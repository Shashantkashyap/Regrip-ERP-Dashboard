import React from 'react';
import { useDispatch } from 'react-redux';
import { setTableFilter } from '../../redux/Slices/DasboardPopup';
import Loader from '../common/Loader';

function Alerts({ alertItems, loading }) {
  const dispatch = useDispatch();
  
  return (
    <div className="w-[340px] min-w-[230px] bg-white px-[20px] rounded-[15px] border-[1px] font-outfit cursor-pointer">
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          {/* <Loader /> */}
        </div>
      ) : (
        <>
      <div className="font-semibold text-[22px] mt-2 max-lg:text-[18px] text-gray-800 mb-6">Alerts</div>
      <div className="flex flex-col gap-[15px]">
        {alertItems.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center"
            onClick={() => {
              // Dispatch the action to set the filter
              dispatch(setTableFilter({ key: item.key, value: item.value2 }));
              
             
            }}  
          >
            <div className="flex items-center gap-3">
              <div className={`w-[10px] h-[10px] rounded-full bg-[#DA4040] lg:flex hidden`}></div>
              <p className="font-normal text-[16px] max-lg:text-[14px] text-[#4D4D4D]">{item.label}</p>
            </div>
            <p className="px-[10px] py-[2px] rounded-full text-[14px] max-lg:text-[13px] font-semibold bg-[#FFE0E0] text-[#DA4040]">
              {item.value}
            </p>
          </div>
        ))}
      </div>
      </>
      )}
    </div>
  );
}

export default Alerts;
