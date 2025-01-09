import React, { useState } from "react";

const ActiveUsers = () => {
  const [activeUsers, setActiveUsers] = useState([
    "user1@example.com",
    "user2@example.com",
    "user3@example.com",
  ]);

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
    <div>
      <h2>Active Users</h2>
      <ul>
        {activeUsers.map((user, index) => (
          <li key={index}>
            {user}
            <button onClick={() => handleEditUser(index)}>Edit</button>
            <button onClick={() => handleDeleteUser(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActiveUsers;
