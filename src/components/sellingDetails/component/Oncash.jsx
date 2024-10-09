import React from "react";
import { useForm, Controller } from "react-hook-form";
import selling from "../../../assets/icons/selling.png";

function Onaccount() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      scrapTyreCount: "",
      tubes: "",
      flaps: "",
      invoiceDate: "",
      invoiceNumber: "",
      basicAmount: "",
      gstAmount: "",
      totalAmount: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <>
      {/* Tyre Quality Section */}
      <section>
        <div className="flex justify-between items-center align-middle mt-[40px]">
          <h1 className="w-[140px] text-gray-400 text-[20px] font-outfit">
            Tyre Quantity
          </h1>
          <hr className="w-[100%] border-[1px] ms-[20px]" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-[40px]">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <label htmlFor="scrapTyreCount">Scrap Tyre Count *</label>
              <div className="relative w-[100%]">
                <Controller
                  name="scrapTyreCount"
                  control={control}
                  rules={{ required: "Scrap tyre count is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="16"
                      disabled
                      className="w-[350px] mt-[10px] rounded h-[40px] ps-[10px]"
                    />
                  )}
                />

                <br></br>
                {errors.scrapTyreCount && (
                  <span className="text-red-500 text-[10px] ">
                    {errors.scrapTyreCount.message}
                  </span>
                )}
                <div className="absolute right-[60px] top-4 text-gray-500">
                  <btn className="bg-green-300 text-black font-semibold cursor-pointer px-[10px] py-[5px] text-[10px] rounded">
                    Upload Excel
                  </btn>
                </div>

                <div className="absolute right-5 top-5 text-gray-500">
                  <img
                    src={selling}
                    className="w-[12px] mt-[5px] h-[12px]"
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="tubes">Tubes *</label>
              <div className="relative">
                <Controller
                  name="tubes"
                  control={control}
                  rules={{ required: "Tube count is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="w-[350px] mt-[10px] rounded h-[40px] ps-[10px]"
                      placeholder="Enter Tube Count"
                    />
                  )}
                />
                <br></br>
                {errors.tubes && (
                  <span className="text-red-500 text-[10px]">
                    {errors.tubes.message}
                  </span>
                )}
                <div className="absolute right-5 top-5 text-gray-500">
                  <img
                    src={selling}
                    className="w-[12px] mt-[5px] h-[12px]"
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="flaps">Flaps *</label>
              <div className="relative">
                <Controller
                  name="flaps"
                  control={control}
                  rules={{ required: "Flap count is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="w-[350px] mt-[10px] rounded h-[40px] ps-[10px]"
                      placeholder="Enter Flap Count"
                    />
                  )}
                />
                <br></br>
                {errors.flaps && (
                  <span className="text-red-500 text-[10px]">
                    {errors.flaps.message}
                  </span>
                )}
                <div className="absolute right-5 top-5 text-gray-500">
                  <img
                    src={selling}
                    className="w-[12px] mt-[5px] h-[12px]"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>

      {/* Invoice Details Section */}
      <section>
        <div className="flex justify-between items-center align-middle mt-[40px]">
          <h1 className="w-[150px] text-gray-400 text-[20px] font-outfit">
            Invoice Details
          </h1>
          <hr className="w-[100%] border-[1px] ms-[20px]" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-[40px]">
          <div className="flex flex-col">
            <label htmlFor="totalAmount">Total Amount *</label>
            <div className="relative">
              <Controller
                name="totalAmount"
                control={control}
                rules={{ required: "Total amount is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-[350px] mt-[10px] rounded h-[40px] ps-[10px]"
                    placeholder="Enter Total Amount"
                  />
                )}
              />
              <br></br>
              {errors.totalAmount && (
                <span className="text-red-500 text-[10px]">
                  {errors.totalAmount.message}
                </span>
              )}
              <div className="absolute right-5 top-5 text-gray-500">
                <img
                  src={selling}
                  className="w-[12px] mt-[5px] h-[12px]"
                  alt=""
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-[150px] h-[50px] border text-center rounded text-white bg-[#65A143] mx-auto mt-[40px] block"
          >
            SUBMIT
          </button>
        </form>
      </section>
    </>
  );
}

export default Onaccount;
