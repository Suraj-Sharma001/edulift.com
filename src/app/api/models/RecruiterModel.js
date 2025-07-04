import mongoose from "mongoose";

const recruiterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Company Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    role: {
        type: String,
        default: 'recruiter',
        enum: ['recruiter']
    }
}, { 
    timestamps: true,
    collection: 'recruiters'
});

export const Recruiter = mongoose.models.Recruiter || mongoose.model('Recruiter', recruiterSchema);