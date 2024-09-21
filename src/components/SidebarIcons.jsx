import React from "react";
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
import diamondG from "../assets/icons/diamond.png"
import logo from "../assets/logo (2) 1.png";

import { setActiveMenuItem } from "../redux/Slices/menuSlice.js.js";

function SidebarIcons() {
    const dispatch = useDispatch();
    const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);

    const handleItemClick = (id) => {
        dispatch(setActiveMenuItem(id));
    };

    const menuItems = [
        { id: 1, photo: Dashboard, greenPhoto: DashboardG },
        { id: 2, photo: diamond, greenPhoto: diamondG },
        { id: 3, photo: Inventory, greenPhoto: InventoryG },
        { id: 4, photo: Retreaders, greenPhoto: RetreadersG },
        { id: 5, photo: Tools, greenPhoto: ToolsG },
        { id: 6, photo: Truck, greenPhoto: TruckG },
        { id: 7, photo: Collection, greenPhoto: CollectionG },
        { id: 8, photo: Dispatch, greenPhoto: DispatchG },
        { id: 9, photo: Reports, greenPhoto: ReportsG },
        { id: 10, photo: Analytics, greenPhoto: AnalyticsG },
    ];

    return (
        <div className="w-full h-full bg-white font-inter">
            {/* USER */}
            <div className="flex flex-row gap-2 items-center mb-6">
                <img
                    src="https://png.pngtree.com/thumb_back/fh260/background/20230612/pngtree-man-wearing-glasses-is-wearing-colorful-background-image_2905240.jpg"
                    alt="User Profile"
                    className="w-[34px] h-[34px] rounded-full"
                />
            </div>

            <div>
                <p className="font-normal text-xs text-[#0E56AB] underline cursor-pointer">Profile</p>
            </div>

            {/* MENU LIST */}
            <div className="flex flex-col gap-[12px] mt-8">
                {menuItems.map((item) => (
                    <div
                        key={item.id}
                        className={`flex items-center p-1 cursor-pointer transition-all duration-300 rounded-md mr-1 ${
                            activeMenuItem === item.id ? "bg-[#e6f4ea]" : "hover:bg-gray-100"
                        }`}
                        onClick={() => handleItemClick(item.id)}
                    >
                        <img
                            src={activeMenuItem === item.id ? item.greenPhoto : item.photo}
                            alt={`Menu Icon ${item.id}`}
                            className="w-6 h-6"
                        />
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
