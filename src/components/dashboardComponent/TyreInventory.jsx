import React from 'react';
import { useDispatch } from 'react-redux';
import { setTableFilter } from '../../redux/Slices/DasboardPopup';
import Loader from '../common/Loader';

function TyreInventory({ selectedTable, setSelectedTable, tyreInventory = [] , loading }) {

  const dispatch = useDispatch()

  const setCurrntStatus = async (status)=>{
    
    if(status == "Scrap"){
      localStorage.setItem("current_status","Scrap")
    }else{
      localStorage.setItem("current_status", "on-wheel")
      localStorage.setItem("product_category", status)
    }
  }

  
  // Calculate total sum of tyres safely
  const totalSum = Array.isArray(tyreInventory)
    ? tyreInventory.reduce((total, row) => total + (row.Total || 0), 0)
    : 0;

  return (
    <div className="bg-white px-4 py-3 rounded-[15px] border-[1px] w-[453px] min-w-[400px] font-outfit">
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center mb-40 ml-[300px]">
          <Loader />
        </div>
      ) : (
        <>
      <div className="flex justify-between">
        <p className="font-medium text-[22px] max-lg:text-[18px] leading-[27.72px] text-[#232323]">Tyre Inventory</p>
        <p className="font-semibold text-[22px] max-lg:text-[18px] leading-[27.72px] text-[#66A847]">
          {totalSum}
        </p>
      </div>

      {/* Dropdown Selector */}
      <div className="flex p-[5px_16px_5px_16px] bg-[#F8F8F8] rounded-[11px] mt-5 gap-8 items-center">
        <div className="mr-5">
          <select
            value={selectedTable}
            onChange={(e) => setSelectedTable(e.target.value)}
            className="rounded-[5px] text-[16px] font-normal leading-[20.16px] text-[#4D4D4D] bg-[#F8F8F8] py-1"
          >
            <option value="NSD" className="text-[14px] text-center">NSD</option>
            <option value="Brand" className="text-[14px] text-center">Brand</option>
          </select>
        </div>
        <div className="flex gap-[20px] w-full justify-around">
          <div className="font-normal text-[16px] max-lg:text-[14px] leading-[20.16px] text-center">New</div>
          <div className="font-normal text-[16px] max-lg:text-[14px] leading-[20.16px] text-center">Retread</div>
          <div className="font-normal text-[16px] max-lg:text-[14px] leading-[20.16px] text-center">Scrap</div>
          <div className="font-normal text-[16px] max-lg:text-[14px] leading-[20.16px] text-center">Total</div>
        </div>
      </div>

      {/* Conditionally Rendered Tables */}
      <div className="mt-2">
        {Array.isArray(tyreInventory) && tyreInventory.length > 0 ? (
          selectedTable === "NSD" ? (
            <table className="w-[96%] mx-auto max-lg:text-[14px] table-auto text-center border-collapse ">
              <tbody>
                {tyreInventory.map((row, index) => (
                  <tr key={index} className="text-center" onClick={()=>dispatch(setTableFilter({ key:"tyre_depth" , value: row.category}))} >    
                    <td className="px-2 pl-4 py-2 border-b text-left " >{row.category}</td>
                    <td className="px-1 py-2 border-b cursor-pointer" onClick={()=> setCurrntStatus("fresh")}>{row.New}</td>
                    <td className="px-4 py-2 border-b cursor-pointer" onClick={()=> setCurrntStatus("rtd")}>{row.Retread}</td>
                    <td className="px-3 pr-4 py-2 border-b cursor-pointer" onClick={()=> setCurrntStatus("Scrap")}>{row.Scrap}</td>
                    <td className="px-2 py-2 border-b">{row.Total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-[100%] max-lg:text-[14px] text-[14px] mx-auto table-auto text-center border-collapse ">
              <tbody>
                {tyreInventory.map((row, index) => (
                  <tr key={index} className="text-center" onClick={()=>dispatch(setTableFilter({ key:"brand_id" , value: row.id}))}>
                    <td className="px-2 pl-8  py-2 border-b text-left">{row.category}</td>
                    <td className="px-2 py-2 pr-6 border-b cursor-pointer" onClick={()=> setCurrntStatus("New")}>{row.New}</td>
                    <td className="px-4 py-2 pr-2 border-b cursor-pointer" onClick={()=> setCurrntStatus("Retreaded")}>{row.Retread}</td>
                    <td className="px-3 pl-6 py-2 border-b cursor-pointer" onClick={()=> setCurrntStatus("Scrap")}>{row.Scrap}</td>
                    <td className="px-2 py-2 pr-6 border-b ">{row.Total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        ) : (
          <p className="text-center text-gray-500">No data available</p>
        )}
      </div>
      </>
      )}
    </div>
  );
}

export default TyreInventory;
