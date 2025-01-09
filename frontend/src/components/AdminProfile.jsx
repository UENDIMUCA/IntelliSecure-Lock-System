import React, { useState } from "react";

const AdminProfile = () => {
  const [profileData, setProfileData] = useState({
    name: "Admin Name",
    email: "admin@example.com",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Edit Profile</h2>
      <form className="profile-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default AdminProfile;
