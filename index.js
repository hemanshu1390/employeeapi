const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const employeeRoutes = require('./routes/employeeRoutes'); // No .default needed

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI,
  {
    connectTimeoutMS: 20000, // 20 seconds
    socketTimeoutMS: 45000,  // 45 seconds
  }
)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error));


app.use('/api/employees', employeeRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
