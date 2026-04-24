import mongoose from 'mongoose';

const scholarshipApplicationSchema = new mongoose.Schema({
  listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'ScholarshipListing', required: true },
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  college: { type: String },
  degree: { type: String },
  graduationYear: { type: String },
  resume: { type: String },
  status: {
    type: String,
    enum: ['Applied', 'Under Review', 'Shortlisted', 'Selected', 'Rejected'],
    default: 'Applied'
  }
}, { timestamps: true });

// Unique index to prevent duplicate applications
scholarshipApplicationSchema.index({ candidateId: 1, listingId: 1 }, { unique: true });

export const ScholarshipApplication = mongoose.models.ScholarshipApplication || mongoose.model('ScholarshipApplication', scholarshipApplicationSchema);
