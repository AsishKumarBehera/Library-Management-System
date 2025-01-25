const express = require("express");
const Maintenance = require("../models/maintenance");
const router = express.Router();

// Create a new maintenance task
router.post("/", async (req, res) => {
  try {
    const { description, status, priority } = req.body;

    // Validate required fields
    if (!description || !status || !priority) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newTask = new Maintenance({ description, status, priority });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create maintenance task" });
  }
});

// Get all maintenance tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Maintenance.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch maintenance tasks" });
  }
});

// Get a specific maintenance task by ID
router.get("/:id", async (req, res) => {
  try {
    const task = await Maintenance.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch maintenance task" });
  }
});

// Update a maintenance task
router.put("/:id", async (req, res) => {
  try {
    const { description, status, priority } = req.body;

    // Validate required fields
    if (!description || !status || !priority) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const updatedTask = await Maintenance.findByIdAndUpdate(
      req.params.id,
      { description, status, priority },
      { new: true } // Return the updated document
    );
    if (!updatedTask) return res.status(404).json({ error: "Task not found" });
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update maintenance task" });
  }
});

// Delete a maintenance task
router.delete("/:id", async (req, res) => {
  try {
    const deletedTask = await Maintenance.findByIdAndDelete(req.params.id);
    if (!deletedTask) return res.status(404).json({ error: "Task not found" });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete maintenance task" });
  }
});

module.exports = router;
