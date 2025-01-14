import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import PatientManagement from "./pages/PatientManagement";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/patients" element={<PatientManagement />} />
    </Routes>
  );
};

export default App;
