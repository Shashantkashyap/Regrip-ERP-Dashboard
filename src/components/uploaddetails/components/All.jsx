import React from 'react'
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

function UploadTable() {
  return (
   <>
    <div className='overflow-y-auto  max-h-[300px] scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-white'>
       <table className="w-full ">
            <thead className="  ">
              <tr className=" text-[#727272]  font-normal text-[15px] leading-[21.42px]">
                <th className="font-normal bg-[#f2efef]  rounded-tl-[20px] text-center py-[15px] ps-[40px]  ">
                  #
                </th>
                <th className="font-normal bg-[#f2efef]   text-center py-[15px] ps-[40px]  ">
                  Tyre SN
                </th>
                <th className="font-normal bg-[#f2efef]  rounded-tr-[20px] text-center py-[15px] ps-[40px]  ">
                 Matched Or Not
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b  font-normal text-[14px]  leading-[21.42px] text-[#333333] border-gray-200">
                <td className="text-center py-[15px] ps-[40px] "> 1</td>
                <td className="text-center py-[15px] ps-[40px]">
                  CP1069875225
                </td>
                <td className="text-center py-[15px] ps-[40px]">  
                     <DoneIcon style={{ color: 'green', marginRight: '5px' }} />
                </td>
              </tr>
              <tr className="border-b  font-normal text-[14px]  leading-[21.42px] text-[#333333] border-gray-200">
                <td className="text-center py-[15px] ps-[40px] "> 1</td>
                <td className="text-center py-[15px] ps-[40px]">
                  CP1069875225
                </td>
                <td className="text-center py-[15px] ps-[40px]">  
                     <CloseIcon style={{ color: 'red', marginRight: '5px' }} />
                </td>
                
              </tr>
              <tr className=" font-normal border-b   text-[14px]  leading-[21.42px] text-[#333333] border-gray-200">
                <td className="text-center py-[15px] ps-[40px] "> 1</td>
                <td className="text-center py-[15px] ps-[40px] ">
                  CP1069875225
                </td>
                <td className="text-center py-[15px] ps-[40px]">  
                     <DoneIcon style={{ color: 'green', marginRight: '5px' }} />
                </td>
              </tr>
              <tr className=" font-normal border-b   text-[14px]  leading-[21.42px] text-[#333333] border-gray-200">
                <td className="text-center py-[15px] ps-[40px] "> 1</td>
                <td className="text-center py-[15px] ps-[40px] ">
                  CP1069875225
                </td>
                <td className="text-center py-[15px] ps-[40px]">  
                     <DoneIcon style={{ color: 'green', marginRight: '5px' }} />
                </td>
              </tr>
              
              
              
             
            </tbody>
          </table>
    </div>
   </>
  )
}

export default UploadTable
