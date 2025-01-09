import React from "react";
import "../styles/App.css";

const Dashboard = ({ setActiveSection, navigate, isOpen, setIsOpen }) => {
  const toggleDashboard = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Button to toggle dashboard */}
      <button className="toggle-button" onClick={toggleDashboard}>
        ☰
      </button>

      {/* Dashboard */}
      <div className={`dashboard ${isOpen ? "open" : ""}`}>
        <div className="dashboard-top">
          <button className="dashboard-option" onClick={() => setActiveSection("profile")}>
            Profile
          </button>
          <button className="dashboard-option" onClick={() => setActiveSection("users")}>
            Display All Users
          </button>
          <button className="dashboard-option" onClick={() => setActiveSection("createusers")}>
            Create User
          </button>
        </div>

        {/* Log Out at the bottom */}
        <div className="dashboard-bottom">
          <button className="dashboard-option logout" onClick={() => navigate("/")}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
