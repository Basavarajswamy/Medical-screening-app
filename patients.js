const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient'); // Import the Mongoose model

// Add a patient
router.post('/add', async (req, res) => {
    const { name, age, gender, contact } = req.body;
    try {
        const newPatient = new Patient({ name, age, gender, contact });
        const savedPatient = await newPatient.save();
        res.json(savedPatient);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Get patients awaiting diagnosis
router.get('/awaiting', async (req, res) => {
    try {
        const patients = await Patient.find({ status: 'awaiting_diagnosis' });
        res.json(patients);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Get diagnosed patients
router.get('/diagnosed', async (req, res) => {
    try {
        const patients = await Patient.find({ status: 'diagnosed' });
        res.json(patients);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
