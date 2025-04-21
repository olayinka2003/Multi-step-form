import React from "react";
import Sidebar from "./Sidebar";
import { useLocation, useNavigate } from "react-router";
import { useFormData } from "../context/FormProvider";

export default function Summary() {
  const navigate = useNavigate();
  const { planData, selectedAddOns, setActive, setFormData, setPlanData, setSelectedAddOns, setSelectedPlan  } = useFormData();



  const billing = planData?.plan?.billing;
  const planType = planData?.plan?.type;
  const price = planData?.plan?.price || 0;
  const addons = selectedAddOns || [];

  const addonsTotal = addons.reduce((sum, addon) => {
    const addonPrice =
      typeof addon.price === "string"
        ? parseInt(addon.price.replace(/[^\d]/g, ""), 10)
        : addon.price;
    return sum + addonPrice;
  }, 0);

  const totalPrice = price + addonsTotal;

  const formatPrice = (price) => {
    return `$${price}${billing === "monthly" ? "/mo" : "/yr"}`;
  };

  const confirm = () => {
    navigate("/thanks");
    setActive("4");
    localStorage.setItem("activeStep", "4");
    setFormData({
      name: "",
      email: "",
      phone: "",
    })
    setPlanData(null);
    setSelectedAddOns([]);
    setSelectedPlan(null);
  }

  return (
    <div className="lg:w-[75%] w-full mx-auto rounded-[8px] shadow-2xl lg:mt-20 lg:flex lg:flex-row flex-col lg:p-4 relative">
      <Sidebar />
      <section className="p-10 lg:w-[60%] w-[90%] mx-auto rounded-[8px] bg-white mt-0  flex flex-col absolute lg:relative lg:top-0 top-20 left-0 right-0">
        <h1 className="text-[#02265B] font-bold text-3xl">Finishing Up</h1>
        <p className="text-[#B2B1B6] mt-1">
          Double-check everything looks OK before confirming.
        </p>

        <section className="mt-14 light p-4 rounded-[8px]">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-[#02265B] ">
                {planType} ({billing})
              </p>
              <p
                className="text-[#B2B1B6] underline cursor-pointer"
                onClick={() => navigate("/plan")}
              >
                Change
              </p>
            </div>

            <p className="text-[#02265B] font-black">{formatPrice(price)}</p>
          </div>

          <hr className="mt-10 border-[#B2B1B6]" />

          <div className="mt-4">
            {addons.map((addon, index) => (
              <div key={index} className="flex justify-between mt-2">
                <p className="text-[#B2B1B6]">{addon.name}</p>
                <p className="text-[#02265B]">
                  {/* Display just the price, not with "/mo" if it's already included */}
                  {typeof addon.price === "string"
                    ? addon.price
                    : formatPrice(addon.price)}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex items-center justify-between p-4">
          <p className="text-[#B2B1B6]">
            Total (per {billing === "monthly" ? "month" : "year"})
          </p>
          <p className="text-[#483EFF] font-bold text-lg">
            {formatPrice(totalPrice)}
          </p>
        </section>

        <div className="flex items-center justify-between mt-7">
          <p onClick={()=> navigate("/addons")} className="font-bold text-[#B2B1B6] cursor-pointer">Go Back</p>
          <button onClick={confirm} className="bg-[#483EFF] text-white p-3 rounded-[8px] w-[30%] font-semibold cursor-pointer">
            Confirm
          </button>
        </div>
      </section>
    </div>
  );
}
