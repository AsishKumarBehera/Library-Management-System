const express = require("express");
const router = express.Router();
const Membership = require("../models/Membership");

// Utility function to calculate end date
const calculateEndDate = (startDate, duration) => {
  const endDate = new Date(startDate);
  if (duration === "6 months") endDate.setMonth(endDate.getMonth() + 6);
  else if (duration === "1 year") endDate.setFullYear(endDate.getFullYear() + 1);
  else if (duration === "2 years") endDate.setFullYear(endDate.getFullYear() + 2);
  return endDate;
};

// Add Membership
router.post("/add", async (req, res) => {
    try {
      const { membershipType, userId, membershipEndDate } = req.body;
  
      // Ensure required fields are provided
      if (!membershipType || !userId || !membershipEndDate) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // Create new membership
      const newMembership = new Membership({
        membershipType,
        userId,
        membershipEndDate,
      });
  
      // Save to database
      await newMembership.save();
      res.status(200).json({ message: "Membership added successfully", data: newMembership });
    } catch (error) {
      console.error("Error adding membership:", error);
      res.status(500).json({ message: "Failed to add membership" });
    }
  });
  

// Update Membership
router.put("/update", async (req, res) => {
    try {
      const { membershipId, extensionType } = req.body;
  
      if (!membershipId || !extensionType) {
        return res.status(400).json({ message: "Membership ID and extension type are required" });
      }
  
      // Find the membership by ID
      const membership = await Membership.findById(membershipId);
      if (!membership) {
        return res.status(404).json({ message: "Membership not found" });
      }
  
      // Calculate new membership end date based on extension type
      const extensionMonths = extensionType === "6 months" ? 6 : extensionType === "1 year" ? 12 : 24;
      const newEndDate = new Date(membership.membershipEndDate);
      newEndDate.setMonth(newEndDate.getMonth() + extensionMonths);
  
      // Update membership end date and type
      membership.membershipEndDate = newEndDate;
      membership.membershipType = extensionType;
  
      // Save the updated membership
      await membership.save();
      res.status(200).json({ message: "Membership updated successfully", data: membership });
    } catch (error) {
      console.error("Error updating membership:", error);
      res.status(500).json({ message: "Failed to update membership" });
    }
  });

module.exports = router;
