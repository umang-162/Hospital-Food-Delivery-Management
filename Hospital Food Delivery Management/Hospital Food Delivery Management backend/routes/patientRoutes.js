const express = require("express");
const Patient = require("../models/Patient");
const Pantry = require("../models/Pantry");
const Meal = require("../models/Meal");
const router = express.Router();


// Create a new patient
router.post("/", async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all patients
router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single patient by ID
router.get("/:id", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a patient
router.put("/:id", async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a patient
router.delete("/:id", async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ message: "Patient deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 1. Add Pantry Staff
router.post("/pantry", async (req, res) => {
  try {
    const { staffName, contactInfo, location } = req.body;
    const newStaff = new Pantry({ staffName, contactInfo, location, assignedTasks: [] });
    await newStaff.save();
    res.status(201).json(newStaff);
  } catch (error) {
    res.status(500).json({ error: 'Error adding pantry staff', details: error.message });
  }
});

// 2. Get All Pantry Staff
// router.get("/pantry", async (req, res) => {
//   try {
//     const staff = await Pantry.find();
//     res.status(200).json(staff);
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching pantry staff', details: error.message });
//   }
// });

// 3. Assign Task to Pantry Staff
router.post("/pantry/:id/task", async (req, res) => {
  try {
    const { id } = req.params;
    const { taskType, description } = req.body;

    const staff = await Pantry.findById(id);
    if (!staff) {
      return res.status(404).json({ error: 'Pantry staff not found' });
    }

    staff.assignedTasks.push({ taskType, description });
    await staff.save();

    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ error: 'Error assigning task', details: error.message });
  }
});

// 4. Update Task Status
router.put("/pantry/:id/task/:taskId", async (req, res) => {
  try {
    const { id, taskId } = req.params;
    const { status } = req.body;

    const staff = await Pantry.findById(id);
    if (!staff) {
      return res.status(404).json({ error: 'Pantry staff not found' });
    }

    const task = staff.assignedTasks.id(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    task.status = status;
    await staff.save();

    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ error: 'Error updating task status', details: error.message });
  }
});

// 5. Delete Pantry Staff
router.delete("/pantry/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const staff = await Pantry.findByIdAndDelete(id);

    if (!staff) {
      return res.status(404).json({ error: 'Pantry staff not found' });
    }

    res.status(200).json({ message: 'Pantry staff deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting pantry staff', details: error.message });
  }
});

//1. Create a new meal entry
router.post('/meals', async (req, res) => {
  try {
    const { patientId, mealType, ingredients, specialInstructions } = req.body;
    const newMeal = new Meal({
      patientId,
      mealType,
      ingredients,
      specialInstructions,
    });
    await newMeal.save();

    
    res.status(201).json(newMeal);
  } catch (error) {
    res.status(500).json({ error: 'Error creating meal entry', details: error.message });
  }
});



// 2. Get all meals for a specific patient
router.get('/meals/patient/:patientId', async (req, res) => {
  try {
    const { patientId } = req.params;
    const meals = await Meal.find({ patientId });
    res.status(200).json(meals);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching meals', details: error.message });
  }
});

// 3. Update meal preparation status
router.put('/meals/:mealId/preparation', async (req, res) => {
  try {
    const { mealId } = req.params;
    const { preparationStatus } = req.body;

    const meal = await Meal.findById(mealId);
    if (!meal) {
      return res.status(404).json({ error: 'Meal not found' });
    }

    meal.preparationStatus = preparationStatus;
    await meal.save();

    res.status(200).json(meal);
  } catch (error) {
    res.status(500).json({ error: 'Error updating preparation status', details: error.message });
  }
});

// 4. Update meal delivery status
router.put('/meals/:mealId/delivery', async (req, res) => {
  try {
    const { mealId } = req.params;
    const { deliveryStatus } = req.body;

    const meal = await Meal.findById(mealId);
    if (!meal) {
      return res.status(404).json({ error: 'Meal not found' });
    }

    meal.deliveryStatus = deliveryStatus;
    await meal.save();

    res.status(200).json(meal);
  } catch (error) {
    res.status(500).json({ error: 'Error updating delivery status', details: error.message });
  }
});

// 5. Get meals by preparation or delivery status
router.get('/meals/status', async (req, res) => {
  try {
    const { preparationStatus, deliveryStatus } = req.query;

    const query = {};
    if (preparationStatus) query.preparationStatus = preparationStatus;
    if (deliveryStatus) query.deliveryStatus = deliveryStatus;

    const meals = await Meal.find(query);
    res.status(200).json(meals);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching meals by status', details: error.message });
  }
});


module.exports = router;
