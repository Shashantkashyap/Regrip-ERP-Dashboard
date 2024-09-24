import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLowNsdFormData, resetLowNsdFormData } from "../../redux/Slices/lowNsdFilterSlice";

function LowNsdFilter({ isVisible, onClose, onSubmit }) {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.lowNsdFilter.formData);

  // Filter fields
  const filters = [
    {
      label: "Vehicle Number:",
      type: "text",
      name: "vehicle_num",
      placeholder: "Enter Vehicle Number",
    },
    {
      label: "NSD Less Than:",
      type: "text",
      name: "nsd",
      placeholder: "Enter NSD(e.g. 4.00, 2.50)",
    },
  ];

 

  // Handle form submission
  useEffect(() => {
    const initialFormData = filters.reduce((acc, filter) => {
      acc[filter.name] = "";
      return acc;
    }, {});
    dispatch(setLowNsdFormData(initialFormData));
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // Merge current formData with the new value
    dispatch(setLowNsdFormData({ ...formData, [name]: value }));
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting FormData:", formData);
    onSubmit(formData);
  };

  return (
    <div
      className={`fixed top-0 z-50 right-0 h-full w-[400px] bg-white shadow-lg transform transition-transform duration-500 ease-in-out ${
        isVisible ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <button
        className="absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-900"
        onClick={onClose}
      >
        Close
      </button>
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        <form onSubmit={handleSubmit}>
          {filters.map((filter, index) => (
            <div key={index} className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                {filter.label}
              </label>
              <input
                type={filter.type}
                name={filter.name}
                value={formData[filter.name] || ""}
                onChange={handleInputChange}
                placeholder={filter.placeholder}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          ))}
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Apply Filters
          </button>
        </form>
      </div>
    </div>
  );
}

export default LowNsdFilter;
