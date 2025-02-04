const mongoose = require("mongoose");

const MembershipSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: "User",
    required: true,
  },
  membershipType: {
    type: String,
    enum: ["6 months", "1 year", "2 years"],
    default: "6 months",
  },
  membershipStartDate: {
    type: Date,
    default: Date.now,
  },
  membershipEndDate: {
    type: Date,
    required: true,
  },
});

const Membership = mongoose.model("Membership", MembershipSchema);
module.exports = Membership;
