import React from "react";
import Sidebar from "./Sidebar";
import { useLocation, useNavigate } from "react-router";

export default function Summary({ active, setActive }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedAddOns, formData, plan } = location.state;
  const billing = plan.billing;
  const planType = plan.type;
  const price = plan.price;
  const addons = selectedAddOns;

  // const addonsTotal = addons.reduce((sum, addon) => sum + addon.price, 0);
  // const totalPrice = price + addonsTotal;

  console.log(addons);

  return (
    <div className="w-[75%] h-screen mx-auto rounded-[8px] shadow-2xl mt-20 flex p-4 bg-white">
      <Sidebar active={active} setActive={setActive} />
      <section className="p-10 w-[60%]">
        <h1 className="text-[#02265B] font-bold text-3xl">Finishing Up</h1>
        <p className="text-[#B2B1B6] mt-1">
          Double-check eveything looks OK before confirming.
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

            <p className="text-[#02265B] font-black">${price}/yr</p>
          </div>

          <hr className="mt-10 border-[#B2B1B6]" />

          <div className="mt-4">
            {addons.map((addon, index) => (
              <div key={index} className="flex justify-between mt-2">
                <p className="text-[#B2B1B6]">{addon.name}</p>
                <p className="text-[#02265B]">{addon.price}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex items-center justify-between p-4">
          <p className="text-[#B2B1B6]">
            Total (per {billing === "monthly" ? "month" : "year"})
          </p>
          <p className="text-[#483EFF] font-bold text-lg">
          
          </p>
        </section>
      </section>
    </div>
  );
}
