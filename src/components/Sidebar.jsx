import React, { useEffect, useState } from "react";
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
import diamondG from "../assets/icons/diamond.png"
import Up from "../assets/icons/arrowUp.png";
import Down from "../assets/icons/arrowDown.png";
import logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { setActiveDropdownItem, setActiveMenuItem } from "../redux/Slices/menuSlice.js.js";
import { setTableFilter } from "../redux/Slices/DasboardPopup.js";

function Sidebar() {

  const userName = useSelector((state)=> state.user.user.data.name)


  const dispatch = useDispatch();
  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
  const activeDropdownItem = useSelector((state) => state.menu.activeDropdownItem);

  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Update isMobile state on window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = (id, dropdownItems) => {
    // Toggle dropdown or close it if already open

    dispatch(setTableFilter({ key: "", value: "item.value2" }));
    if (openDropdownId === id) {
      setOpenDropdownId(null);
    } else {
      setOpenDropdownId(id);
      dispatch(setActiveMenuItem(id));

      // Automatically select the first dropdown item if dropdown exists
      if (dropdownItems && dropdownItems.length > 0) {
        const firstDropdownItem = dropdownItems[0];
        dispatch(setActiveDropdownItem(firstDropdownItem));
      }
    }
  };

  const menuItems = [
    { id: 1, name: "Dashboard", icon: Dashboard, iconActive: DashboardG },
    { id: 2, name: "Vehicle Master", icon: diamond, iconActive: diamondG },
    {
      id: 3,
      name: "Inventory(Tyre)",
      icon: Inventory,
      iconActive: InventoryG,
      
    },
    { id: 4, name: "Scrap Analysis", icon: Retreaders, iconActive: RetreadersG },

    {
      id: 5,
      name: "Reports",
      icon: Reports,
      iconActive: ReportsG,

      dropdown: ["Inspection", "Pending Insp.", "Low NSD", "Mechanical Defect", "Tyre Wear", "Purchase"],

    },
    { id: 6, name: "Analytics", icon: Analytics, iconActive: AnalyticsG },
    
  ];

  return (
    <div className="w-full h-full bg-white p-2 font-inter">
      {/* USER */}
      <div className="flex flex-col max-lg:flex-col gap-2 items-center mb-6">
        <img
          src="https://png.pngtree.com/thumb_back/fh260/background/20230612/pngtree-man-wearing-glasses-is-wearing-colorful-background-image_2905240.jpg"
          alt="User Profile"
          className="w-16 h-16 rounded-full"
        />
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-lg text-[#313131]">{userName}</p>
          {/* <p className="font-normal text-xs text-[#0E56AB] underline cursor-pointer">View profile</p> */}
        </div>
      </div>

      {/* MENU LIST */}
      <div className="flex flex-col gap-[5px] max-lg:gap-[8px] mt-8">
        {menuItems.map((item) => (
          <div key={item.id}>
            <div
              onClick={() => handleClick(item.id, item.dropdown)}
              className={`flex justify-between rounded-[8px] items-center gap-2 max-lg:gap-1 py-2 px-2 max-lg:px-0 cursor-pointer transition-all duration-300 ${
                activeMenuItem === item.id ? "bg-[#e6f4ea]" : "hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center gap-2 max-lg:ml-1 max-lg:gap-1">
                <img
                  src={activeMenuItem === item.id ? item.iconActive : item.icon}
                  alt={item.name}
                  className="w-6 h-6 max-lg:w-3 max-lg:h-3"
                />
                <p
                  className={`font-semibold text-[14px] max-lg:text-[13px] leading-[19.36px] ${
                    activeMenuItem === item.id ? "text-[#65A143]" : "text-[#555555]"
                  }`}
                  style={{ fontWeight: 500 }}
                >
                  {item.name}
                </p>
              </div>
              {item.dropdown && (
                <img
                  src={openDropdownId === item.id ? Up : Down}
                  alt="Toggle Dropdown"
                  className="w-4 h-4 ml-6 max-lg:ml-0 transition-transform duration-300"
                  style={{ transform: openDropdownId === item.id ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              )}
            </div>
            {/* DROPDOWN */}
            {item.dropdown && (
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openDropdownId === item.id ? "max-h-80" : "max-h-0"
                }`}
              >
                <div className="ml-4 max-lg:ml-1  max-lg:text-[11px] flex flex-col gap-[7px] max-lg:gap-1 mt-2">
                  {item.dropdown.map((dropdownItem, index) => (
                    <p
                      key={index}
                      className={`text-[#777] text-[14px] max-lg:text-[11px] font-medium cursor-pointer hover:bg-gray-100 p-2 rounded transition-all ${
                        activeDropdownItem === dropdownItem ? "bg-[#e6f4ea] text-[#65A143]" : ""
                      }`}
                      onClick={() => dispatch(setActiveDropdownItem(dropdownItem))}
                    >
                      {dropdownItem}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* LOGO SECTION */}
      <div className="flex flex-col gap-2 justify-center mt-6 ml-2">
        <div>
          <img src={logo} alt="Logo" className="w-[140px] h-[68px]" />
        </div>
        <div>
          <p className="font-medium text-[12.01px] leading-[15.01px] text-[#666666]">Version 23 34 (2034234)</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
