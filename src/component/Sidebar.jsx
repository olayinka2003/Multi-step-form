import React from "react";
import bg from "../assets/img/bg-side.png";
import { useNavigate } from "react-router";
import { useFormData } from "../context/FormProvider";

export default function Sidebar() {
  const { active, setActive, formData, submitHandler, next, nextt } = useFormData();
  const navigate = useNavigate();

  const steps = [
    { id: "1", label: "Step 1", text: "Your info" },
    { id: "2", label: "Step 2", text: "Select plan" },
    { id: "3", label: "Step 3", text: "Add-ons" },
    { id: "4", label: "Step 4", text: "Summary" },
  ];
  const handleStepClick = (stepId) => {
    const currentStep = parseInt(active);
    const targetStep = parseInt(stepId);
    
    // Allow freely going backward
    if (targetStep < currentStep) {
      setActive(stepId);
      if (stepId === "1") navigate("/");
      if (stepId === "2") navigate("/plan");
      if (stepId === "3") navigate("/addons");
      if (stepId === "4") navigate("/summary");
      return;
    }
    
    // Don't allow skipping steps
    if (targetStep > currentStep + 1) {
      alert("Please complete the previous steps first");
      return;
    }
    
    // Going forward one step at a time - validate before proceeding
    if (currentStep === 1 && targetStep === 2) {
      submitHandler(); // Validate step 1
      return;
    }
    
    if (currentStep === 2 && targetStep === 3) {
      next(); // Validate step 2
      return;
    }
    
    if (currentStep === 3 && targetStep === 4) {
      // Since nextt was removed, navigate directly to summary
      setActive("4");
      navigate("/summary");
      return;
    }
  };
  
  return (
    <aside
      className={`lg:w-[35%] image  rounded-[10px] p-5 flex flex-col gap-10 relative `}
    >
      <ul className="lg:flex lg:flex-col  flex justify-center lg:gap-7 gap-3">
        {steps.map((step) => (
          <li
            key={step.id}
           
            className="flex items-center  gap-4 cursor-pointer"
          >
            <div
            onClick={()=>handleStepClick(step.id)}
              className={`border px-3 py-1 rounded-full font-bold ${
                active === step.id
                  ? "bg-blue-300 text-black border-0"
                  : "border-white bg-transparent text-white"
              }`}
            >
              {step.id}
            </div>
            <div>
              <p className="uppercase text-xs text-gray-300 lg:block hidden">{step.label}</p>
              <p className="font-semibold text-white lg:block hidden">{step.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
