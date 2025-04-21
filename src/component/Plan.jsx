import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Sidebar from "./Sidebar";
import arcade from "../assets/img/icon-arcade.svg";
import advanced from "../assets/img/icon-advanced.svg";
import pro from "../assets/img/icon-pro.svg";
import { useFormData } from "../context/FormProvider";

export default function Plan() {
  const navigate = useNavigate();
 
  
  const {selectedPlan, setSelectedPlan, togglePlan, setTogglePlan, formData, setActive, next,loading } = useFormData();
 
 

  useEffect(() => {
    setActive("2");
    localStorage.setItem("activeStep", "2");
  }, []);

  const back = () => {
    navigate("/", { state: formData });
    setActive("1");
  };

  
  

  

  return ( 
    <div className="lg:w-[75%] w-full mx-auto rounded-[8px] shadow-2xl lg:mt-20 lg:flex lg:flex-row flex-col lg:p-4 relative">
      <Sidebar  next={next} />
      <section className="p-10 lg:w-[60%] w-[90%] mx-auto rounded-[8px] bg-white mt-0  flex flex-col absolute lg:relative lg:top-0 top-20 left-0 right-0">
        <h1 className="text-[#02265B] font-bold text-3xl">Select your plan</h1>
        <p className="text-[#B2B1B6] mt-1">
          You have the option of monthly or yearly billing
        </p>

        <section className="grid lg:grid-cols-3 gap-4 mt-10">
          <div
            className={`p-4 border ${
              selectedPlan === "Arcade"
                ? "border-[#03337b] bg-blue-50"
                : "border-gray-200"
            } rounded-[8px] cursor-pointer flex flex-col items-center`}
            onClick={() => setSelectedPlan("Arcade")}
          >
            <img src={arcade} alt="Arcade plan" />
            <h1 className="text-[#02265B] font-bold text-xl mt-10">Arcade</h1>
            {togglePlan ? (
              <p className="text-[#B2B1B6] mt-1 text-center">$9/mo</p>
            ) : (
              <div>
                <p className="text-[#B2B1B6] mt-1 text-center">$90/yr</p>
                <p className="text-[#02265B] font-semibold">2 months free</p>
              </div>
            )}
          </div>
          <div
            className={`p-4 border ${
              selectedPlan === "Advanced"
                ? "border-[#03337b] bg-blue-50"
                : "border-gray-200"
            } rounded-[8px] cursor-pointer flex flex-col items-center`}
            onClick={() => setSelectedPlan("Advanced")}
          >
            <img src={advanced} alt="Advanced plan" />
            <h1 className="text-[#02265B] font-bold text-xl mt-10">Advanced</h1>
            {togglePlan ? (
              <p className="text-[#B2B1B6] mt-1 text-center">$12/mo</p>
            ) : (
              <div>
                <p className="text-[#B2B1B6] mt-1 text-center">$120/yr</p>
                <p className="text-[#02265B] font-semibold">2 months free</p>
              </div>
            )}
          </div>
          <div
            className={`p-4 border ${
              selectedPlan === "Pro"
                ? "border-[#03337b] bg-blue-50"
                : "border-gray-200"
            } rounded-[8px] cursor-pointer flex flex-col items-center`}
            onClick={() => setSelectedPlan("Pro")}
          >
            <img src={pro} alt="Pro plan" />
            <h1 className="text-[#02265B] font-bold text-xl mt-10">Pro</h1>
            {togglePlan ? (
              <p className="text-[#B2B1B6] mt-1 text-center">$15/mo</p>
            ) : (
              <div>
                <p className="text-[#B2B1B6] mt-1 text-center">$150/yr</p>
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