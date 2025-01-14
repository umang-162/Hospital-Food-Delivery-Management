const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const PatientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    roomNumber: { type: String, required: true },
    bedNumber: { type: String, required: true },
    floorNumber: { type: String, required: true },
    diseases: { type: [String], default: [] },
    allergies: { type: [String], default: [] },
    dietChart: {
      morning: { type: String },
      evening: { type: String },
      night: { type: String },
      instructions: { type: String },
    },
    contactInfo: { type: String },
    emergencyContact: { type: String },
  },
  { timestamps: true }
);

PatientSchema.plugin(AutoIncrement, { inc_field: "id"  });

module.exports = mongoose.model("Patient", PatientSchema);
