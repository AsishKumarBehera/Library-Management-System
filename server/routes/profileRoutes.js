const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs"); 
const Profile = require("../models/Profile");

const router = express.Router();

// ✅ Multer Setup for Image Upload
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// ✅ GET Profile Details
router.get("/", async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json({
      _id: profile._id,
      name: profile.name || "Unknown User",
      phone: profile.phone || "",
      address: profile.address || "",
      email: profile.email || "",
      image: profile.image ? `${req.protocol}://${req.get("host")}${profile.image}` : "",
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile" });
  }
});

// ✅ POST or UPDATE Profile
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, phone, address, email, password } = req.body;
    let profile = await Profile.findOne();

    if (profile) {
      profile.name = name || profile.name || "Unknown User";
      profile.phone = phone || profile.phone;
      profile.address = address || profile.address;
      profile.email = email || profile.email;
      profile.password = password || profile.password;

      if (req.file) {
        if (profile.image) {
          const oldImagePath = path.join(__dirname, "..", profile.image);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
        profile.image = `/uploads/${req.file.filename}`;
      }

      await profile.save();
      return res.json(profile);
    }

    profile = new Profile({
      name: name || "Unknown User",
      phone,
      address,
      email,
      password,
      image: req.file ? `/uploads/${req.file.filename}` : "",
    });

    await profile.save();
    res.status(201).json(profile);
  } catch (err) {
    res.status(500).json({ message: "Error saving profile" });
  }
});

module.exports = router;
