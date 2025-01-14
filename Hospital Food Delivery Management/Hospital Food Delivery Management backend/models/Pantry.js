const mongoose = require("mongoose");

const pantrySchema = new mongoose.Schema({
  
  staffName: { type: String, required: true },
  contactInfo: { type: String, required: true },
  location: { type: String, required: true },
  assignedTasks: [
    {
      taskType: {
        type: String,
        enum: ["Preparation", "Delivery"],
        required: true,
      },
      description: { type: String },
      status: {
        type: String,
        enum: ["Pending", "Completed"],
        default: "Pending",
      },
    },
  ],
});

module.exports = mongoose.model("Pantry", pantrySchema);
