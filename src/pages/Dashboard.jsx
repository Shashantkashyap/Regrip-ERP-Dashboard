import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Dashboard1 from "../components/Dashboard1";
import arrow from "../assets/icons/Group 81.png";
import SidebarIcons from "../components/SidebarIcons";
import fullArrow from "../assets/icons/Group 81 (1).png";
import { useSelector } from "react-redux";
import MasterScreen from "./MasterScreen";
import InspectionReport from "./InspectionReport";
import MechanicalDefectsReport from "./MechanicalDefectsReport";
import PendingInspectionReport from "./PendingInspectionReport";
import LowNsdReport from "./LowNsdReport"
import Inventory from "./Inventory";
import { useNavigate } from "react-router-dom";
import TyreWearReport from "../pages/TyreWearReport";
import TyrePurchaseReport from "../pages/TyrePurchaseReport";
import ScrapAnalysisReport from "../pages/ScrapAnalysisReport";
import TyreStatusReport from "../pages/TyreStatus"

function Dashboard() {

  // const knowUser = useSelector((state)=> state.user.user);

  const knowUser = JSON.parse(localStorage.getItem("userData"));

  console.log(knowUser)

  if (knowUser == null) {
    localStorage.removeItem("isLoggedIn");
  }
  const navigate = useNavigate()
  const [fullScreen, setFullScreen] = useState(
    window.innerWidth >= 1150 ? 1 : 0
  );
  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
  const activeDropdownItem = useSelector((state) => state.menu.activeDropdownItem);

  // Update fullScreen state based on window width
  useEffect(() => {
    const handleResize = () => {
      setFullScreen(window.innerWidth >= 1150 ? 1 : 0);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const validUser = localStorage.getItem("isLoggedIn") === "true";
  
  
  
  if (!validUser) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
        <div className="text-center">
          <p className="text-gray-800 text-xl font-semibold mb-4">
            You need to login first to continue.
          </p>
          <button
            onClick={() => navigate("/signin")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition duration-300 ease-in-out"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (

    <div className="flex gap-1 overflow-auto">
      {/* Sidebar or SidebarIcons based on state */}
      {fullScreen === 1 ? (
        <div className={`w-[11%] p-1 py-9 ${fullScreen === 0 ? "hidden" : ""}`}>
          <Sidebar />
        </div>
      ) : (
        <div
          className={`w-[7%] min-w-[70px] p-4 py-9 ${
            fullScreen === 1 ? "hidden" : ""
          }`}
        >
          <SidebarIcons />
        </div>
      )}

      {/* Toggle button */}
      <div className="relative mt-[37px]  w-[3%] min-w-[20px]">
        <img
          // src={fullScreen === 1 ? arrow : fullArrow}
          // alt="Toggle Sidebar"
          onClick={() => setFullScreen((prev) => (prev === 1 ? 0 : 1))}
          // className="cursor-pointer w-[35px] h-[35px]"
        />
      </div>

      {/* Main content area */}
      <div
        className={`flex-1 ${
          fullScreen === 1 ? "w-[84%]" : "w-full"
        } mt-8 mr-3 rounded-[50px]  bg-[#F7F7F7]`}
        style={{
          boxShadow: "0px 0px 39px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        {activeMenuItem == 1 && (
          <div className="mx-auto bg-white rounded-[50px] overflow-x-auto">
            <Dashboard1 />
          </div>
        )}
        {activeMenuItem == 2 && (
          <div className="mx-auto bg-white rounded-[50px]">
            <MasterScreen />
          </div>
        )}
        {activeMenuItem == 3 && (
          <div className="mx-auto bg-white rounded-[50px] ">
            <Inventory />
          </div>
        )}
        {
        activeMenuItem == 5 && activeDropdownItem == "Inspection" ? (
          <div>
            <InspectionReport/>
          </div>
          ) : ("")
        }
        {

        activeMenuItem == 5 && activeDropdownItem == "Mechanical Defect" ? (
          <div>
            <MechanicalDefectsReport/>
             </div>
          ) : ("")
        }
        {

        activeMenuItem == 5 && activeDropdownItem == "Pending Reports" ? (
          <div>
            <PendingInspectionReport/>
          </div>
          ) : ("")
        }
        {
        activeMenuItem == 5 && activeDropdownItem == "Low NSD" ? (
          <div>
            <LowNsdReport/>

          </div>
          ) : ("")
        }

        
{
          activeMenuItem === 5 && activeDropdownItem === "Tyre Wear" ? (
            <div>
              <TyreWearReport />
            </div>
          ) : ("")
        }

{
          activeMenuItem === 5 && activeDropdownItem === "Purchase" ? (
            <div>
              <TyrePurchaseReport />
            </div>
          ) : ("")
        }

{
          activeMenuItem === 5 && activeDropdownItem === "Tyre Status" ? (
            <div>
              <TyreStatusReport/>
            </div>
          ) : ("")
        }

    {
          activeMenuItem === 10 ? (
            <div>
              <ScrapAnalysisReport />
            </div>
          ) : ("")
        }
      </div>
    </div>
  );
}

export default Dashboard;
