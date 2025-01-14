const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  mealType: {
    type: String,
    enum: ["Morning", "Evening", "Night"],
    required: true,
  },
  preparationStatus: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending",
  },
  deliveryStatus: {
    type: String,
    enum: ["Pending", "Delivered"],
    default: "Pending",
  },
  ingredients: [String],
  specialInstructions: String,
});


module.exports = mongoose.model("Meal", mealSchema);
