import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useLocation, useNavigate } from "react-router";
import { useFormData } from "../context/FormProvider";

export default function AddOns() {
  const navigate = useNavigate();
  

  
  const { selectedAddOns, setSelectedAddOns, setActive,  planData, loading, setLoading} = useFormData();

  const billing = planData?.plan?.billing;

  const next = ()=>{
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/summary",);
      setActive("4");
    }, 1000);
  }


  console.log(billing);
  

  

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

 
  return (
    <div className="lg:w-[75%] w-full mx-auto rounded-[8px] shadow-2xl lg:mt-20 lg:flex lg:flex-row flex-col lg:p-4 relative">
      <Sidebar  />
      <section className="p-10 lg:w-[60%] w-[90%] mx-auto rounded-[8px] bg-white mt-0  flex flex-col absolute lg:relative lg:top-0 top-20 left-0 right-0">
        <h1 className="text-[#02265B] font-bold text-3xl">Pick add-ons</h1>
        <p className="text-[#B2B1B6] mt-1">
          Add-ons helps enhance your gaming experience.
        </p>

        {addOnsList.map((addon) => (
          <section
            key={addon.id}
            className={`flex md:flex-row flex-col gap-2 md:justify-between lg:justify-between items-center mt-10 p-3 ${
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
                <p className="text-[#02265B] font-bold md:text-start text-center">{addon.name}</p>
                <p className="text-[#B2B1B6] text-center">{addon.desc}</p>
              </div>
            </div>
            <p className="purple text-center">
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
            className={`bg-[#02295A] text-white p-3 rounded-[8px] lg:w-[30%] font-semibold transition-opacity ${
              loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
      {loading ? "Loading..." : "Next Step"}
          </button>
        </div>
      </section>
    </div>
  );
}
