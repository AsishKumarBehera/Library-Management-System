const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String }, // Optional
  password: { type: String }, // Optional
  image: { type: String }, // ✅ Store image filename/path
});

module.exports = mongoose.model("Profile", ProfileSchema);
