import React, { useState } from 'react';
import { FiTruck } from 'react-icons/fi';
import { IoPersonOutline } from 'react-icons/io5';
import { MdCancel, MdFormatListNumbered, MdOutlineSpeed } from 'react-icons/md';

function AddVehicle({close}) {
    const [axel, setAxel] = useState(2);

    const axelArray = Array.from({ length: axel }, (_, index) => index + 1);

    return (
        <div className="font-inter  mx-auto py-6 px-12 rounded-lg ">
            <div className="flex  items-center mb-4">
          
          <MdCancel
            fontSize={24}
            onClick={close}
            className="cursor-pointer text-gray-500 hover:text-gray-700 absolute left-[85%]"
          />
        </div>
            <p className="text-center text-3xl font-semibold text-green-600 mb-6">Add Vehicle</p>
            <div className="flex text-[14px]">
                {/* Left */}
                <div className="flex flex-col font-outfit w-[60%] border-r-2 pr-8">
                    <div className="flex gap-6 mb-4">
                        <div className="flex flex-col w-1/2">
                            <label className="text-[15px] font-medium text-gray-600 mb-1">Vehicle Number</label>
                            <div className="flex items-center border rounded-lg px-3 py-2 bg-white">
                                <input type="text" className="flex-grow outline-none" />
                                <MdFormatListNumbered className="text-gray-400" />
                            </div>
                        </div>
                        <div className="flex flex-col w-1/2">
                            <label className="text-[15px] font-medium text-gray-600 mb-1">Select Vehicle</label>
                            <div className="flex items-center border rounded-lg px-3 py-2 bg-white">
                                <select className="flex-grow outline-none px-2 appearance-none">
                                    <option value="">Truck</option>
                                    <option value="">Bus</option>
                                    <option value="">Loader</option>
                                    <option value="">Tractor</option>
                                </select>
                                <FiTruck className="text-gray-400" />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-6 mb-4">
                        <div className="flex flex-col w-1/2">
                            <label className="text-[15px] font-medium text-gray-600 mb-1">Road Application</label>
                            <select className="border rounded-lg px-3 py-2 bg-white outline-none">
                                <option value="">ABC</option>
                                <option value="">DEF</option>
                                <option value="">GHI</option>
                            </select>
                        </div>
                        <div className="flex flex-col w-1/2">
                            <label className="text-[15px] font-medium text-gray-600 mb-1">Odometer Reading</label>
                            <div className="flex items-center border rounded-lg px-3 py-2 bg-white">
                                <input type="text" className="flex-grow outline-none" />
                                <MdOutlineSpeed className="text-gray-400" />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-6 mb-4">
                        <div className="flex flex-col w-1/2">
                            <label className="text-[15px] font-medium text-gray-600 mb-1">Manufacturer Name</label>
                            <div className="flex items-center border rounded-lg px-3 py-2 bg-white">
                                <select className="flex-grow outline-none px-2 appearance-none">
                                    <option value="">Tata</option>
                                    <option value="">Mahindra</option>
                                    <option value="">Volvo</option>
                                    <option value="">Mercedes</option>
                                </select>
                                <IoPersonOutline className="text-gray-400" />
                            </div>
                        </div>
                        <div className="flex flex-col w-1/2">
                            <label className="text-[15px] font-medium text-gray-600 mb-1">Manufacturer Year</label>
                            <div className="flex items-center border rounded-lg px-3 py-2 bg-white">
                                <input type="text" className="flex-grow outline-none" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col mb-4 w-1/2">
                        <label className="text-[15px] font-medium text-gray-600 mb-1">Model Name</label>
                        <div className="flex items-center border rounded-lg px-3 py-2 bg-white">
                            <input type="text" className="flex-grow outline-none" />
                        </div>
                    </div>
                    <div className="mt-6 text-center">
                <button className="px-6 py-2 bg-green-600 text-white rounded-lg  hover:bg-green-700 transition">
                    Submit
                </button>
            </div>
                </div>

                {/* Right */}
                <div className="w-[40%] pl-4 ">
                    <div className="mb-6">
                        <p className="text-lg font-medium text-gray-600 mb-2">Select Axel</p>
                        <div className="flex space-x-3 border px-3 rounded-[10.22px] w-[68%] text-[14px] py-1">
                            {[2, 3, 4, 5, 6].map(num => (
                                <p key={num}
                                   onClick={() => setAxel(num)}
                                   className={`cursor-pointer px-4 py-2  rounded-lg transition ${
                                       axel === num ? 'bg-green-500 text-white font-semibold' : ' text-gray-600'
                                   }`}>
                                    {num}
                                </p>
                            ))}
                        </div>
                    </div>

                    <div className=' rounded-md '>
                        <table className="border-collapse border border-gray-300  text-[14px] w-full bg-white">
                            <thead className="bg-gray-100">
                                <tr className='border text-[13px]'>
                                    <td className=" px-4 py-2">Axel</td>
                                    <td className=" pl-8 py-2 ">Wheels</td>
                                    <td className="px-9 py-2"> Pattern</td>
                                    <td className=" px-4 py-2">Horse/Trailer</td>
                                </tr>
                            </thead>
                            <tbody>
                                {axelArray.map((a, index) => (
                                    <tr key={index} className="hover:bg-gray-100">
                                        <td className="  px-4 py-1 border-b-[1px] border-gray-200">A{index + 1}</td>
                                        <td className="  px-4 py-1 border-b-[1px] border-gray-200">
                                            <input type="text" className="w-[100%] px- py-1 border rounded-md text-center" />
                                        </td>
                                        <td className=" px-0 py-1 border-b-[1px] border-gray-200">
                                            <select className="w-full px-2 py-1 border rounded-md">
                                                <option value="">qwerty</option>
                                                <option value="">poiuyt</option>
                                                <option value="">mnbvc</option>
                                            </select>
                                        </td>
                                        <td className=" pl-8 py-1 border-b-[1px] border-gray-200">
                                            <div className="flex flex-col justify-between">
                                                <div>
                                                    <input type="radio" name={`axelType${index}`} id={`horse${index}`} />
                                                    <label htmlFor={`horse${index}`} className="ml-1">Horse</label>
                                                </div>
                                                <div>
                                                    <input type="radio" name={`axelType${index}`} id={`trailer${index}`} />
                                                    <label htmlFor={`trailer${index}`} className="ml-1">Trailer</label>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div>
                            
                            <div className='flex gap-[10px] items-center mt-3'>
                                <label htmlFor="" className='text-[14px] leading-[18.9px] text-[#343232]'>Stepney Available ?</label>
                                <input type="checkbox" name="" id="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default AddVehicle;
