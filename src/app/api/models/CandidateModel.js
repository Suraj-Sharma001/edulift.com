import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
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
        default: 'candidate',
        enum: ['candidate']
    },
    // Profile completion fields
    phone: {
        type: String,
        default: '',
        trim: true
    },
    college: {
        type: String,
        default: '',
        trim: true
    },
    degree: {
        type: String,
        default: '',
        trim: true
    },
    graduationYear: {
        type: String,
        default: '',
        trim: true
    },
    resume: {
        type: String,
        default: '',
        trim: true
    },
    profileComplete: {
        type: Boolean,
        default: false
    }
}, { 
    timestamps: true,
    collection: 'candidates'
});

export const Candidate = mongoose.models.Candidate || mongoose.model('Candidate', candidateSchema);
