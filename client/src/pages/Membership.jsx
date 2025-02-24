import { useState } from "react";
import axios from "axios";
import "../pages/Membership.css";

const Membership = () => {
  const [membershipType, setMembershipType] = useState("6 months");
  const [membershipNumber, setMembershipNumber] = useState("");
  const [userId, setUserId] = useState("user123"); // Assuming userId comes from user context or authentication

  // Function to handle adding a membership
  const handleAddMembership = async (e) => {
    e.preventDefault();

    // Calculate membership end date based on selected duration
    const membershipDuration = membershipType === "6 months" ? 6 : membershipType === "1 year" ? 12 : 24;
    const membershipEndDate = new Date();
    membershipEndDate.setMonth(membershipEndDate.getMonth() + membershipDuration); // Adds months to the current date

    try {
      const response = await axios.post("api/membership/add", {
        membershipType, // Send the selected membership type
        userId, // Send user ID (replace with actual logged-in user ID)
        membershipEndDate, // Send the calculated membership end date
      });
      console.log(response.data);
      alert("Membership added successfully!");
    } catch (error) {
      console.error("Error adding membership:", error);
      alert("Failed to add membership.");
    }
  };

  // Function to handle updating a membership
  const handleUpdateMembership = async (e) => {
    e.preventDefault();

    // Ensure membershipNumber is provided
    if (!membershipNumber) {
      alert("Membership ID is required!");
      return;
    }

    try {
      const response = await axios.put("api/membership/update", {
        membershipId: membershipNumber, // Send the membership ID to be updated
        extensionType: membershipType, // Send the new extension duration
      });
      alert(response.data.message); // Assuming response returns a message
    } catch (error) {
      console.error("Error updating membership:", error);
      alert("Failed to update membership!");
    }
  };

  return (
    <div className="membership-container">
      {/* Add Membership Section */}
      <div className="membership-section">
        <h2>Add Membership</h2>
        <form className="fomm" onSubmit={handleAddMembership}>
          <label>
            Membership Duration:
            <select
              value={membershipType}
              onChange={(e) => setMembershipType(e.target.value)}
              className="membership-select"
            >
              <option value="6 months">6 months</option>
              <option value="1 year">1 year</option>
              <option value="2 years">2 years</option>
            </select>
          </label>
          <button type="submit" className="butt">
            Add Membership
          </button>
        </form>
      </div>

      {/* Update Membership Section */}
      <div className="membership-section">
        <h2>Update Membership</h2>
        <form className="fomm" onSubmit={handleUpdateMembership}>
          <label>
            Membership Number:
            <input
              type="text"
              value={membershipNumber}
              onChange={(e) => setMembershipNumber(e.target.value)}
              placeholder="Enter Membership ID"
              className="membership-input"
            />
          </label>
          <label>
            Extend Membership By:
            <select
              value={membershipType}
              onChange={(e) => setMembershipType(e.target.value)}
              className="membership-select"
            >
              <option value="6 months">6 months</option>
              <option value="1 year">1 year</option>
              <option value="2 years">2 years</option>
            </select>
          </label>
          <button type="submit" className="butt">
            Update Membership
          </button>
        </form>
      </div>
    </div>
  );
};

export default Membership;
