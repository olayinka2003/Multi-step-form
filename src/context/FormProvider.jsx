import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";

const FormContext = createContext();

export function useFormData() {
  return useContext(FormContext);
}

export function FormProvider({ children }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(() => {
    return localStorage.getItem("activeStep") || "1";
  });
  useEffect(() => {
    localStorage.setItem("activeStep", active);
  }, [active]);
  const [planData, setPlanData] = useState(null);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
 


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [selectedPlan, setSelectedPlan] = useState(
    formData?.plan?.type || null
  );

  const [togglePlan, setTogglePlan] = useState(
    formData?.plan?.billing === "yearly" ? false : true
  );

  

  const submitHandler = (e) => {
    if (e) e.preventDefault();
  
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    setLoading(true);
  
    setTimeout(() => {
      setLoading(false);
      navigate("/plan", { state: formData });
      setActive("2");
    }, 1000);
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

  setLoading(true);


  const planInfo = {
    ...formData,
    plan: {
      type: selectedPlan,
      billing: togglePlan ? 'monthly' : 'yearly',
      price: getPlanPrice(),
    }
  };

  setPlanData(planInfo);
  localStorage.setItem("formData", JSON.stringify(planInfo));

  
  setTimeout(() => {
    setLoading(false);
    setActive("3");
    navigate("/addons");
  }, 1000);
};




  return (
    <FormContext.Provider
      value={{
        loading,
        setLoading,
        next,
        submitHandler,
        selectedPlan,
        setSelectedPlan,
        togglePlan,
        setTogglePlan,
        active,
        setActive,
        planData,
        setPlanData,
        selectedAddOns,
        setSelectedAddOns,
        errors,
        setErrors,
        formData,
        setFormData,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}
