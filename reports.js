// const express = require('express');
// const router = express.Router();
// const Patient = require('../models/Patient'); // Import the Patient model

// // Submit diagnosis report
// router.post('/submit', async (req, res) => {
//     const { patientId, comments, reportUrl } = req.body;
//     try {
//         await Patient.findByIdAndUpdate(patientId, {
//             status: 'diagnosed',
//             report_url: reportUrl,
//             comments
//         });
//         res.send('Report submitted successfully');
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

// Configure Multer for report PDF upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './reports'); // Ensure you have a 'reports' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// POST route to upload report PDF and associate it with a patient
router.post('/submit', upload.single('report'), async (req, res) => {
    const { patientId, comments } = req.body; // Send patientId with the report

    if (!req.file) {
        return res.status(400).send('No report uploaded.');
    }

    try {
        // Save the report URL and comments to the corresponding patient
        const reportUrl = `/reports/${req.file.filename}`;
        await Patient.findByIdAndUpdate(patientId, {
            $set: { report_url: reportUrl, comments: comments }
        });

        res.json({ reportUrl: reportUrl, message: 'Report submitted successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
