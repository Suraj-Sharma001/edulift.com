import mongoose from 'mongoose';

const scholarShipSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    primary_email: {
        type: String,
        required: [true, 'Primary email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, 'Please provide a valid email']
    },
    contect_number: {
        type: String,
        required: [true, 'Contact number is required'],
        match: [/^\+?[1-9]\d{1,14}$/, 'Please provide a valid contact number']
    },
    resume_url: {
        type: String,
        required: [false, 'Resume URL is required'],
        match: [/^https?:\/\/.+/, 'Please provide a valid URL']
    },
    college_name: {
        type: String,
        required: [true, 'College name is required'],
        trim: true
    },
    degree: {
        type: String,
        required: [true, 'Degree is required'],
        trim: true
    },
})

export const ScholarShip = mongoose.models.ScholarShip || mongoose.model('ScholarShip', scholarShipSchema);