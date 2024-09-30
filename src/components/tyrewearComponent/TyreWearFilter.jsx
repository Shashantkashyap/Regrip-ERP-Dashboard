import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTyreWearFormData } from "../../redux/Slices/tyreWearFilterSlice";
import { setFormData } from "../../redux/Slices/masterFilterSlice";

function TyreWearFilter({ isVisible, onClose, onSubmit, filterData }) {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.tyreWearFilter.formData);

  const filters = [
    {
      label: "Vehicle Number. :",
      type: "text",
      element: "input",
      name: "vehicle_no",
      placeholder: "Enter Vehicle Number",
    },
    {
      label: "Tyre Number :",
      type: "text",
      element: "input",
      name: "tyre_no",
      placeholder: "Enter Tyre Number",
    },
    {
      label: "Wear Defects :",
      type: "text",
      element: "select",
      name: "wear_defects",
      placeholder: "Select Wear Defect",
      options: ["shoulder seperation", "tread seperation", "channel cracking", "big through cut", "tread scoring", "cut seperation", "impact break wire++", "wire++", "rusted wire", "burst", "patch over lap", "3 or more through cut", "tread chipping", "ok", "1 cut", "minor shoulder damage (only rubber)", "wire", "ply touch", "wire +", "2 cut", "sidewall seperation"],
    },
    {
      label: "Status",
      type: "text",
      element: "select",
      options: [],
      name: "status",
      placeholder: "Select Status",
    },
    {
      label: "Delay Days",
      type: "text",
      name: "delay_days",
      element: "input",
      placeholder: "Enter Difference Days (eg: 5, 10)",
    },
    {
      label: "Ageing (Days)",
      type: "text",
      name: "ageing",
      element: "input",
      placeholder: "Enter Ageing (eg: 10, 30)",
    },
  ];

  // Initialize form data only once when the component mounts
  useEffect(() => {
    const initialFormData = filters.reduce((acc, filter) => {
      acc[filter.name] = "";
      return acc;
    }, {});
    dispatch(setTyreWearFormData(initialFormData));
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // Merge current formData with the new value
    dispatch(setTyreWearFormData({ ...formData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting FormData:", formData);
    onSubmit(formData);
  };


  const handleReset = () => {
    dispatch(resetTyreWearFormData());
    onSubmit({});
  };

  // Function to format filter labels and values for display
  const formatFilterDisplay = (label, value) => {
    if (value === "") return null;
    // Capitalize the first letter
    const formattedValue = value.charAt(0).toUpperCase() + value.slice(1);
    return (
      <div key={label} className="flex items-center bg-gray-200 text-gray-700 px-3 py-1 rounded-full mr-2 mb-2">
        <span className="text-sm">{label}: {formattedValue}</span>
        <button
          onClick={() => handleFilterRemove(label.toLowerCase().replace(" ", "_"))}
          className="ml-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
      </div>
    );
  };

  useEffect(() => {
    console.log(filterData);
  }, [filterData]);

  return (
    <div
      style={{ boxShadow: "-5px 0px 16.6px 0px #00000021" }}
      className={`fixed top-0 right-0 h-full w-[350px] bg-white shadow-lg transition-transform duration-300 ease-in-out z-50 font-outfit  ${
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
      <div className="p-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col h-[88vh] justify-between"
        >
          <div>
            {filters.map((filter, index) => (
              <div key={index} className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  {filter.label}
                </label>
                {
                    filter.element === "input" ? (
                        <input
                            type={filter.type}
                            name={filter.name}
                            placeholder={filter.placeholder}
                            value={formData[`${filter.name}`] || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border text-[#383737] text-[15px] border-gray-300 rounded-[6px] py-2 px-4 "
                        />
                    ) : (
                        <select 
                        name={filter.name}
                        value={formData[filter.name] || ""}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border text-[#383737] text-[15px] border-gray-300 rounded-[6px] py-2 px-4 "
                        >
                            {/* Placeholder option */}
                            <option value="" disabled>
                                {filter.placeholder}
                            </option>
                            {filter.options?.map((option, idx) => (
                                <option value={option} key={idx}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    )
                }
              </div>
            ))}
          </div>

          <div className="flex justify-between  border-t-[2px] pt-3">
            <button
              type="button"
              onClick={() => dispatch(setFormData({}))}
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

export default TyreWearFilter;
