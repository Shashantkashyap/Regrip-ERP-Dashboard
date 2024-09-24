import React from 'react';
import {
    Close
  } from "@mui/icons-material";

const ImageModal = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-2xl shadow-lg py-8 px-8 relative">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-[25px] font-semibold text-center flex-grow font-inter text-[#65A143]">
            Tyre Images
          </h2>
          <button onClick={onClose} className="text-[#383838] justify-center flex items-center rounded-full hover:bg-[#F6F6F6]  h-8 w-8">
            <Close />
          </button>
        </div>
        <div className="flex flex-row items-center justify-center overflow-hidden">
          <img
            src={imageUrl}
            alt="Vehicle"
            className="w-[450px] h-[450px] rounded-2xl shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
