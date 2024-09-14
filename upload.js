// const express = require('express');
// const multer = require('multer');
// const router = express.Router();
// const Patient = require('../models/Patient'); // Import the Patient model

// // Configure Multer for image upload
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './uploads'); // Ensure you have an 'uploads' folder
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname); // Unique filename
//     }
// });

// const upload = multer({ storage });

// // POST route to upload image and associate it with a patient
// router.post('/image', upload.single('image'), async (req, res) => {
//     const { patientId } = req.body; // Send patientId with the image

//     if (!req.file) {
//         return res.status(400).send('No image uploaded.');
//     }

//     try {
//         // Save the image URL to the corresponding patient
//         const imageUrl = `/uploads/${req.file.filename}`;
//         await Patient.findByIdAndUpdate(patientId, { $set: { imageUrl: imageUrl } });

//         res.json({ imageUrl: imageUrl, message: 'Image uploaded successfully!' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server error');
//     }
// });

// module.exports = router;


const express = require('express');
const multer = require('multer');
const router = express.Router();
const Patient = require('../models/Patient'); // Import the Patient model

// Configure Multer for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // Ensure you have an 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
});

const upload = multer({ storage });

// POST route to upload image and associate it with a patient
router.post('/image', upload.single('image'), async (req, res) => {
    const { patientId } = req.body; // Patient ID is sent with the image

    if (!req.file) {
        return res.status(400).send('No image uploaded.');
    }

    try {
        // Save the image URL to the corresponding patient in MongoDB
        const imageUrl = `/uploads/${req.file.filename}`; // Create the URL path

        // Find the patient by ID and update their document with the image URL
        const updatedPatient = await Patient.findByIdAndUpdate(
            patientId,
            { imageUrl: imageUrl }, // Set the imageUrl field
            { new: true } // Return the updated document
        );

        // If patient not found
        if (!updatedPatient) {
            return res.status(404).send('Patient not found');
        }

        res.json({
            message: 'Image uploaded and saved to MongoDB successfully!',
            imageUrl: imageUrl,
            patient: updatedPatient
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
