import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTyreStatusFormData, resetTyreStatusFormData } from "../../redux/Slices/TyreStatusFilterSlice";

function TyreStatusFilter({ isVisible, onClose, onSubmit }) {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.tyreStatusFilter.formData);

  const filters = [
    // { label: "Customer Name", type: "text", name: "company_name", placeholder: "Enter customer name" },
    // { label: "Office", type: "text", name: "city", placeholder: "Enter office city" },
    { label: "Defect Type", type: "text", name: "defect_type", placeholder: "Enter defect type" },
    { label: "Tyre Make", type: "text", name: "manufacturer", placeholder: "Enter brand name" },
    { label: "Status", type: "text", name: "status", placeholder: "Enter Status" },
    { label: "Tyre Number", type: "text", name: "serial_no", placeholder: "Enter Tyre No." },
  ];

  useEffect(() => {
    const initialFormData = filters.reduce((acc, filter) => {
      acc[filter.name] = "";
      return acc;
    }, {});
    dispatch(setTyreStatusFormData(initialFormData));
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setTyreStatusFormData({ ...formData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleReset = () => {
    dispatch(resetTyreStatusFormData()); // Reset form data
    onSubmit({}); // Trigger unfiltered data fetch
  };

  return (
    <div
      style={{ boxShadow: "-5px 0px 16.6px 0px #00000021" }}
      className={`fixed top-0 right-0 h-full w-[350px] bg-white shadow-lg transition-transform duration-300 ease-in-out z-50 font-outfit ${
        isVisible ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-[19px] font-normal">Filter</h2>
        <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="p-4 overflow-y-auto h-[85vh]">
        <form onSubmit={handleSubmit} className="flex flex-col h-full justify-between">
          <div>
            {filters.map((filter, index) => (
              <div key={index} className="mb-4">
                <label className="block text-sm font-medium text-gray-700">{filter.label}</label>
                <input
                  type={filter.type}
                  name={filter.name}
                  placeholder={filter.placeholder}
                  value={formData[filter.name] || ""}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border text-[#383737] text-[15px] border-gray-300 rounded-[6px] py-2 px-4"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-between border-t-[2px] pt-3">
            <button
              type="button"
              onClick={handleReset} // Reset button triggers fetching unfiltered data
              className="bg-[#f0eeee] border-[1px] rounded-[9px] p-[10px_22px_10px_22px] text-[15px] leading-[23.94px] font-normal transition duration-300 ease-in-out hover:scale-[1.02] hover:shadow-md"
            >
              Reset
            </button>
            <button
              type="submit"
              className="bg-[#65A948] text-white py-2 px-4 p-[10px_22px_10px_22px] text-[15px] rounded-md hover:bg-green-700 transition duration-300 ease-in-out hover:scale-[1.02] hover:shadow-md"
            >
              Apply now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TyreStatusFilter;
