import { useEffect, useState } from "react";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import Plan from "./component/Plan";
import AddOns from "./component/AddOns";
import Summary from "./component/Summary";
import { FormProvider } from "./context/FormProvider";

function App() {
  const [active, setActive] = useState(() => {
    return localStorage.getItem('activeStep') || '1';
  });

  
  useEffect(() => {
    localStorage.setItem('activeStep', active);
  }, [active]);
  return (
    <div className="pb-20">
    <BrowserRouter>
    <FormProvider>
      <Routes>
        <Route path="/" element={<Home  />} />
        <Route path="/plan" element={<Plan  />} />
        <Route path="/addons" element={<AddOns  />} />
        <Route path="/summary" element={<Summary />} />
      </Routes>
      </FormProvider>
    </BrowserRouter>
    </div>
  );
}

export default App;
