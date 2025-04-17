import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useLocation, useNavigate } from "react-router";
import {  useFormData } from "../context/FormProvider";

export default function Home() {
  const navigate = useNavigate();
  

  const {formData, setFormData, errors, setErrors, setActive} = useFormData();
  

  useEffect(() => {
   

    setActive('1')
  }, []);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev)=>{
      return {...prev, [name]: value}
    })

    setErrors((prev)=>{
      return {...prev, [name]: ""}
    })
    
  }
 const submitHandler = (e) => {
  e.preventDefault();

  const newErrors = {};
  if(!formData.name.trim()) newErrors.name = "Name is required";
  if(!formData.email.trim()) newErrors.email = "Email is required";
  if(!formData.phone.trim()) newErrors.phone = "Phone number is required";

  if(Object.keys(newErrors).length > 0){
    setErrors(newErrors);
    return;
  }

  navigate("/plan", {state: formData});
  setActive("2"); 



 }


  return (
    <div className="w-[75%] h-screen mx-auto rounded-[8px] shadow-2xl mt-20 flex p-4">
      <Sidebar submit={submitHandler} />
      <section className="p-10 w-[60%]">
        <h1 className="text-[#02265B] font-bold text-3xl">Personal Info</h1>
        <p className="text-[#B2B1B6] mt-1">
          Please provide your name, email address and phone number.
        </p>

        <form
          onSubmit={submitHandler}
          className="mt-10 flex flex-col justify-center gap-5"
        >
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="name"
              className="text-[#415166] font-semibold flex items-center justify-between"
            >
              Name{" "}
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Stephen King"
              value={formData.name}
              onChange={handleChange}
              className={`p-2 border rounded-[8px] focus:outline-0 ${
                errors.name ? "border-red-600" : "border-[#B2B1B6]"
              } placeholder:text-[#B2B1B6]`}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-[#415166] font-semibold flex items-center justify-between"
            >
              Email Address{" "}
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </label>
            <input
              type="email"
              name="email"
              placeholder="e.g. StephenKing@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className={`p-2 border rounded-[8px] focus:outline-0 ${
                errors.email ? "border-red-600" : "border-[#B2B1B6]"
              } placeholder:text-[#B2B1B6]`}
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="phone"
              className="text-[#415166] font-semibold flex items-center justify-between"
            >
              Phone Number{" "}
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="e.g. +1 234 567 890"
              value={formData.phone}
              onChange={handleChange}
              className={`p-2 border rounded-[8px] focus:outline-0 ${
                errors.phone ? "border-red-600" : "border-[#B2B1B6]"
              } placeholder:text-[#B2B1B6]`}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#02295A] text-white p-3 rounded-[8px] w-[30%] font-semibold cursor-pointer"
            >
              Next Step
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
