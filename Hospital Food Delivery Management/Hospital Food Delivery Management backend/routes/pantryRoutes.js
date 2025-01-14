const express = require("express");
const Pantry = require("../models/Pantry");

const router = express.Router();

// Route to get all pantry staff
router.get("/", async (req, res) => {
  try {
    const pantryStaff = await Pantry.find(); // Find all pantry staff data
    res.status(200).json(pantryStaff);
  } catch (error) {
    console.error("Error fetching pantry staff:", error);
    res.status(500).json({ message: "Error fetching pantry staff data" });
  }
});

module.exports = router;
