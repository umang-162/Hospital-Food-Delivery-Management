require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const patientRoutes = require("./routes/patientRoutes");
const pantryRoutes = require("./routes/pantryRoutes");
const authMiddleware = require("./middleware/authMiddleware");





const app = express();
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(
  "/api/patients",
  authMiddleware(["Manager", "PantryStaff", "DeliveryStaff"]),
  patientRoutes
);
app.use(
  "/api/pantry",
  authMiddleware(["Manager", "PantryStaff", "DeliveryStaff"]),
  pantryRoutes
);

// Routes
app.use("/api/patients", patientRoutes);
app.use("/api/pantry", pantryRoutes);

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
