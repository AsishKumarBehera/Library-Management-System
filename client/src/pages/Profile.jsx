import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css"; // Import external CSS file

const Profile = () => { 
jconst [profile, setProfile] = useState({
    id: "",
    name: "",
    phone: "",
    address: "",
    image: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ✅ Fetch Profile Details
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:2000/api/profile");

        if (res.data && res.data._id) {
          setProfile({
            id: res.data._id,
            name: res.data.name || "Unknown User",
            phone: res.data.phone || "",
            address: res.data.address || "",
            image: res.data.image || "",
          });
        } else {
          setError("Profile not found. Please enter your details.");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Error loading profile.");
      }
    };

    fetchProfile();
  }, []);

  // ✅ Handle Input Changes
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // ✅ Handle Image Selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ Handle Profile Save
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", profile.name);
      formData.append("phone", profile.phone);
      formData.append("address", profile.address);
      if (profile.image.startsWith("data:image")) {
        const file = new File([await (await fetch(profile.image)).blob()], "profile.jpg", {
          type: "image/jpeg",
        });
        formData.append("image", file);
      }

      let res;
      if (profile.id) {
        res = await axios.post("http://localhost:2000/api/profile", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        res = await axios.post("http://localhost:2000/api/profile", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setMessage("Profile saved successfully!");
      setProfile({
        ...profile,
        id: res.data._id,
        image: res.data.image, // ✅ Update with uploaded image URL
      });
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || "Error saving profile.");
    }

    setLoading(false);
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">Profile Settings</h2>

      {message && <p className="profile-message success">{message}</p>}
      {error && <p className="profile-message error">{error}</p>}

      <div className="profile-image-container">
        {profile.image ? (
          <img src={profile.image} alt="Profile" className="profile-image" />
        ) : (
          <div className="placeholder-image">No Image</div>
        )}
      </div>

      {!isEditing ? (
        <div className="profile-summary">
          <h3>{profile.name}</h3>
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="profile-form">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />

          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            placeholder="Enter your phone"
            required
          />

          <label>Address</label>
          <input
            type="text"
            name="address"
            value={profile.address}
            onChange={handleChange}
            placeholder="Enter your address"
            required
          />

          <label>Profile Picture</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />

          <button type="submit" className="profile-button" disabled={loading}>
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Profile;
