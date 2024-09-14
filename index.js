const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB (replace with your MongoDB connection string)

mongoose.connect('mongodb://127.0.0.1:27017/medical-screening', {
  useNewUrlParser: true,      // These options can be removed if they're deprecated.
  useUnifiedTopology: true    // These options can be removed if they're deprecated.
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});


// Import routes
const patientRoutes = require('./routes/patients');
const uploadRoutes = require('./routes/upload'); // Import the upload route
const reportRoutes = require('./routes/reports');

// Use routes
app.use('/api/patients', patientRoutes);
app.use('/api/upload', uploadRoutes); // Mount the upload route at /api/upload
app.use('/api/reports', reportRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// b24XEtf8LvASUafq, MongoDB is running on 127.0.0.1,