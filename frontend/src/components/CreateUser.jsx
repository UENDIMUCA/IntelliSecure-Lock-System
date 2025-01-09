import React from "react";

const CreateUser = () => {
  const handleCreateUser = () => {
    //modify later
    const newUser = prompt("Enter new user's email:");
    if (newUser) {
      alert(`${newUser} created successfully!`);
    }
  };

  return (
    <div>
      <h2>Create a New User</h2>
      <button onClick={handleCreateUser}>Create User</button>
    </div>
  );
};

export default CreateUser;
