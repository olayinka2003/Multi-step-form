import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Sidebar from "./Sidebar";
import arcade from "../assets/img/icon-arcade.svg";
import advanced from "../assets/img/icon-advanced.svg";
import pro from "../assets/img/icon-pro.svg";
import { useFormData } from "../context/FormProvider";

export default function Plan() {
  const navigate = useNavigate();
 
  
  const {selectedPlan, setSelectedPlan, togglePlan, setTogglePlan, formData, setActive} = useFormData();
 
 

  useEffect(() => {
    setActive("2");
    localStorage.setItem("activeStep", "2");
  }, []);

  const back = () => {
    navigate("/", { state: formData });
    setActive("1");
  };

  const getPlanPrice = () => {
    const prices = {
      Arcade: togglePlan ? 9 : 90,
      Advanced: togglePlan ? 12 : 120,
      Pro: togglePlan ? 15 : 150,
    };
    return prices[selectedPlan] || 0;
  };
  

  const next = () => {
    if (!selectedPlan) {
      alert("Please select a plan");
      return;
    }
    
    const planData = {
      ...formData,
      plan: {
        type: selectedPlan,
        billing: togglePlan ? 'monthly' : 'yearly',
        price: getPlanPrice(),
      }
    };
    
    // Save to localStorage as a backup strategy
    localStorage.setItem("formData", JSON.stringify(planData));
    
    navigate("/addons", { state: planData });
    setActive("3");
  };

  return ( 
    <div className="w-[75%] h-screen mx-auto rounded-[8px] shadow-2xl mt-20 flex p-4 bg-white">
      <Sidebar  next={next} />
      <section className="p-10 w-[60%]">
        <h1 className="text-[#02265B] font-bold text-3xl">Select your plan</h1>
        <p className="text-[#B2B1B6] mt-1">
          You have the option of monthly or yearly billing
        </p>

        <section className="grid grid-cols-3 gap-4 mt-10">
          <div
            className={`p-4 border ${
              selectedPlan === "Arcade"
                ? "border-[#03337b] bg-blue-50"
                : "border-gray-200"
            } rounded-[8px] cursor-pointer`}
            onClick={() => setSelectedPlan("Arcade")}
          >
            <img src={arcade} alt="Arcade plan" />
            <h1 className="text-[#02265B] font-bold text-xl mt-10">Arcade</h1>
            {togglePlan ? (
              <p className="text-[#B2B1B6] mt-1">$9/mo</p>
            ) : (
              <div>
                <p className="text-[#B2B1B6] mt-1">$90/yr</p>
                <p className="text-[#02265B] font-semibold">2 months free</p>
              </div>
            )}
          </div>
          <div
            className={`p-4 border ${
              selectedPlan === "Advanced"
                ? "border-[#03337b] bg-blue-50"
                : "border-gray-200"
            } rounded-[8px] cursor-pointer`}
            onClick={() => setSelectedPlan("Advanced")}
          >
            <img src={advanced} alt="Advanced plan" />
            <h1 className="text-[#02265B] font-bold text-xl mt-10">Advanced</h1>
            {togglePlan ? (
              <p className="text-[#B2B1B6] mt-1">$12/mo</p>
            ) : (
              <div>
                <p className="text-[#B2B1B6] mt-1">$120/yr</p>
                <p className="text-[#02265B] font-semibold">2 months free</p>
              </div>
            )}
          </div>
          <div
            className={`p-4 border ${
              selectedPlan === "Pro"
                ? "border-[#03337b] bg-blue-50"
                : "border-gray-200"
            } rounded-[8px] cursor-pointer`}
            onClick={() => setSelectedPlan("Pro")}
          >
            <img src={pro} alt="Pro plan" />
            <h1 className="text-[#02265B] font-bold text-xl mt-10">Pro</h1>
            {togglePlan ? (
              <p className="text-[#B2B1B6] mt-1">$15/mo</p>
            ) : (
              <div>
                <p className="text-[#B2B1B6] mt-1">$150/yr</p>
                <p className="text-[#02265B] font-semibold">2 months free</p>
              </div>
            )}
          </div>
        </section>

        <div className="w-full flex justify-center mt-10 p-2 light">
          <div className="flex items-center justify-between gap-4">
            <p
              className={`font-semibold ${
                togglePlan ? "text-[#02265B]" : "text-[#B2B1B6]"
              }`}
            >
              Monthly
            </p>
            <div
              onClick={() => setTogglePlan((t) => !t)}
              className={`w-[40px] h-[20px] bg-[#02265B] rounded-full flex items-center ${
                togglePlan ? "justify-start" : "justify-end"
              } transition-transform duration-300 cursor-pointer`}
            >
              <p className="bg-white h-[15px] w-[15px] rounded-full"></p>
            </div>
            <p
              className={`font-semibold ${
                togglePlan ? "text-[#B2B1B6]" : "text-[#02265B]"
              }`}
            >
              Yearly
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-20">
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