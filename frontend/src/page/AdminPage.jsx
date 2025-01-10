import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import CreateUser from "../components/CreateUser";

const AdminLogged = () => {
  const navigate = useNavigate(); // Used for navigation
  const [isOpen, setIsOpen] = useState(false); // Track the dashboard state
  const [activeSection, setActiveSection] = useState("dashboard");

  const [activeUsers, setActiveUsers] = useState([
    "user1@example.com",
    "user2@example.com",
    "user3@example.com",
  ]);

  const handleCreateUser = () => {
    const newUser = prompt("Enter new user's email:");
    if (newUser) {
      setActiveUsers([...activeUsers, newUser]);
      alert(`${newUser} added successfully!`);
    }
  };

  const handleEditUser = (index) => {
    const updatedEmail = prompt("Edit user's email:", activeUsers[index]);
    if (updatedEmail) {
      const updatedUsers = [...activeUsers];
      updatedUsers[index] = updatedEmail;
      setActiveUsers(updatedUsers);
      alert("User updated successfully!");
    }
  };

  const handleDeleteUser = (index) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${activeUsers[index]}?`
    );
    if (confirmDelete) {
      const updatedUsers = activeUsers.filter((_, i) => i !== index);
      setActiveUsers(updatedUsers);
      alert("User deleted successfully!");
    }
  };

  // Render content based on the active section
  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return (
          <div>
            <h2>My Profile</h2>
            <p>Edit your profile information here.</p>
            <button onClick={() => setActiveSection("dashboard")}>
              Back to Dashboard
            </button>
          </div>
        );
      case "users":
        return (
          <div>
            <h2>Active Users</h2>
            <ul>
              {activeUsers.map((user, index) => (
                <li key={index}>
                  {user}{" "}
                  <button onClick={() => handleEditUser(index)}>Edit</button>{" "}
                  <button onClick={() => handleDeleteUser(index)}>Delete</button>
                </li>
              ))}
            </ul>
            <button onClick={() => setActiveSection("dashboard")}>
              Back to Dashboard
            </button>
          </div>
        );
        case "createusers": // New case for "Create User"
        return (
          <div>
            <CreateUser />
            <button onClick={() => setActiveSection("dashboard")}>
              Back to Dashboard
            </button>
          </div>
        );
      default:
        return (
          <div>
            <h2>Welcome to the Admin Dashboard</h2>
            <p>Select an option from the left sidebar.</p>
          </div>
        );
    }
  };

  return (
    <div className="admin-dashboard">
      <Dashboard
        setActiveSection={setActiveSection}
        navigate={navigate}
        isOpen={isOpen}
        setIsOpen={setIsOpen} // Pass the toggle function
      />
      <div className={`main-content ${isOpen ? "shifted" : ""}`}>
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminLogged;
