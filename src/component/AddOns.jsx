import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useLocation, useNavigate } from "react-router";
import { useFormData } from "../context/FormProvider";

export default function AddOns() {
  const navigate = useNavigate();
  const location = useLocation();
  const planData = location.state 

  
  const { selectedAddOns, setSelectedAddOns, setActive} = useFormData();

  const billing = planData.plan.billing;

  

  const addOnsList = [
    {
      id: "online",
      name: "Online Service",
      desc: "Access to multiplayer games",
      monthly: "+$1/mo",
      yearly: "+$10/yr",
    },
    {
      id: "storage",
      name: "Larger storage",
      desc: "Extra 1TB of cloud save",
      monthly: "+$2/mo",
      yearly: "+$20/yr",
    },
    {
      id: "profile",
      name: "Customizable profile",
      desc: "Custom theme on your profile",
      monthly: "+$2/mo",
      yearly: "+$20/yr",
    },
  ];

  const handleCheckboxChange = (addon) => {
    const exists = selectedAddOns.find((item) => item.id === addon.id);
    if (exists) {
      setSelectedAddOns(selectedAddOns.filter((item) => item.id !== addon.id));
    } else {
      setSelectedAddOns([
        ...selectedAddOns,
        {
          id: addon.id,
          name: addon.name,
          price: billing === "monthly" ? addon.monthly : addon.yearly,
        },
      ]);
    }
  };

  const isChecked = (id) => selectedAddOns.some((addon) => addon.id === id);

  const back = () => {
    navigate("/plan", {state: planData});
    setActive("2");
  };

  useEffect(() => {
    setActive("3");
    localStorage.setItem("activeStep", "3");
  }, []);

  const next = () => {
    navigate("/summary", {
      state: {
        ...planData,
        selectedAddOns,
      },
    });

    setActive('4')
  };

  return (
    <div className="w-[75%] h-screen mx-auto rounded-[8px] shadow-2xl mt-20 flex p-4 bg-white">
      <Sidebar  />
      <section className="p-10 w-[60%]">
        <h1 className="text-[#02265B] font-bold text-3xl">Pick add-ons</h1>
        <p className="text-[#B2B1B6] mt-1">
          Add-ons helps enhance your gaming experience.
        </p>

        {addOnsList.map((addon) => (
          <section
            key={addon.id}
            className={`flex justify-between items-center mt-10 p-3 ${
              isChecked(addon.id) ? "bg-blue-100 border border-blue-600" : "bg-white border border-gray-200"
            } rounded-[8px] cursor-pointer`}
            onClick={() => handleCheckboxChange(addon)}
          >
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                className="cursor-pointer"
                checked={isChecked(addon.id)}
                onChange={() => handleCheckboxChange(addon)}
                onClick={(e) => e.stopPropagation()}
              />
              <div>
                <p className="text-[#02265B] font-bold">{addon.name}</p>
                <p className="text-[#B2B1B6]">{addon.desc}</p>
              </div>
            </div>
            <p className="purple">
              {billing === "monthly" ? addon.monthly : addon.yearly}
            </p>
          </section>
        ))}

        <div className="flex items-center justify-between mt-7">
          <p
            onClick={back}
            className="font-bold text-[#02265B] cursor-pointer"
          >
            Go Back
          </p>
          <button
            onClick={next}
            className="bg-[#02295A] text-white p-3 rounded-[8px] w-[30%] font-semibold cursor-pointer"
          >
            Next Step
          </button>
        </div>
      </section>
    </div>
  );
}
