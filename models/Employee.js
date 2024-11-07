// models/Employee.js
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  customId: { type: Number, required: true, unique: true }, // Ensure `customId` matches exactly
  name: { type: String, required: true },
  position: { type: String, required: true },
  department: { type: String, required: true },
});

module.exports = mongoose.model('Employee', employeeSchema);

