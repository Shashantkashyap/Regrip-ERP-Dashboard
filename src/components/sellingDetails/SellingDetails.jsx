import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import search from "../../assets/icons/search@2x.png";
import notification from "../../assets/icons/notifications_unread (1).png";
import Onaccount from "./component/Onaccount.jsx";
import Oncash from "./component/Oncash.jsx";
import selling from "../../assets/icons/selling.png";

function SellingDetails() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      scrapDealer: "",
      location: "",
      paymentMode: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    // handle form submission
  };

  const [paymentmode, setpaymentmode] = useState("On Account");

  return (
    <div>
      <div className="p-8 bg-[#F7F7F7] rounded-[50px] font-outfit overflow-x-auto relative">
        {/* TOP HEADINGS */}
        <div className="flex justify-between mb-6">
          <p className="font-inter font-semibold text-[30px] leading-[36.31px] text-[#65A143]">
            Selling Details
          </p>
          <div className="flex items-center gap-[34px]">
            <div className="flex bg-[#EBEBEB] rounded-[37px] p-[9px_24px] items-center gap-[7px]">
              <img
                src={search}
                alt="search icon"
                className="w-6 h-6 bg-[#EBEBEB] text-[#949494]"
              />
              <input
                type="text"
                placeholder="Search "
                className="outline-none text-sm bg-[#EBEBEB] text-[#949494] font-outfit font-normal text-[19px] leading-[23.94px]"
              />
            </div>
            <span className="p-[3px_4px]">
              <img
                src={notification}
                alt="notification icon"
                className="w-6 h-6"
              />
            </span>
          </div>
        </div>

        {/* Party Details Section */}
        <section>
          <div className="flex justify-between items-center align-middle mt-[40px]">
            <h1 className="w-[140px] text-gray-400  text-[20px] font-outfit">
              Party Details
            </h1>
            <hr className="w-[100%]   border-[1px] ms-[20px]" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-[40px]">
            <div className="flex justify-between">
              <div className="flex flex-col mt-[10px]">
                <label htmlFor="scrapDealer">Scrap Dealer *</label>
                <div className="relative">
                  <Controller
                    name="scrapDealer"
                    control={control}
                    rules={{ required: "Scrap dealer is required" }}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="w-[350px] ps-[10px] mt-[10px]   rounded h-[40px]"
                      >
                        <option value="Som Retreaders">Som Retreaders</option>
                        <option value="Option 2">Option 2</option>
                        <option value="Option 3">Option 3</option>
                        <option value="Option 4">Option 4</option>
                      </select>
                    )}
                  />
                  {/* <div className="absolute right-5 top-5 text-gray-500">
                 <img src={selling} className='w-[12px] mt-[5px] h-[12px]' alt="" />
                </div> */}
                </div>
              </div>

              <div className="flex flex-col mt-[10px]">
                <label htmlFor="location">Location *</label>
                <div className="relative">
                  <Controller
                    name="location"
                    control={control}
                    rules={{ required: "Location is required" }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className="w-[350px] rounded mt-[10px] h-[40px] ps-[10px]"
                        placeholder="Select Branch"
                      />
                    )}
                  />
                  <div className="absolute right-5 top-5 text-gray-500">
                    <img
                      src={selling}
                      className="w-[12px] mt-[5px] h-[12px]"
                      alt=""
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col mt-[10px]">
                <label htmlFor="paymentMode">Payment Mode</label>
                <div className="relative">
                  <Controller
                    name="paymentMode"
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="w-[350px] ps-[10px] mt-[10px] rounded h-[40px]"
                        onChange={(e) => {
                          field.onChange(e); // to update react-hook-form
                          setpaymentmode(e.target.value); // to update state
                        }}
                      >
                        <option value="On Account">On Account</option>
                        <option value="Cash">Cash</option>
                      </select>
                    )}
                  />
                  {/* <div className="absolute right-5 top-5 text-gray-500">
                 <img src={selling} className='w-[12px] mt-[5px] h-[12px]' alt="" />
                </div> */}
                </div>
              </div>
            </div>
          </form>
        </section>

        <section>
          {paymentmode === "On Account" ? <Onaccount /> : <Oncash />}
          {useEffect(() => {
            console.log(paymentmode);
          })}
        </section>
      </div>
    </div>
  );
}

export default SellingDetails;
