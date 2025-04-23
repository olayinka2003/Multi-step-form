import React from "react";
import Sidebar from "./Sidebar";
import thanks from "../assets/img/icon-thank-you.svg";

export default function Thanks() {
  return (
    <div className="lg:w-[75%] w-full mx-auto rounded-[8px] shadow-2xl lg:mt-20 lg:flex lg:flex-row flex-col lg:p-4 relative">
      <Sidebar />
      <section className="p-10 lg:w-[60%] w-[90%] mx-auto rounded-[8px] bg-white mt-0  flex flex-col lg:h-screen items-center absolute lg:relative lg:top-0 top-20 left-0 right-0">
        <img src={thanks} className="w-[30%] mt-20" alt="thank you img" />
        <p className="text-[#02265B] font-bold text-xl mt-1">Thank you!</p>
        <p className="text-[#B2B1B6] mt-1 text-center">
          Your submission has been received. We will get back to you as soon as
          possible. Thanks for confirming your subscription! We hope you have
          fun using our platform. If you ever need support, please feel free to
          email us at support@loremgaming.com.
        </p>
      </section>
    </div>
  );
}
