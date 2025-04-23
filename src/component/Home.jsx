import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useLocation, useNavigate } from "react-router";
import { useFormData } from "../context/FormProvider";

export default function Home() {
  const navigate = useNavigate();

  const {
    formData,
    setFormData,
    errors,
    setErrors,
    setActive,
    submitHandler,
    loading,
  } = useFormData();

  useEffect(() => {
    setActive("1");
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      return { ...prev, [name]: value };
    });

    setErrors((prev) => {
      return { ...prev, [name]: "" };
    });
  };

  return (
    <div className="lg:w-[75%] w-full mx-auto rounded-[8px] shadow-2xl lg:mt-20 lg:flex lg:flex-row flex-col lg:p-4 relative">
      <Sidebar />
      <section className="p-10 lg:w-[60%] w-[90%] mx-auto rounded-[8px] bg-white mt-0  flex flex-col absolute lg:relative lg:top-0 top-20 left-0 right-0">
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
              className={`bg-[#02295A] text-white p-3 rounded-[8px] lg:w-[30%] font-semibold transition-opacity ${
                loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {loading ? "Loading..." : "Next Step"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
