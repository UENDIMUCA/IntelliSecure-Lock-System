import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./page/LoginPage";
import AdminLogged from "./page/AdminPage"; 
import RaspClientPage from "./page/RaspClient/RaspClientPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/raspberry" element={<RaspClientPage />} />
        <Route path="/admin" element={<AdminLogged />} />
      </Routes>
    </Router>
  );
}

export default App;
