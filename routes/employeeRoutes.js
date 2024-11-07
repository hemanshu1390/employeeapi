const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// Create an employee
router.post('/', async (req, res) => {
  try {
    const { customId, name, position, department } = req.body;
    
    // Check if customId already exists
    const existingEmployee = await Employee.findOne({ customId });
    if (existingEmployee) {
      return res.status(400).json({ message: "Custom ID must be unique" });
    }

    const newEmployee = new Employee({ customId, name, position, department });
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get an employee by customId
router.get('/id/:customId', async (req, res) => {
  try {
    const employee = await Employee.findOne({ customId: req.params.customId });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get employees by name
router.get('/name/:name', async (req, res) => {
  try {
    const employees = await Employee.find({ name: req.params.name });
    if (employees.length === 0) {
      return res.status(404).json({ message: "No employees found with that name" });
    }
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an employee by customId
router.put('/customId/:customId', async (req, res) => {
  try {
    const updatedEmployee = await Employee.findOneAndUpdate(
      { customId: req.params.customId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete an employee by customId
router.delete('/customId/:customId', async (req, res) => {
  try {
    const deletedEmployee = await Employee.findOneAndDelete({ customId: req.params.customId });
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
   