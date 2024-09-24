import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import AnalyticsG from "../assets/icons/Analytics (1).png";
import DashboardG from "../assets/icons/dashboard.png";
import CollectionG from "../assets/icons/Collection1.png";
import DispatchG from "../assets/icons/dispatch (1).png";
import InventoryG from "../assets/icons/Inventory (1).png";
import ReportsG from "../assets/icons/Reports (1).png";
import RetreadersG from "../assets/icons/retreaders (1).png";
import ToolsG from "../assets/icons/Tools (1).png";
import TruckG from "../assets/icons/truck (1).png";
import Analytics from "../assets/icons/Analytics.png";
import Dashboard from "../assets/icons/dashboard (1).png";
import Collection from "../assets/icons/Collection.png";
import Dispatch from "../assets/icons/dispatch.png";
import Inventory from "../assets/icons/Inventory.png";
import Reports from "../assets/icons/Reports.png";
import Retreaders from "../assets/icons/retreaders.png";
import Tools from "../assets/icons/Tools.png";
import Truck from "../assets/icons/truck.png";
import diamond from "../assets/icons/diamond (1).png";
import diamondG from "../assets/icons/diamond.png";
import logo from "../assets/logo (2) 1.png";

import { setActiveDropdownItem, setActiveMenuItem } from "../redux/Slices/menuSlice.js.js";
import { setTableFilter } from "../redux/Slices/DasboardPopup.js";

function SidebarIcons() {
  const dispatch = useDispatch();

  const activeDropdownItem = useSelector((state) => state.menu.activeDropdownItem); // Changed from showDropdown to activeDropdownItem
  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);

  const [isReportsDropdownOpen, setIsReportsDropdownOpen] = useState(false);
  const [dropdownItem, setDropdownItem] = useState(activeDropdownItem); // Default to Redux state
  const reportsDropdownRef = useRef(null); // To detect outside clicks

  const handleItemClick = (id) => {
    dispatch(setTableFilter({ key: "", value: "item.value2" }));
    dispatch(setActiveMenuItem(id));

    // Toggle reports dropdown only for "Reports" icon
    if (id === 5) {
      setIsReportsDropdownOpen((prev) => !prev);
    } else {
      setIsReportsDropdownOpen(false); // Close the reports dropdown if another menu is clicked
    }
  };

  const handleClickOutside = (event) => {
    if (reportsDropdownRef.current && !reportsDropdownRef.current.contains(event.target)) {
      setIsReportsDropdownOpen(false); // Close dropdown if clicked outside
    }
  };

  useEffect(() => {
    // Add event listener to detect clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const setReportIcon = (item) => {
    setDropdownItem(item);
    dispatch(setActiveDropdownItem(item)); // Save active dropdown item to Redux
  };

  const menuItems = [
    { id: 1, photo: Dashboard, greenPhoto: DashboardG },
    { id: 2, photo: diamond, greenPhoto: diamondG },
    { id: 3, photo: Retreaders, greenPhoto: RetreadersG },
    { id: 4, photo: Retreaders, greenPhoto: RetreadersG },
    { id: 5, photo: Reports, greenPhoto: ReportsG }, // Reports item
    { id: 10, photo: Analytics, greenPhoto: AnalyticsG },
  ];

  const reportsDropdownItems = [
    "Inspection",
    "Pending Insp.",
    "Low NSD",
    "Hub-Mismatch",
    "Mechanical Defect",
    "Tyre Wear",
    "Purchase",
  ];

  return (
    <div className="w-full h-full bg-white font-inter relative">
      {/* USER */}
      <div className="flex flex-row gap-2 items-center mb-6">
        <img
          src="https://png.pngtree.com/thumb_back/fh260/background/20230612/pngtree-man-wearing-glasses-is-wearing-colorful-background-image_2905240.jpg"
          alt="User Profile"
          className="w-[34px] h-[34px] rounded-full"
        />
      </div>

      {/* MENU LIST */}
      <div className="flex flex-col gap-[12px] mt-8">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`relative flex items-center p-1 cursor-pointer transition-all duration-300 rounded-md mr-1 ${
              activeMenuItem === item.id ? "bg-[#e6f4ea]" : "hover:bg-gray-100"
            }`}
            onClick={() => handleItemClick(item.id)}
          >
            <img
              src={activeMenuItem === item.id ? item.greenPhoto : item.photo}
              alt={`Menu Icon ${item.id}`}
              className="w-6 h-6"
            />
            {/* DROPDOWN FOR REPORTS */}
            {item.id === 5 && (
              <div
                ref={reportsDropdownRef}
                className={`absolute top-0 left-12 w-[150px] bg-white shadow-lg rounded-[20px] p-3 flex flex-col gap-2 z-10 transition-all duration-300 ease-in-out ${
                  isReportsDropdownOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                }`}
                style={{ boxShadow: "-5px 0px 16.6px 0px #00000021" }}
              >
                {reportsDropdownItems.map((dropdown, index) => (
                  <p
                    key={index}
                    className={`text-[13px] text-[#555555] hover:bg-gray-100 p-1 rounded-md cursor-pointer transition-colors duration-300 ${
                      dropdownItem === dropdown ? "bg-[#e6f4ea] text-[#65A143]" : ""
                    }`}
                    onClick={() => setReportIcon(dropdown)} // Set active dropdown item on click
                  >
                    {dropdown}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* LOGO SECTION */}
      <div className="flex flex-col gap-2 justify-center mt-16">
        <img src={logo} alt="Logo" className="w-[60px] h-[75px]" />
      </div>
    </div>
  );
}

export default SidebarIcons;
