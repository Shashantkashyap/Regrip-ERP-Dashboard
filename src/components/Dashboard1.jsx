import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import notification from "../assets/icons/notifications_unread (1).png";
import Search from "../assets/icons/search@2x.png";
import Summary from "./dashboardComponent/Summary";
import Alerts from "./dashboardComponent/Alerts";
import TyreInventory from "./dashboardComponent/TyreInventory";
import ActionTable from "./dashboardComponent/ActionTable";
import Chartfile from "./dashboardComponent/Chatfile"; // Fixed typo in import
import axios from "axios";
import Loader from "./common/Loader";
import DasboardPopup, { clearTableFilter, selectIsFilterEmpty, setTableFilter } from "../redux/Slices/DasboardPopup";
import PopupComponent from "./dashboardComponent/PopupComponent";
import { setActiveDropdownItem, setActiveMenuItem } from "../redux/Slices/menuSlice.js";


function DashboardMain() {

  //const apiKey = useSelector((state)=> state.user.user.data.api_key)

  const knowUser = JSON.parse(localStorage.getItem("userData"));
  const apiKey = knowUser.data.api_key

 

  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
  const [alert, setAlert] = useState([]);
  const [summary, setSummary] = useState({});
  const [tyreInventoryData, setTyreInventory] = useState([]);
  const [selectedTable, setSelectedTable] = useState("NSD");
  const [loading, setLoading] = useState(true); // Track loading state
  const url = "https://newstaging.regripindia.com/api";
  let summaryItems = []
  const [showPopup , setShowPopup] = useState(false);
  
const dispatch = useDispatch()

const filterTab = useSelector((state) => state.dashboardTableFilter.tableFilter);
  
  const isEmpty = (obj) => Object.keys(obj).length === 0;

  useEffect(() => {
    // This will run whenever filterTab changes
    if (!isEmpty(filterTab)) {
      if (filterTab.hasOwnProperty("totalV")) {
        
        dispatch(setActiveMenuItem(2));
      } else if (filterTab.hasOwnProperty("totalT")) {
        
        dispatch(setActiveMenuItem(3));
      }else if (filterTab.hasOwnProperty("LowNsd")) {
        
        dispatch(setActiveMenuItem(5));
        dispatch(setActiveDropdownItem("Low NSD"))
      }else if (filterTab.hasOwnProperty("PendingI")) {
        
        dispatch(setActiveMenuItem(5));
        dispatch(setActiveDropdownItem("Pending Reports"))
      }else if (filterTab.hasOwnProperty("PendingA")) {
        
        dispatch(setActiveMenuItem(5));
        dispatch(setActiveDropdownItem("Pending Reports"))
      }else if (filterTab.hasOwnProperty("PendingR")) {
        
        dispatch(setActiveMenuItem(5));
        dispatch(setActiveDropdownItem("Pending Reports"))
      }
       else if (filterTab.hasOwnProperty("current_status") || filterTab.hasOwnProperty("ongoing_status") || filterTab.hasOwnProperty("stock_status")){
        setShowPopup(true)
      }
    } else {
      console.log("Filter is empty.");
    }
  }, [filterTab, dispatch]); // Make sure to include dispatch in the dependency array

  const handleClick = () => {
    console.log("Button clicked, current filterTab:", filterTab);
    // You can add more logic here if needed
  };


  const fetchAlertData = async () => {
    try {
      const alertData = await axios.post(
        `${url}/alert-box`,
        {},
        {
          headers: {
            Authorization: apiKey,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setAlert(alertData.data.data || []); // Default to empty array if no data
    } catch (error) {
      toast.error('Error fetching alert data'); // Show error toast
      console.error('Error fetching alert data:', error);
    }
  };

  const fetchSummaryData = async () => {
    try {
      const summaryData = await axios.post(
        // `${url}/vehicle-stats`,
        `https://api.regripindia.com/api/tyre-summary`,
        {},
        {
          headers: {
            Authorization: apiKey,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      //console.log(summaryData)
      setSummary(summaryData.data.data || {}); // Default to empty object if no data
    } catch (error) {
      toast.error('Error fetching summary data'); // Show error toast
      console.error('Error fetching summary data:', error);
    }
  };

  
  const fetchTyreInventory = async () => {
    const inventoryFormData = new FormData();
    inventoryFormData.append("group_by", selectedTable.toLowerCase());

    try {
      const inventoryData = await axios.post(
        `${url}/tyre-inventory`,
        inventoryFormData,
        {
          headers: {
            Authorization: apiKey,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setTyreInventory(inventoryData.data.data || []); // Default to empty array if no data
    } catch (error) {
      toast.error('Error fetching tyre inventory data'); // Show error toast
      console.error('Error fetching tyre inventory data:', error);
    }
  };

  useEffect(() => {
    setLoading(true); // Start loading when fetching begins
    const fetchData = async () => {
      await fetchAlertData();
      await fetchSummaryData();
      await fetchTyreInventory();
      setLoading(false); // End loading when fetching is complete
    };
    fetchData();
  }, []);

  useEffect(() => {
    fetchTyreInventory();
  }, [selectedTable]);

  const alertItems = [
    { label: "Unidentified Tyre", value: alert?.[0]?.value ?? 0, color: "bg-[#DA4040]" , key : "ongoing_status", value2: "Unidentified"},
    { label: "Missing Tyre", value: alert?.[1]?.value ?? 0, color: "bg-[#DA4040]" ,key : "ongoing_status", value2: "Missing"},
    { label: "Low NSD", value: alert?.[2]?.value ?? 0, color: "bg-[#DA4040]" , key :"LowNsd", value2: "" },
    { label: "Pending Inspection", value: alert?.[3]?.value ?? 0, color: "bg-[#DA4040]" , key :"PendingI", value2: "" },
    { label: "Pending Alignment", value: alert?.[4]?.value ?? 0, color: "bg-[#DA4040]" , key :"PendingA", value2: "" },
    { label: "Pending Rotations", value: alert?.[5]?.value ?? 0, color: "bg-[#DA4040]" , key :"PendingR", value2: "" },
    { label: "Tyre Defects", value: alert?.[6]?.value ?? 0, color: "bg-[#DA4040]" },
  ];

  summary && Array.isArray(summary) && summary.length > 0 && (
    summaryItems = [
      { value: summary[13]?.total ?? 0, label: "Total Vehicles", key :"totalV", value2: "" },
      { value: summary[0]?.total ?? 0, label: "Total Tyres", key :"totalT", value2: "" },
      { value: summary[4]?.total ?? 0, label: "Total Scrap", key :"current_status", value2: "Scrap" },
      { value: summary[5]?.total ?? 0, label: "Tyres on Wheel", key : "current_status", value2: "On-Wheel" },
      { value: summary[1]?.total ?? 0, label: "Available Stock", key : "stock_status", value2:  "available" },
      { value: summary[12]?.total ?? 0, label: "Missing Tyres", key : "ongoing_status", value2: "Missing" },
      { value: summary[10]?.total ?? 0, label: "Sent to Retread", key : "ongoing_status", value2: "sent-to-retread" },
      { value: summary[2]?.total ?? 0, label: "New Tyres", key : "current_status", value2: "New" },
      { value: 0, label: "Reusable Tyres" }, // Static value
    ]
  );

  const closeFilterTab = ()=>{
    dispatch(clearTableFilter())
    setShowPopup(false);
    
  }

  return (
    <div className="p-6 bg-[#F7F7F7] rounded-[50px] overflow-x-auto">
      {loading ? <Loader /> : (
        activeMenuItem === 1 && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <p className="font-semibold text-[30px] leading-[36.31px] ml-1 text-[#65A143]">
                Dashboard
              </p>
              <div className="flex items-center gap-6 max-lg:gap-[10px] min-w-[100px] overflow-x-auto">
                <div className="bg-[#F1F1F1] flex items-center gap-3 px-4 py-2 rounded-[37px] shadow-sm w-[500px]">
                  <img src={Search} alt="Search Icon" className="w-6 h-6" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent focus:outline-none text-gray-700"
                  />
                </div>
                <img
                  src={notification}
                  alt="Notifications"
                  className="w-[31px] h-[31px] cursor-pointer hover:animate-bounce transition-opacity duration-500"
                />
              </div>
            </div>

            {showPopup === true && (
  <>
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] z-30"></div>
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-40 min-w-[600px] overflow-x-auto">
      <div className="bg-white w-[80%] max-w-[1145px] h-auto rounded-[28px] shadow-lg min-w-[700px] overflow-x-auto">
        <PopupComponent close={closeFilterTab}/>
      </div>
    </div>
  </>
)}

            <div className="flex gap-4">
            <Summary summaryItems={summaryItems} handleClick={handleClick} />
              

            <TyreInventory
                selectedTable={selectedTable}
                setSelectedTable={setSelectedTable}
                tyreInventory={tyreInventoryData.inventory} // Fixed to use correct variable
              />
              <Alerts alertItems={alertItems} />

              
            </div>

            {/* <div className="flex gap-4 mt-8">
              <div className="w-[100%] max-h-[800px]">
                <ActionTable />
              </div>
            </div> */}

            <div className="min-w-[960px]">
              <Chartfile />
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default DashboardMain;
