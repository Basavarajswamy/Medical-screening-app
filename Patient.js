const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    contact: { type: String, required: true },
    status: { type: String, default: 'awaiting_diagnosis' }, // Default status
    imageUrl: { type: String, default: '' }, // Add this field for storing image URL
    report_url: { type: String, default: '' }, // Add this field for storing report URL
    comments: { type: String, default: '' } // Comments field for doctor’s diagnosis
});

module.exports = mongoose.model('Patient', PatientSchema);
