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
    const { membershipType, userId } = req.body;

    if (!membershipType || !userId) {
      return res.status(400).json({ message: "Membership type and user ID are required" });
    }

    // Calculate membership end date
    const startDate = new Date();
    const membershipEndDate = calculateEndDate(startDate, membershipType);

    const newMembership = new Membership({
      userId,
      membershipType,
      membershipStartDate: startDate,
      membershipEndDate,
    });

    await newMembership.save();
    res.status(200).json({ message: "Membership added successfully", data: newMembership });
  } catch (error) {
    console.error("Error adding membership:", error);
    res.status(500).json({ message: "Failed to add membership" });
  }
});

// Update Membership (Extend Duration)
router.put("/update", async (req, res) => {
  try {
    const { membershipId, extensionType } = req.body;

    if (!membershipId || !extensionType) {
      return res.status(400).json({ message: "Membership ID and extension type are required" });
    }

    const membership = await Membership.findById(membershipId);
    if (!membership) {
      return res.status(404).json({ message: "Membership not found" });
    }

    // Extend the membership end date
    const extensionMonths = extensionType === "6 months" ? 6 : extensionType === "1 year" ? 12 : 24;
    membership.membershipEndDate.setMonth(membership.membershipEndDate.getMonth() + extensionMonths);

    await membership.save();
    res.status(200).json({ message: "Membership updated successfully", data: membership });
  } catch (error) {
    console.error("Error updating membership:", error);
    res.status(500).json({ message: "Failed to update membership" });
  }
});

module.exports = router;
