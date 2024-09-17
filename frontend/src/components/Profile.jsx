// src/components/Profile.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../api";

const Profile = ({ token }) => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile(token);
        setProfile(response.data);
      } catch (error) {
        console.error("Profile Fetch Error:", error.response?.data || error.message);
      }
    };
    fetchProfile();
  }, [token]);

  const handleCreateBook = () => {
    navigate("/add-book"); 
  };

  const handleViewBooks = () => {
    navigate("/books"); 
  };

  if (!profile) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="container">
      <h2>Profile</h2>
      <p><strong>Username:</strong> {profile.username}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      
      <div className="button-group">
        <button className="create-book-button" onClick={handleCreateBook}>
          Create Book
        </button>
        <button className="view-books-button" onClick={handleViewBooks}>
          Get List of All Books
        </button>
      </div>
    </div>
  );
};

export default Profile;
