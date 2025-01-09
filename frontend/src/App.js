import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginForm";
import AdminLogged from "./components/AdminLogged"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<AdminLogged />} />
      </Routes>
    </Router>
  );
}

export default App;
