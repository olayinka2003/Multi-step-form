import React from "react";
import bg from "../assets/img/bg-side.png";
import { useNavigate } from "react-router";
import { useFormData } from "../context/FormProvider";

export default function Sidebar() {
  const { active, setActive, formData } = useFormData();
  const navigate = useNavigate();

  const steps = [
    { id: "1", label: "Step 1", text: "Your info" },
    { id: "2", label: "Step 2", text: "Select plan" },
    { id: "3", label: "Step 3", text: "Add-ons" },
    { id: "4", label: "Step 4", text: "Summary" },
  ];


  const handleStepClick = (stepId) => {
    const isStepOneComplete = formData.name && formData.email && formData.phone;
  
    if (stepId === "1") {
      setActive("1");
      navigate("/");
    }
  
    if (stepId === "2" && isStepOneComplete) {
      setActive("2");
      navigate("/plan");
    }
  
    if (stepId === "3" && isStepOneComplete && selectedPlan) {
      setActive("3");
      navigate("/addons");
    }
  
    if (stepId === "4" && isStepOneComplete && selectedPlan) {
      setActive("4");
      navigate("/summary");
    }
  };
  
  return (
    <aside
      className="w-[35%] rounded-[10px] p-5 flex flex-col gap-10"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <ul className="flex flex-col gap-7">
        {steps.map((step) => (
          <li
            key={step.id}
           
            className="flex items-center gap-4 cursor-pointer"
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
              <p className="uppercase text-xs text-gray-300">{step.label}</p>
              <p className="font-semibold text-white">{step.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
