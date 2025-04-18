import React, { useState, useEffect } from "react";
import "./UserProfile.css";

const UserProfile = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: ""
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      setError("No token found. Please log in.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/user/profile", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile.");
      }

      const data = await response.json();
      setUser(data);
      setEditedUser(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch profile. Please login again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedUser(user);
  };

  const handleSaveChanges = async () => {
    const token = localStorage.getItem("jwtToken");

    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/user/profile", {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editedUser)
      });

      if (!response.ok) {
        throw new Error("Failed to update profile.");
      }

      const updatedData = await response.json();
      setUser(updatedData);
      setIsEditing(false);
      
      // Show success notification
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !user.firstName) return <div className="loading-spinner">Loading profile...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>User Profile</h1>
        {!isEditing && (
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
        )}
      </div>

      <div className="profile-content">
        <div className="profile-details">
          {isEditing ? (
            <div className="profile-form">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={editedUser.firstName || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={editedUser.lastName || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editedUser.email || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={editedUser.phoneNumber || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={editedUser.address || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="button-group">
                <button 
                  className="cancel-button" 
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
                <button 
                  className="save-button" 
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className="profile-info">
              <div className="info-group">
                <h3>Personal Information</h3>
                <div className="info-item">
                  <span className="info-label">First Name:</span>
                  <span className="info-value">{user.firstName || "Not provided"}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Last Name:</span>
                  <span className="info-value">{user.lastName || "Not provided"}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Email:</span>
                  <span className="info-value">{user.email || "Not provided"}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Phone:</span>
                  <span className="info-value">{user.phoneNumber || "Not provided"}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Address:</span>
                  <span className="info-value">{user.address || "Not provided"}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;