import React, { useState } from "react";

const AdminLogged = () => {
  // State to manage the list of active users
  //just for moment will be add by api 
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

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="admin-section">
        <h3>Active Users</h3>
        <ul>
          {activeUsers.map((user, index) => (
            <li key={index} className="user-item">
              <span>{user}</span>
              <button
                onClick={() => handleEditUser(index)}
                className="user-button edit-button"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteUser(index)}
                className="user-button delete-button"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="admin-section">
        <h3>Create a New User</h3>
        <button onClick={handleCreateUser} className="admin-button">
          Create User
        </button>
      </div>
    </div>
  );
};

export default AdminLogged;
