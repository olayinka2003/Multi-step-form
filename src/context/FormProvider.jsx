import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";

const FormContext = createContext();

export function useFormData() {
  return useContext(FormContext);
}

export function FormProvider({ children }) {
  const [active, setActive] = useState(() => {
    return localStorage.getItem("activeStep") || "1";
  });
  useEffect(() => {
    localStorage.setItem("activeStep", active);
  }, [active]);
  const [planData, setPlanData] = useState(null);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [errors, setErrors] = useState({});

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

  return (
    <FormContext.Provider
      value={{
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
